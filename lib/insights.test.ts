import { describe, it, expect } from 'vitest';
import {
  generateInsights,
  type Transaction,
  type BudgetCategory,
} from './insights';

describe('generateInsights', () => {
  const mockCategories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Kebutuhan Pokok',
      limit: 5000000,
      classification: 'kebutuhan',
    },
    {
      id: '2',
      name: 'Tabungan Masa Depan',
      limit: 1000000,
      classification: 'tabungan',
    },
    { id: '3', name: 'Jajan', limit: 1000000, classification: 'keinginan' },
  ];

  it('generates a budget warning when a category exceeds 80%', () => {
    const transactions: Transaction[] = [
      {
        category_id: '3',
        amount: 850000,
        name: 'Kopi Sultan',
        classification: 'keinginan',
      },
    ];
    const totalIncome = 10000000;

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome
    );

    const warning = insights.find(
      (i) => i.type === 'warning' && i.content.includes('jajan')
    );
    expect(warning).toBeDefined();
    expect(warning?.content).toContain('mepet');
  });

  it('generates a strategy violation warning when needs exceed limit', () => {
    const transactions: Transaction[] = [
      {
        category_id: '1',
        amount: 6000000,
        name: 'Sewa Apart',
        classification: 'kebutuhan',
      },
    ];
    const totalIncome = 10000000; // 50% limit is 5,000,000

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome,
      '50/30/20'
    );

    const violation = insights.find(
      (i) =>
        i.type === 'warning' &&
        i.content.includes('Kebutuhan') &&
        i.content.includes('50%')
    );
    expect(violation).toBeDefined();
  });

  it('generates a savings prompt when strategy target is not met', () => {
    const transactions: Transaction[] = [
      {
        category_id: '1',
        amount: 1000000,
        name: 'Belanja',
        classification: 'kebutuhan',
      },
    ];
    const totalIncome = 10000000;

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome,
      '50/30/20'
    );

    const prompt = insights.find(
      (i) => i.type === 'saving_tip' && i.content.includes('20%')
    );
    expect(prompt).toBeDefined();
  });

  it('does not generate savings prompt if strategy target has transactions', () => {
    const transactions: Transaction[] = [
      {
        category_id: '2',
        amount: 500000,
        name: 'Beli Saham',
        classification: 'tabungan',
      },
    ];
    const totalIncome = 10000000;

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome,
      '50/30/20'
    );

    const prompt = insights.find(
      (i) => i.type === 'saving_tip' && i.content.includes('20%')
    );
    expect(prompt).toBeUndefined();
  });
});
