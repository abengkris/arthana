import { render, screen } from '@testing-library/react';
import { TransactionModal } from './TransactionModal';
import { describe, it, expect, vi } from 'vitest';
import { TransactionProvider } from './TransactionContext';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  transaction: {
    add_new: 'Add Transaction',
    type: 'Transaction Type',
    amount: 'Amount',
    category: 'Category',
    classification: 'Classification',
    classification_options: {
      kebutuhan: 'Needs',
      keinginan: 'Wants',
      tabungan: 'Savings',
      pendapatan: 'Income',
    },
    description: 'Description',
    date: 'Date',
    save: 'Save',
  },
  category: {},
};

describe('TransactionModal', () => {
  const renderWithProvider = (open: boolean) =>
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TransactionProvider>
          <TransactionModal open={open} onOpenChange={vi.fn()} />
        </TransactionProvider>
      </NextIntlClientProvider>
    );

  it('renders the modal when open is true', () => {
    renderWithProvider(true);
    expect(
      screen.getByRole('heading', { name: /add transaction/i })
    ).toBeInTheDocument();
  });

  it('does not render the modal when open is false', () => {
    renderWithProvider(false);
    expect(screen.queryByText(/add transaction/i)).not.toBeInTheDocument();
  });
});
