'use server';

import { createClient } from '@/utils/supabase/server';
import { SupabaseDashboardService } from '@/lib/services/supabase-dashboard';

/**
 * Server Action to fetch dashboard data.
 * Refactored to use SupabaseDashboardService for centralized data access.
 */
export async function getDashboardData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const dashboardService = new SupabaseDashboardService(supabase);
  const { data: summary, error } = await dashboardService.getSummary(user.id);

  if (error) {
    console.error('Error fetching dashboard summary:', error);
    // Return default values or handle error as needed
    return {
      total_income: 0,
      total_expenses: 0,
      balance: 0,
      investments: 0,
      savings: 0,
      target: 0,
    };
  }

  return summary;
}

export async function getDashboardSpendingByCategory() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const dashboardService = new SupabaseDashboardService(supabase);
  const { data, error } = await dashboardService.getSpendingByCategory(user.id);

  if (error) {
    console.error('Error fetching spending by category:', error);
    return [];
  }

  return data || [];
}
