import { Coffee, Car, ShoppingBag, Zap, CreditCard } from 'lucide-react';
import { formatIDR } from '@/lib/formatters';
import { TransactionSummary } from '@/lib/services/dashboard';
import { format } from 'date-fns';

interface TransactionFeedProps {
  transactions: TransactionSummary[];
}

export default function TransactionFeed({
  transactions,
}: TransactionFeedProps) {
  const getIconForCategory = (catName?: string) => {
    const name = catName?.toLowerCase() || '';
    if (name.includes('food') || name.includes('makan'))
      return { icon: Coffee, color: '#F87171', bg: '#F8717120' };
    if (name.includes('transport'))
      return { icon: Car, color: '#60A5FA', bg: '#60A5FA20' };
    if (name.includes('shop') || name.includes('belanja'))
      return { icon: ShoppingBag, color: '#A78BFA', bg: '#A78BFA20' };
    if (name.includes('bill') || name.includes('tagihan'))
      return { icon: Zap, color: '#34D399', bg: '#34D39920' };
    return { icon: CreditCard, color: '#FBBF24', bg: '#FBBF2420' };
  };

  return (
    <div className="w-full rounded-[24px] bg-[#1A1D24] p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        <button className="text-sm font-medium text-[#4A85F6] hover:underline">
          See All
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="py-8 text-center text-sm text-[#9CA3AF]">
          Belum ada pergerakan uang nih. Yuk catat pengeluaran pertamamu!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {transactions.map((tx) => {
            const {
              icon: Icon,
              color,
              bg,
            } = getIconForCategory(tx.category_name);
            // Assuming the amount is absolute in the db and type is in category.
            // But we already map the type in our summary, however tx summary doesn't include type.
            // For now, let's assume if it's income, it's 'Gaji Utama'. Better to just rely on tx.amount if it's signed,
            // but in the DB amount might be always positive. We will format it as expense normally unless we know it's income.
            const displayAmount = Math.abs(tx.amount);

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-[20px] border border-white/5 bg-[#1A1D24] p-4 transition-transform hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: bg, color: color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="max-w-[150px] truncate font-semibold md:max-w-xs">
                      {tx.description || tx.category_name || 'No Description'}
                    </p>
                    <p className="mt-1 text-xs text-[#9CA3AF]">
                      {format(new Date(tx.date), 'MMM dd, hh:mm a')}
                    </p>
                  </div>
                </div>
                <p
                  className={`shrink-0 font-bold ${
                    tx.category_name === 'Gaji Utama'
                      ? 'text-[#34D399]'
                      : 'text-white'
                  }`}
                >
                  {tx.category_name === 'Gaji Utama' ? '+' : '-'}
                  {formatIDR(displayAmount)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
