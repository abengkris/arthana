import { render, screen } from '@testing-library/react';
import SummaryCards from './SummaryCards';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  dashboard: {
    balance: 'Total Balance',
    income: 'Income',
    expenses: 'Expenses',
  },
};

describe('SummaryCards', () => {
  it('renders summary cards with correct labels', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SummaryCards balance={5000} income={2000} expenses={500} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/Total Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Income/i)).toBeInTheDocument();
    expect(screen.getByText(/Expenses/i)).toBeInTheDocument();
  });
});
