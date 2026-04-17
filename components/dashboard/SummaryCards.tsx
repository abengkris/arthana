import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { formatIDR } from '@/lib/formatters';

interface SummaryCardsProps {
  balance: number;
  income: number;
  expenses: number;
}

export default function SummaryCards({
  balance,
  income,
  expenses,
}: SummaryCardsProps) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[24px] bg-[#4A85F6] p-6 shadow-lg shadow-blue-500/20">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>

      <p className="relative z-10 mb-1 text-sm font-medium text-white/80">
        Total Balance
      </p>
      <h2 className="relative z-10 mb-8 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        {formatIDR(balance)}
      </h2>

      <div className="relative z-10 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/20 p-2">
            <ArrowDownToLine size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white/80">Income</p>
            <p className="font-semibold text-white">{formatIDR(income)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/20 p-2">
            <ArrowUpFromLine size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white/80">Expenses</p>
            <p className="font-semibold text-white">{formatIDR(expenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
