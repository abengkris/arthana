import { Suspense, cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import GreetingHeader from '@/components/dashboard/GreetingHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import GoalTrackerCard from '@/components/dashboard/GoalTrackerCard';
import BudgetProgressBar from '@/components/dashboard/BudgetProgressBar';
import TransactionFeed from '@/components/dashboard/TransactionFeed';
import { getDashboardData } from './actions';
import { AIInsightSection } from '@/components/dashboard/AIInsightSection';
import { SummaryCardsSkeleton } from '@/components/dashboard/SummaryCardsSkeleton';
import { AIInsightSkeleton } from '@/components/dashboard/AIInsightSkeleton';
import { TransactionFeedSkeleton } from '@/components/dashboard/TransactionFeedSkeleton';
import { SectionErrorBoundary } from '@/components/dashboard/SectionErrorBoundary';
import { SupabaseDashboardService } from '@/lib/services/supabase-dashboard';

// Cache the dashboard data fetch so we don't hit the DB multiple times
// if multiple components need the same summary data.
const getCachedDashboardData = cache(async () => {
  return await getDashboardData();
});

async function SummaryCardsAsync() {
  const data = await getCachedDashboardData();
  return (
    <SummaryCards
      balance={data.balance}
      income={data.total_income}
      expenses={data.total_expenses}
    />
  );
}

async function MetricsCardsAsync() {
  const data = await getCachedDashboardData();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <GoalTrackerCard current={data.savings} target={data.target} />
      <div>
        <h3 className="mb-4 text-lg font-bold">Anggaranmu</h3>
        <BudgetProgressBar
          label="Kebutuhan Harian"
          progress={65}
          status="safe"
        />
        <BudgetProgressBar
          label="Langganan Digital"
          progress={90}
          status="warning"
        />
      </div>
    </div>
  );
}

async function TransactionFeedAsync() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const dashboardService = new SupabaseDashboardService(supabase);
  const { data, error } = await dashboardService.getRecentTransactions(user.id);

  if (error) {
    throw error;
  }

  return <TransactionFeed transactions={data || []} />;
}

/**
 * Dashboard Overview Page
 * Fetches the user session and displays a friendly dashboard.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-6">
      <GreetingHeader
        name={user?.user_metadata?.name || user?.email?.split('@')[0] || ''}
      />

      <SectionErrorBoundary>
        <Suspense fallback={<AIInsightSkeleton />}>
          <AIInsightSection />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <Suspense fallback={<SummaryCardsSkeleton />}>
          <SummaryCardsAsync />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="bg-muted h-[150px] animate-pulse rounded-lg" />
              <div className="bg-muted h-[150px] animate-pulse rounded-lg" />
            </div>
          }
        >
          <MetricsCardsAsync />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <Suspense fallback={<TransactionFeedSkeleton />}>
          <TransactionFeedAsync />
        </Suspense>
      </SectionErrorBoundary>
    </div>
  );
}
