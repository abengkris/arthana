import { Coffee, Car, ShoppingBag, Zap, CreditCard } from 'lucide-react';
import { formatIDR } from '@/lib/formatters';
import { TransactionSummary } from '@/lib/services/dashboard';
import { format } from 'date-fns';

interface TransactionFeedProps {
  transactions: TransactionSummary[];
}

import { useTranslations } from 'next-intl';

export default function TransactionFeed({
  transactions,
}: TransactionFeedProps) {
  const t = useTranslations('dashboard');
  const tc = useTranslations('category');

  const getIconForCategory = (catName?: string) => {
    const name = catName?.toLowerCase() || '';
    if (name.includes('salary') || name.includes('gaji'))
      return { icon: Zap, color: '#34D399', bg: '#34D39920' };
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
        <h3 className="text-lg font-bold">{t('recent_transactions')}</h3>
        <button className="text-sm font-medium text-[#4A85F6] hover:underline">
          {t('view_all')}
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="py-8 text-center text-sm text-[#9CA3AF]">
          {t('recent_transactions_empty') || 'No transactions found.'}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {transactions.map((tx) => {
            const {
              icon: Icon,
              color,
              bg,
            } = getIconForCategory(tx.category_name);
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
                      {tx.description ||
                        (tx.category_name
                          ? tc(tx.category_name)
                          : 'No Description')}
                    </p>
                    <p className="mt-1 text-xs text-[#9CA3AF]">
                      {format(new Date(tx.date), 'MMM dd, hh:mm a')}
                    </p>
                  </div>
                </div>
                <p
                  className={`shrink-0 font-bold ${
                    tx.amount > 0 ? 'text-[#34D399]' : 'text-white'
                  }`}
                >
                  {tx.amount > 0 ? '+' : '-'}
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
