import { z } from 'zod';
import {
  EF_MULTIPLIER_BASE,
  EF_MULTIPLIER_EXTENDED,
  DEFAULT_CATEGORIES,
  TRANSITION_CATEGORY,
} from './constants';

/**
 * Schema for user onboarding data validation using Zod.
 */
export const onboardingSchema = z.object({
  monthlyIncome: z.coerce.number().min(1, 'Income must be at least 1'),
  employmentType: z.enum(['Full-time', 'Freelance', 'Business Owner']),
  hasDependents: z.boolean(),
  planningCareerPivot: z.boolean(),
});

/**
 * Type inferred from onboardingSchema.
 */
export type OnboardingData = z.infer<typeof onboardingSchema>;

/**
 * Type for employment options.
 */
export type EmploymentType = OnboardingData['employmentType'];

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
