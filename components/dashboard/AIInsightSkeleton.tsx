import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function AIInsightSkeleton() {
  return (
    <Alert className="border-muted bg-muted/20">
      <Skeleton className="h-4 w-4 rounded-full" />
      <AlertTitle>
        <Skeleton className="mb-2 h-5 w-24" />
      </AlertTitle>
      <AlertDescription>
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </AlertDescription>
    </Alert>
  );
}
