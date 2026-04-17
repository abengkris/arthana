import { Skeleton } from '@/components/ui/skeleton';

export function TransactionFeedSkeleton() {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold text-balance">Jejak Uangmu</h2>
      <ul className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded border p-4"
          >
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[25%]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
