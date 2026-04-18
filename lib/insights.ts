export interface Transaction {
  category_id: string | null;
  amount: number;
  name?: string | null;
  classification?: string | null;
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  classification?: string | null;
}

export interface Insight {
  content: string;
  type: 'warning' | 'encouragement' | 'saving_tip';
}

/**
 * Generates logic-based financial insights in a casual Indonesian persona.
 * Now enhanced with classification-based strategy analysis.
 *
 * @param transactions - Current month's transactions
 * @param categories - User's budget categories with limits
 * @param totalIncome - User's total income for the month
 * @param strategy - User's budget strategy (e.g., '50/30/20')
 * @returns Array of generated insights
 */
export function generateInsights(
  transactions: Transaction[],
  categories: BudgetCategory[],
  totalIncome: number,
  strategy: string = '50/30/20'
): Insight[] {
  const insights: Insight[] = [];

  // 1. Calculate totals per category and classification
  const categoryTotals = new Map<string, number>();
  const classificationTotals = new Map<string, number>();
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.category_id) {
      const current = categoryTotals.get(t.category_id) || 0;
      categoryTotals.set(t.category_id, current + Number(t.amount));
    }

    if (t.classification) {
      const current = classificationTotals.get(t.classification) || 0;
      classificationTotals.set(t.classification, current + Number(t.amount));
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

  // 3. Strategy-based Analysis (e.g., 50/30/20)
  if (totalIncome > 0) {
    const [needsPct, wantsPct, savingsPct] = strategy.split('/').map(Number);

    const totalNeeds = Math.abs(classificationTotals.get('kebutuhan') || 0);
    const totalWants = Math.abs(classificationTotals.get('keinginan') || 0);
    const totalSavings = Math.abs(classificationTotals.get('tabungan') || 0);

    if (totalNeeds > totalIncome * (needsPct / 100)) {
      insights.push({
        type: 'warning',
        content: `Pengeluaran 'Kebutuhan' kamu sudah melebihi ${needsPct}% dari pemasukan. Coba cek lagi ya! 📋`,
      });
    }

    if (totalWants > totalIncome * (wantsPct / 100)) {
      insights.push({
        type: 'warning',
        content: `Wah, belanja 'Keinginan' kamu sudah lewat dari ${wantsPct}%. Yuk, lebih bijak lagi! 🛍️`,
      });
    }

    if (totalSavings < totalIncome * (savingsPct / 100) && totalSavings === 0) {
      insights.push({
        type: 'saving_tip',
        content: `Target tabungan kamu itu ${savingsPct}%, tapi bulan ini masih nol. Yuk mulai sisihin! 💰`,
      });
    }
  }

  // 4. Deficit Warning: Total expenses > Total income
  if (totalExpenses > totalIncome && totalIncome > 0) {
    insights.push({
      type: 'warning',
      content:
        'Waduh, pengeluaranmu bulan ini udah lebih gede dari pemasukan. Bahaya nih, yuk ngerem! 📉',
    });
  }

  return insights;
}
