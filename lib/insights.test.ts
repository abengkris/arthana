import { describe, it, expect } from 'vitest';
import {
  generateInsights,
  type Transaction,
  type BudgetCategory,
} from './insights';

describe('generateInsights', () => {
  const mockCategories: BudgetCategory[] = [
    { id: '1', name: 'Kebutuhan Pokok', limit: 5000000 },
    { id: '2', name: 'Investasi', limit: 1000000 },
    { id: '3', name: 'Jajan', limit: 1000000 },
  ];

  it('generates a budget warning when a category exceeds 80%', () => {
    const transactions: Transaction[] = [
      { category_id: '3', amount: 850000, name: 'Kopi Sultan' },
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

  it('generates a deficit warning when expenses exceed income', () => {
    const transactions: Transaction[] = [
      { category_id: '1', amount: 6000000, name: 'Sewa Apart' },
    ];
    const totalIncome = 5000000;

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome
    );

    const deficit = insights.find(
      (i) => i.type === 'warning' && i.content.toLowerCase().includes('ngerem')
    );
    expect(deficit).toBeDefined();
  });

  it('generates a savings prompt when Investasi is empty', () => {
    const transactions: Transaction[] = [
      { category_id: '1', amount: 1000000, name: 'Belanja' },
    ];
    const totalIncome = 10000000;

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome
    );

    const prompt = insights.find(
      (i) =>
        i.type === 'saving_tip' && i.content.toLowerCase().includes('investasi')
    );
    expect(prompt).toBeDefined();
  });

  it('does not generate Investasi prompt if Investasi has transactions', () => {
    const transactions: Transaction[] = [
      { category_id: '2', amount: 500000, name: 'Beli Saham' },
    ];
    const totalIncome = 10000000;

    const insights = generateInsights(
      transactions,
      mockCategories,
      totalIncome
    );

    const prompt = insights.find(
      (i) =>
        i.type === 'saving_tip' && i.content.toLowerCase().includes('investasi')
    );
    expect(prompt).toBeUndefined();
  });
});
