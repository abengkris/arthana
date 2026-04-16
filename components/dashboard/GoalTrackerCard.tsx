import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatIDR } from '@/lib/formatters';

interface GoalTrackerCardProps {
  current: number;
  target: number;
}

export default function GoalTrackerCard({
  current,
  target,
}: GoalTrackerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Tabungan Impian 🚀</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm">
          Langkah kecil menuju kebebasan finansialmu!
        </p>
        <div className="text-2xl font-bold">
          {formatIDR(current)} / {formatIDR(target)}
        </div>
      </CardContent>
    </Card>
  );
}
