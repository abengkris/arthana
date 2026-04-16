import React from 'react';
import { AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface AIInsightCardProps {
  content: string;
  type: 'warning' | 'encouragement' | 'saving_tip';
  className?: string;
}

export function AIInsightCard({
  content,
  type,
  className,
}: AIInsightCardProps) {
  const config = {
    warning: {
      icon: AlertTriangle,
      title: 'Perhatian!',
      variant: 'destructive' as const,
      colorClass:
        'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    },
    encouragement: {
      icon: TrendingUp,
      title: 'Hebat!',
      variant: 'default' as const,
      colorClass:
        'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600',
    },
    saving_tip: {
      icon: Lightbulb,
      title: 'Tips Hemat',
      variant: 'default' as const,
      colorClass:
        'border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-600',
    },
  };

  const { icon: Icon, title, variant, colorClass } = config[type];

  return (
    <Alert variant={variant} className={cn(colorClass, className)}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{content}</AlertDescription>
    </Alert>
  );
}
