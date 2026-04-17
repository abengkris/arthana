import { Suspense } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import BottomNav from '@/components/dashboard/BottomNav';
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
      <div className="flex min-h-screen w-full bg-[#0F1115] pb-24 font-sans text-white lg:pb-0">
        {/* Sidebar - handles its own desktop fixed and mobile drawer states */}
        <Suspense
          fallback={<div className="bg-card hidden w-64 border-r lg:block" />}
        >
          <Sidebar />
        </Suspense>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col transition-[padding-left] duration-300 lg:pl-64">
          {/* Sticky Header - Mostly for Desktop now, mobile can have its own or share this */}
          <div className="hidden lg:block">
            <Header />
          </div>

          {/* Dynamic Content */}
          <main className="flex-1 overflow-x-hidden p-4 lg:p-8">
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </TransactionModalRoot>
  );
}
