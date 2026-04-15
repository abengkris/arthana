import { createClient } from '@/utils/supabase/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

/**
 * Dashboard Overview Page
 * Fetches the user session and displays a welcome message.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome back to your financial command center.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>We&apos;re glad to see you again.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            You are logged in as:{' '}
            <span className="font-semibold">
              {user?.email || 'Unknown User'}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
