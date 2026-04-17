'use server';

import { createClient } from '@/utils/supabase/server';
import { SupabaseInsightService } from '@/lib/services/supabase-insight';

/**
 * Refreshes and returns AI Insights for the authenticated user.
 * Refactored to use SupabaseInsightService for centralized data access.
 */
export async function refreshInsights() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const insightService = new SupabaseInsightService(supabase);
  const { data: insights, error } = await insightService.refreshInsights(
    user.id
  );

  if (error) {
    console.error('Error refreshing insights:', error);
    return [];
  }

  return insights || [];
}

/**
 * Fetches existing insights from the database.
 * Refactored to use SupabaseInsightService for centralized data access.
 */
export async function getInsights() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const insightService = new SupabaseInsightService(supabase);
  const { data: insights, error } = await insightService.getInsights(user.id);

  if (error) {
    console.error('Error fetching insights:', error);
    return [];
  }

  return insights || [];
}
