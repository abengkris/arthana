export interface Transaction {
  category_id: string | null;
  amount: number;
  name?: string | null;
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
}

export interface Insight {
  content: string;
  type: 'warning' | 'encouragement' | 'saving_tip';
}

/**
 * Generates logic-based financial insights in a casual Indonesian persona.
 *
 * @param transactions - Current month's transactions
 * @param categories - User's budget categories with limits
 * @param totalIncome - User's total income for the month
 * @returns Array of generated insights
 */
export function generateInsights(
  transactions: Transaction[],
  categories: BudgetCategory[],
  totalIncome: number
): Insight[] {
  const insights: Insight[] = [];

  // 1. Calculate totals per category
  const categoryTotals = new Map<string, number>();
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.category_id) {
      const current = categoryTotals.get(t.category_id) || 0;
      categoryTotals.set(t.category_id, current + Number(t.amount));
    }
    totalExpenses += Number(t.amount);
  });

  // 2. Budget Warning: Category exceeds 80%
  categories.forEach((cat) => {
    const total = categoryTotals.get(cat.id) || 0;
    if (cat.limit > 0 && total >= cat.limit * 0.8) {
      insights.push({
        type: 'warning',
        content: `Waduh, jatah ${cat.name.toLowerCase()}mu udah mepet nih. Yuk, ngerem dikit! 🛑`,
      });
    }
  });

  // 3. Deficit Warning: Total expenses > Total income
  if (totalExpenses > totalIncome && totalIncome > 0) {
    insights.push({
      type: 'warning',
      content:
        'Waduh, pengeluaranmu bulan ini udah lebih gede dari pemasukan. Bahaya nih, yuk ngerem! 📉',
    });
  }

  // 4. Savings Prompt: 'Investasi' category is empty
  const investasiCat = categories.find((c) =>
    c.name.toLowerCase().includes('investasi')
  );
  if (investasiCat) {
    const totalInvestasi = categoryTotals.get(investasiCat.id) || 0;
    if (totalInvestasi === 0) {
      insights.push({
        type: 'saving_tip',
        content:
          'Bulan ini belum ada dana masuk ke Investasi nih. Yuk, sisihin dikit buat masa depan! 💰',
      });
    }
  }

  return insights;
}
