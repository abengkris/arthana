import {
  EF_MULTIPLIER_BASE,
  EF_MULTIPLIER_EXTENDED,
  DEFAULT_CATEGORIES,
  TRANSITION_CATEGORY,
} from './constants';

export type EmploymentType = 'Full-time' | 'Freelance' | 'Business Owner';

export interface OnboardingData {
  monthlyIncome: number;
  employmentType: EmploymentType;
  hasDependents: boolean;
  planningCareerPivot: boolean;
}

/**
 * Calculates the emergency fund target based on income, employment, and dependents.
 * Multiplier:
 * - 6x: Full-time without dependents.
 * - 12x: Freelance/Business Owner OR has dependents.
 */
export function calculateEF(data: OnboardingData): number {
  const isExtended = data.employmentType !== 'Full-time' || data.hasDependents;
  const multiplier = isExtended ? EF_MULTIPLIER_EXTENDED : EF_MULTIPLIER_BASE;

  return data.monthlyIncome * multiplier;
}

/**
 * Returns the list of default budget categories based on user profile.
 * Always includes Kebutuhan Pokok, Investasi, Hiburan.
 * Adds Dana Transisi if planning a career pivot.
 */
export function getDefaultCategories(data: OnboardingData): string[] {
  const categories = [...DEFAULT_CATEGORIES];

  if (data.planningCareerPivot) {
    categories.push(TRANSITION_CATEGORY);
  }

  return categories;
}
