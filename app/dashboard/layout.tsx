import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { TransactionModalRoot } from '@/components/transactions/TransactionModalRoot';

/**
 * Dashboard Layout
 * Assembles the Sidebar and Header with a responsive content area.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionModalRoot>
      <div className="flex min-h-screen w-full">
        {/* Sidebar - handles its own desktop fixed and mobile drawer states */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col transition-all duration-300 lg:pl-64">
          {/* Sticky Header */}
          <Header />

          {/* Dynamic Content */}
          <main className="bg-muted/20 flex-1 p-4 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </TransactionModalRoot>
  );
}
