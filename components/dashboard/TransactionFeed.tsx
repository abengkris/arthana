import { formatIDR } from '@/lib/formatters';

interface Transaction {
  id: string;
  amount: number;
  description: string;
}

interface TransactionFeedProps {
  transactions: Transaction[];
}

export default function TransactionFeed({
  transactions,
}: TransactionFeedProps) {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold text-balance">Jejak Uangmu</h2>
      {transactions.length === 0 ? (
        <div className="text-muted-foreground py-8 text-center">
          Belum ada pergerakan uang nih. Yuk catat pengeluaran pertamamu!
        </div>
      ) : (
        <ul className="space-y-4">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <span>{t.description}</span>
              <span className="font-bold tabular-nums">
                {formatIDR(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
