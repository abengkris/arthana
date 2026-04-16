import { createClient } from '@/utils/supabase/server';
import GreetingHeader from '@/components/dashboard/GreetingHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import GoalTrackerCard from '@/components/dashboard/GoalTrackerCard';
import BudgetProgressBar from '@/components/dashboard/BudgetProgressBar';
import TransactionFeed from '@/components/dashboard/TransactionFeed';
import { getDashboardData } from './actions';

/**
 * Dashboard Overview Page
 * Fetches the user session and displays a friendly dashboard.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getDashboardData();

  return (
    <div className="flex flex-col gap-6">
      <GreetingHeader name={user?.user_metadata?.name || 'Halo'} />

      <SummaryCards
        balance={data.balance}
        income={data.total_income}
        expenses={data.total_expenses}
      />

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

      <TransactionFeed transactions={[]} />
    </div>
  );
}
