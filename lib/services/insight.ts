import { ServiceResult } from './types';

export interface InsightItem {
  content: string;
  type: 'warning' | 'encouragement' | 'saving_tip';
}

/**
 * Interface for the Insight Service.
 * Provides methods for fetching and generating AI-driven financial insights.
 */
export interface IInsightService {
  /**
   * Fetches the current insights for the user from the database.
   * Filters based on the user's subscription tier.
   */
  getInsights(userId: string): Promise<ServiceResult<InsightItem[]>>;

  /**
   * Refreshes the insights by fetching latest data, generating new insights,
   * and updating the database (ephemeral logic).
   */
  refreshInsights(userId: string): Promise<ServiceResult<InsightItem[]>>;
}
