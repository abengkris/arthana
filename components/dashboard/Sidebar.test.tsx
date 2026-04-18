import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { vi, describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  nav: {
    dashboard: 'Dashboard',
    budgets: 'Budgets',
    transactions: 'Transactions',
    settings: 'Settings',
  },
};

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('Sidebar', () => {
  const renderSidebar = () =>
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Sidebar />
      </NextIntlClientProvider>
    );

  it('renders navigation links', () => {
    renderSidebar();
    expect(
      screen.getByRole('link', { name: /dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /budgets/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /transactions/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
  });

  it('marks active link based on pathname', () => {
    renderSidebar();
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute('data-active', 'true');
  });
});
