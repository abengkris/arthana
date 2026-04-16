'use server';

import { createClient } from '@/utils/supabase/server';

export async function getDashboardData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Initial fetch for demo/prototype logic (requires adjustment as schema evolves)
  const { data, error } = await supabase
    .from('dashboard_stats')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Dashboard data fetch error:', error);
    // Return mock data for now since tables might not be fully populated
    return {
      total_income: 0,
      total_expenses: 0,
      balance: 0,
      investments: 0,
      savings: 0,
    };
  }

  return data;
}
