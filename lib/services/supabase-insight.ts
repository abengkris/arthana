import { SupabaseClient } from '@supabase/supabase-js';
import { IInsightService, InsightItem } from './insight';
import { ServiceResult } from './types';
import {
  generateInsights,
  type Transaction,
  type BudgetCategory,
} from '../insights';

/**
 * Supabase-based implementation of the Insight Service.
 */
export class SupabaseInsightService implements IInsightService {
  constructor(private supabase: SupabaseClient) {}

  async getInsights(userId: string): Promise<ServiceResult<InsightItem[]>> {
    try {
      const [insightsRes, profileRes] = await Promise.all([
        this.supabase
          .from('ai_insights')
          .select('content, type')
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        this.supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', userId)
          .single(),
      ]);

      if (insightsRes.error) throw insightsRes.error;

      const insights = (insightsRes.data || []) as InsightItem[];
      const subscriptionTier = profileRes.data?.subscription_tier || 'free';

      const filteredInsights =
        subscriptionTier === 'premium' ? insights : insights.slice(0, 1);

      return { data: filteredInsights, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async refreshInsights(userId: string): Promise<ServiceResult<InsightItem[]>> {
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      // 1. Fetch current month data
      const [transactionsRes, budgetRes, categoriesRes, profileRes] =
        await Promise.all([
          this.supabase
            .from('transactions')
            .select('amount, category_id, classification')
            .eq('user_id', userId)
            .gte('date', `${year}-${month.toString().padStart(2, '0')}-01`),
          this.supabase
            .from('budgets')
            .select('total_income')
            .eq('user_id', userId)
            .eq('month', month)
            .eq('year', year)
            .maybeSingle(),
          this.supabase
            .from('categories')
            .select('id, name, percentage_allocation')
            .eq('user_id', userId),
          this.supabase
            .from('profiles')
            .select('subscription_tier, budget_strategy')
            .eq('id', userId)
            .single(),
        ]);

      if (transactionsRes.error) throw transactionsRes.error;

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
      const strategy = profileRes.data?.budget_strategy || '50/30/20';

      // 2. Generate Insights using the pure logic
      const allInsights = generateInsights(
        transactions,
        categories,
        totalIncome,
        strategy
      );

      // 3. Ephemeral Logic: Delete old, Insert new
      const { error: deleteError } = await this.supabase
        .from('ai_insights')
        .delete()
        .eq('user_id', userId);
      if (deleteError) throw deleteError;

      if (allInsights.length > 0) {
        const insightsToInsert = allInsights.map((i) => ({
          user_id: userId,
          content: i.content,
          type: i.type,
        }));

        const { error: insertError } = await this.supabase
          .from('ai_insights')
          .insert(insightsToInsert);
        if (insertError) throw insertError;
      }

      const filteredInsights =
        subscriptionTier === 'premium' ? allInsights : allInsights.slice(0, 1);

      return { data: filteredInsights, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
