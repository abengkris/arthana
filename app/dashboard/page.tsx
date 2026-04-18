import { Suspense, cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import GreetingHeader from '@/components/dashboard/GreetingHeader';
import MobileHeader from '@/components/dashboard/MobileHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import TimeFilter from '@/components/dashboard/TimeFilter';
import SpendingByCategory from '@/components/dashboard/SpendingByCategory';
import TransactionFeed from '@/components/dashboard/TransactionFeed';
import { AIInsightSection } from '@/components/dashboard/AIInsightSection';
import { AIInsightSkeleton } from '@/components/dashboard/AIInsightSkeleton';
import { getDashboardData, getDashboardSpendingByCategory } from './actions';
import { SummaryCardsSkeleton } from '@/components/dashboard/SummaryCardsSkeleton';
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

async function SpendingByCategoryAsync() {
  const data = await getDashboardSpendingByCategory();
  return <SpendingByCategory categories={data} />;
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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
      <MobileHeader />
      <div className="mb-6 hidden lg:block">
        <GreetingHeader
          name={user?.user_metadata?.name || user?.email?.split('@')[0] || ''}
        />
      </div>

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

      <div className="flex justify-center md:justify-start">
        <TimeFilter />
      </div>

      <SectionErrorBoundary>
        <Suspense
          fallback={
            <div className="mb-8 h-[200px] animate-pulse rounded-[24px] bg-[#1A1D24]" />
          }
        >
          <SpendingByCategoryAsync />
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
