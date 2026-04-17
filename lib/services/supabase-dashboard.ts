import { SupabaseClient } from '@supabase/supabase-js';
import {
  IDashboardService,
  DashboardSummary,
  TransactionSummary,
  CategorySpending,
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
      const [transactionsRes, emergencyFundRes] = await Promise.all([
        this.supabase
          .from('transactions')
          .select('amount, categories(type)')
          .eq('user_id', userId),
        this.supabase
          .from('emergency_funds')
          .select('target_amount, current_amount')
          .eq('user_id', userId)
          .maybeSingle(),
      ]);

      if (transactionsRes.error) throw transactionsRes.error;

      const transactions = transactionsRes.data || [];
      const emergencyFund = emergencyFundRes.data;

      // Calculate totals
      let total_income = 0;
      let total_expenses = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transactions.forEach((t: any) => {
        const type = t.categories?.type;
        if (type === 'income') {
          total_income += Number(t.amount);
        } else if (type === 'expense') {
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
        .select('id, amount, description, category_id, date, categories(name)')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transactions: TransactionSummary[] = (data || []).map((t: any) => ({
        id: t.id,
        amount: Number(t.amount),
        description: t.description,
        category_id: t.category_id,
        category_name: t.categories?.name,
        date: t.date,
      }));

      return { data: transactions, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async getSpendingByCategory(
    userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    range: 'Week' | 'Month' | 'Year' = 'Month'
  ): Promise<ServiceResult<CategorySpending[]>> {
    try {
      // For a real implementation, you would filter by date based on the `range` parameter.
      // E.g. date >= startOfMonth
      const { data, error } = await this.supabase
        .from('transactions')
        .select('amount, categories(name, type)')
        .eq('user_id', userId);

      if (error) throw error;

      const categoryMap = new Map<string, number>();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data || []).forEach((t: any) => {
        if (t.categories?.type === 'expense') {
          const catName = t.categories?.name || 'Uncategorized';
          const current = categoryMap.get(catName) || 0;
          categoryMap.set(catName, current + Number(t.amount));
        }
      });

      const colors = [
        '#F87171',
        '#60A5FA',
        '#A78BFA',
        '#34D399',
        '#FBBF24',
        '#FBB868',
      ];

      const result: CategorySpending[] = Array.from(categoryMap.entries()).map(
        ([name, value], idx) => ({
          name,
          value,
          color: colors[idx % colors.length],
        })
      );

      // Sort by value descending
      result.sort((a, b) => b.value - a.value);

      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
