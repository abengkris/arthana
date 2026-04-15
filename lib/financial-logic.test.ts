import { describe, it, expect } from 'vitest';
import {
  calculateEF,
  getDefaultCategories,
  OnboardingData,
} from './financial-logic';
import {
  EF_MULTIPLIER_BASE,
  EF_MULTIPLIER_EXTENDED,
  DEFAULT_CATEGORIES,
  TRANSITION_CATEGORY,
} from './constants';

describe('financial-logic', () => {
  describe('calculateEF', () => {
    it('should calculate 6x income for Full-time without dependents', () => {
      const data: OnboardingData = {
        monthlyIncome: 10000,
        employmentType: 'Full-time',
        hasDependents: false,
        planningCareerPivot: false,
      };
      expect(calculateEF(data)).toBe(10000 * EF_MULTIPLIER_BASE);
    });

    it('should calculate 12x income for Full-time with dependents', () => {
      const data: OnboardingData = {
        monthlyIncome: 10000,
        employmentType: 'Full-time',
        hasDependents: true,
        planningCareerPivot: false,
      };
      expect(calculateEF(data)).toBe(10000 * EF_MULTIPLIER_EXTENDED);
    });

    it('should calculate 12x income for Freelance without dependents', () => {
      const data: OnboardingData = {
        monthlyIncome: 10000,
        employmentType: 'Freelance',
        hasDependents: false,
        planningCareerPivot: false,
      };
      expect(calculateEF(data)).toBe(10000 * EF_MULTIPLIER_EXTENDED);
    });

    it('should calculate 12x income for Business Owner without dependents', () => {
      const data: OnboardingData = {
        monthlyIncome: 10000,
        employmentType: 'Business Owner',
        hasDependents: false,
        planningCareerPivot: false,
      };
      expect(calculateEF(data)).toBe(10000 * EF_MULTIPLIER_EXTENDED);
    });
  });

  describe('getDefaultCategories', () => {
    it('should return base categories for users not planning a pivot', () => {
      const data: OnboardingData = {
        monthlyIncome: 10000,
        employmentType: 'Full-time',
        hasDependents: false,
        planningCareerPivot: false,
      };
      const categories = getDefaultCategories(data);
      expect(categories).toEqual(
        expect.arrayContaining([...DEFAULT_CATEGORIES])
      );
      expect(categories).not.toContain(TRANSITION_CATEGORY);
      expect(categories.length).toBe(DEFAULT_CATEGORIES.length);
    });

    it('should include Dana Transisi for users planning a career pivot', () => {
      const data: OnboardingData = {
        monthlyIncome: 10000,
        employmentType: 'Full-time',
        hasDependents: false,
        planningCareerPivot: true,
      };
      const categories = getDefaultCategories(data);
      expect(categories).toContain(TRANSITION_CATEGORY);
      expect(categories.length).toBe(DEFAULT_CATEGORIES.length + 1);
    });
  });
});
