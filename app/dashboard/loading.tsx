import { Card, CardHeader, CardContent } from '@/components/ui/card';

/**
 * Loading UI for the Dashboard
 */
export default function DashboardLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      {/* Greeting Skeleton */}
      <div className="bg-muted h-10 w-48 rounded-md" />

      {/* AI Insight Skeleton */}
      <div className="bg-muted h-24 w-full rounded-xl" />

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/50">
            <CardHeader className="pb-2">
              <div className="bg-muted h-4 w-24 rounded" />
            </CardHeader>
            <CardContent>
              <div className="bg-muted h-8 w-32 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-muted h-64 rounded-xl" />
        <div className="space-y-4">
          <div className="bg-muted h-6 w-32 rounded" />
          <div className="bg-muted h-12 w-full rounded" />
          <div className="bg-muted h-12 w-full rounded" />
        </div>
      </div>

      {/* Transaction Feed Skeleton */}
      <div className="bg-muted h-96 rounded-xl" />
    </div>
  );
}
