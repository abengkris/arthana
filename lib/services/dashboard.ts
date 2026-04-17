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
  category_id: string;
  date: string;
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
}
