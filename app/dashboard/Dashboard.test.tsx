import { render, screen } from '@testing-library/react';
import DashboardPage from './page';
import { describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  dashboard: {
    balance: 'Total Balance',
    income: 'Income',
    expenses: 'Expenses',
    savings: 'Savings',
    recent_transactions: 'Recent Transactions',
    view_all: 'View All',
    recent_transactions_empty: 'No transactions',
    greeting: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
      night: 'Good Night',
      default: 'Hello',
      friend: 'Friend',
      question: 'How is your cash flow?',
    },
  },
  dashboard_charts: {
    spending_by_category: 'Spending by Category',
    spending_empty: 'No spending',
    total: 'Total',
  },
  header: {
    dashboard: 'Dashboard',
    new_transaction: 'New Transaction',
    my_account: 'My Account',
    logout: 'Logout',
  },
  nav: {
    dashboard: 'Dashboard',
    budgets: 'Budgets',
    transactions: 'Transactions',
    settings: 'Settings',
  },
  category: {},
};

// Mock Supabase
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(() =>
        Promise.resolve({
          data: { user: { id: 'user-123', email: 'test@example.com' } },
        })
      ),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() =>
            Promise.resolve({
              data: { full_name: 'Test User' },
              error: null,
            })
          ),
          order: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
        order: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  })),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  usePathname: vi.fn(() => '/dashboard'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

describe('Dashboard Integration', () => {
  it('renders dashboard with greeting', async () => {
    const Page = await DashboardPage();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Page}
      </NextIntlClientProvider>
    );

    // Should find the greeting or user identifier (in this case 'test' from email or 'Test User')
    expect(screen.getByText(/How is your cash flow/i)).toBeInTheDocument();
  });
});
