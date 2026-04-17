import { ServiceResult } from './types';

export interface DashboardSummary {
  total_income: number;
  total_expenses: number;
  balance: number;
  investments: number;
  savings: number;
  target: number;
}

export interface TransactionSummary {
  id: string;
  amount: number;
  description: string;
  category_id: string | null;
  category_name?: string;
  date: string;
}

export interface CategorySpending {
  name: string;
  value: number;
  color: string;
}

/**
 * Interface for the Dashboard Service.
 * Provides methods for fetching user-specific financial data for the dashboard.
 */
export interface IDashboardService {
  /**
   * Fetches the dashboard summary for the current user.
   */
  getSummary(userId: string): Promise<ServiceResult<DashboardSummary>>;

  /**
   * Fetches the recent transactions for the current user.
   */
  getRecentTransactions(
    userId: string,
    limit?: number
  ): Promise<ServiceResult<TransactionSummary[]>>;

  /**
   * Fetches spending grouped by category for a specific time range.
   */
  getSpendingByCategory(
    userId: string,
    range?: 'Week' | 'Month' | 'Year'
  ): Promise<ServiceResult<CategorySpending[]>>;
}
