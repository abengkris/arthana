import { render, screen } from '@testing-library/react';
import TransactionFeed from './TransactionFeed';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  dashboard: {
    recent_transactions: 'Recent Transactions',
    view_all: 'View All',
    recent_transactions_empty: 'No movement yet.',
  },
};

describe('TransactionFeed', () => {
  it('renders empty state message when no transactions', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TransactionFeed transactions={[]} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/No movement yet/i)).toBeInTheDocument();
  });
});
