import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Sisa Dompet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatIDR(balance)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Uang Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatIDR(income)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Uang Keluar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatIDR(expenses)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
