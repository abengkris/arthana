import { SupabaseClient } from '@supabase/supabase-js';
import {
  IDashboardService,
  DashboardSummary,
  TransactionSummary,
} from './dashboard';
import { ServiceResult } from './types';

/**
 * Supabase-based implementation of the Dashboard Service.
 */
export class SupabaseDashboardService implements IDashboardService {
  constructor(private supabase: SupabaseClient) {}

  async getSummary(userId: string): Promise<ServiceResult<DashboardSummary>> {
    try {
      // Fetch transactions, categories, and emergency fund for the user
      const [transactionsRes, emergencyFundRes, budgetsRes] = await Promise.all(
        [
          this.supabase
            .from('transactions')
            .select('amount, type')
            .eq('user_id', userId),
          this.supabase
            .from('emergency_funds')
            .select('target_amount, current_amount')
            .eq('user_id', userId)
            .maybeSingle(),
          this.supabase
            .from('budgets')
            .select('amount, type')
            .eq('user_id', userId),
        ]
      );

      if (transactionsRes.error) throw transactionsRes.error;

      const transactions = transactionsRes.data || [];
      const emergencyFund = emergencyFundRes.data;
      const budgets = budgetsRes.data || [];

      // Calculate totals
      let total_income = 0;
      let total_expenses = 0;

      transactions.forEach((t) => {
        if (t.type === 'income') {
          total_income += Number(t.amount);
        } else {
          total_expenses += Number(t.amount);
        }
      });

      const balance = total_income - total_expenses;

      return {
        data: {
          total_income,
          total_expenses,
          balance,
          investments: 0, // Placeholder for future feature
          savings: Number(emergencyFund?.current_amount || 0),
          target: Number(emergencyFund?.target_amount || 0),
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async getRecentTransactions(
    userId: string,
    limit = 10
  ): Promise<ServiceResult<TransactionSummary[]>> {
    try {
      const { data, error } = await this.supabase
        .from('transactions')
        .select('id, amount, description, category_id, date')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(limit);

      if (error) throw error;

      const transactions: TransactionSummary[] = (data || []).map((t) => ({
        id: t.id,
        amount: Number(t.amount),
        description: t.description,
        category_id: t.category_id,
        date: t.date,
      }));

      return { data: transactions, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
