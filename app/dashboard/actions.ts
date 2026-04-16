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

  // Fetch transactions and emergency fund for current user
  const [transactionsRes, emergencyFundRes] = await Promise.all([
    supabase.from('transactions').select('amount').eq('user_id', user.id),
    supabase
      .from('emergency_funds')
      .select('target_amount, current_amount')
      .eq('user_id', user.id)
      .single(),
  ]);

  const transactions = transactionsRes.data || [];
  const emergencyFund = emergencyFundRes.data;

  const total_expenses = transactions.reduce(
    (acc, t) => acc + Number(t.amount),
    0
  );

  return {
    total_income: 0, // Requires additional table logic
    total_expenses,
    balance: 0, // Placeholder
    investments: 0,
    savings: Number(emergencyFund?.current_amount || 0),
    target: Number(emergencyFund?.target_amount || 0),
  };
}
