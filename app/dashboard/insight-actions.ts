'use server';

import { createClient } from '@/utils/supabase/server';
import {
  generateInsights,
  type Transaction,
  type BudgetCategory,
} from '@/lib/insights';

/**
 * Refreshes and returns AI Insights for the authenticated user.
 * Implements ephemeral logic: deletes old insights before inserting new ones.
 */
export async function refreshInsights() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // 1. Fetch current month data
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [transactionsRes, budgetRes, categoriesRes, profileRes] =
    await Promise.all([
      supabase
        .from('transactions')
        .select('amount, category_id')
        .eq('user_id', user.id)
        .gte('date', `${year}-${month.toString().padStart(2, '0')}-01`),
      supabase
        .from('budgets')
        .select('total_income')
        .eq('user_id', user.id)
        .eq('month', month)
        .eq('year', year)
        .single(),
      supabase
        .from('categories')
        .select('id, name, percentage_allocation')
        .eq('user_id', user.id),
      supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', user.id)
        .single(),
    ]);

  const transactions = (transactionsRes.data || []) as Transaction[];
  const totalIncome = Number(budgetRes.data?.total_income || 0);
  const categories: BudgetCategory[] = (categoriesRes.data || []).map(
    (cat) => ({
      id: cat.id,
      name: cat.name,
      limit: totalIncome * (Number(cat.percentage_allocation || 0) / 100),
    })
  );
  const subscriptionTier = profileRes.data?.subscription_tier || 'free';

  // 2. Generate Insights
  const allInsights = generateInsights(transactions, categories, totalIncome);

  // 3. Ephemeral Logic: Delete old, Insert new
  // We use a transaction-like approach (or just sequential for MVP)
  await supabase.from('ai_insights').delete().eq('user_id', user.id);

  if (allInsights.length > 0) {
    const insightsToInsert = allInsights.map((i) => ({
      user_id: user.id,
      content: i.content,
      type: i.type,
    }));

    await supabase.from('ai_insights').insert(insightsToInsert);
  }

  // Return insights filtered by tier
  // Free: 1 card, Premium: all cards
  return subscriptionTier === 'premium' ? allInsights : allInsights.slice(0, 1);
}

/**
 * Fetches existing insights from the database.
 */
export async function getInsights() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const [insightsRes, profileRes] = await Promise.all([
    supabase
      .from('ai_insights')
      .select('content, type')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single(),
  ]);

  const insights = insightsRes.data || [];
  const subscriptionTier = profileRes.data?.subscription_tier || 'free';

  return subscriptionTier === 'premium' ? insights : insights.slice(0, 1);
}
