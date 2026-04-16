import { Progress } from '@/components/ui/progress';

interface BudgetProgressBarProps {
  label: string;
  progress: number;
  status: 'safe' | 'warning' | 'over';
}

const getLabel = (status: string) => {
  switch (status) {
    case 'safe':
      return 'Masih aman terkendali 🟢';
    case 'warning':
      return 'Wah, udah mau limit nih, rem dikit ya! 🟡';
    case 'over':
      return 'Ups, jebol bosku! 🔴';
    default:
      return '';
  }
};

export default function BudgetProgressBar({
  label,
  progress,
  status,
}: BudgetProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex justify-between">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground text-xs">
          {getLabel(status)}
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
