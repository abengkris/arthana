import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { vi, describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  header: {
    dashboard: 'Dashboard',
    new_transaction: 'New Transaction',
    my_account: 'My Account',
    logout: 'Logout',
  },
};

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Header', () => {
  const renderHeader = () =>
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

  it('renders breadcrumbs placeholder', () => {
    renderHeader();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    renderHeader();
    expect(screen.getByLabelText(/user menu/i)).toBeInTheDocument();
  });

  it('renders New Transaction button', () => {
    renderHeader();
    expect(screen.getByText(/New Transaction/i)).toBeInTheDocument();
  });
});
