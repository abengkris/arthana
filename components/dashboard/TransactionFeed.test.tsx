import { render, screen } from '@testing-library/react';
import TransactionFeed from './TransactionFeed';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  dashboard: {
    recent_transactions: 'Recent Transactions',
    view_all: 'View All',
    recent_transactions_empty: 'No transactions found.',
  },
  category: {
    Food: 'Food',
    Salary: 'Salary',
  },
};

describe('TransactionFeed', () => {
  const mockTransactions = [
    {
      id: '1',
      user_id: 'user-1',
      amount: -50,
      category_name: 'Food',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: 'user-1',
      amount: 2000,
      category_name: 'Salary',
      date: new Date().toISOString(),
    },
  ];

  it('renders a list of transactions', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TransactionFeed transactions={mockTransactions} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/Recent Transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/Food/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
  });
});
