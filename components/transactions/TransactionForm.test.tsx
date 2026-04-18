import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionForm } from './TransactionForm';
import { describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  transaction: {
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
  category: {
    Food: 'Food',
    Rent: 'Rent',
    Salary: 'Salary',
  },
};

describe('TransactionForm', () => {
  const mockCategories = [
    {
      id: 'cat-1',
      name: 'Food',
      type: 'expense' as const,
      classification: 'kebutuhan',
    },
    {
      id: 'cat-2',
      name: 'Rent',
      type: 'expense' as const,
      classification: 'kebutuhan',
    },
    {
      id: 'cat-3',
      name: 'Salary',
      type: 'income' as const,
      classification: 'pendapatan',
    },
  ];

  const renderForm = (props = {}) => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TransactionForm
          categories={mockCategories}
          onSubmit={vi.fn()}
          {...props}
        />
      </NextIntlClientProvider>
    );
  };

  it('renders all fields with translated labels', () => {
    renderForm();

    expect(screen.getByText('Transaction Type')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Classification')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('shows loading state on submit button', () => {
    renderForm({ isLoading: true });
    const submitButton = screen.getByRole('button', {
      name: /save/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it('filters categories based on selected transaction type', async () => {
    renderForm();

    // Default is expense
    const selectTriggers = screen.getAllByRole('combobox');
    const categoryTrigger = selectTriggers[0]; // First one is Category
    fireEvent.click(categoryTrigger);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument();
    });
    expect(screen.getByRole('option', { name: 'Rent' })).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'Salary' })
    ).not.toBeInTheDocument();

    // Close the dropdown
    fireEvent.keyDown(categoryTrigger, { key: 'Escape', code: 'Escape' });

    // Switch to income
    const typeSwitch = screen.getByRole('switch');
    fireEvent.click(typeSwitch);

    fireEvent.click(categoryTrigger);

    await waitFor(() => {
      expect(
        screen.getByRole('option', { name: 'Salary' })
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByRole('option', { name: 'Food' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'Rent' })
    ).not.toBeInTheDocument();
  });

  it('automatically sets classification when category changes', async () => {
    renderForm();

    const selectTriggers = screen.getAllByRole('combobox');
    const categoryTrigger = selectTriggers[0];

    fireEvent.click(categoryTrigger);
    await waitFor(() => {
      fireEvent.click(screen.getByRole('option', { name: 'Food' }));
    });

    // Food has classification 'kebutuhan' which is mapped to 'Needs' in our test messages
    await waitFor(() => {
      expect(screen.getAllByText('Needs').length).toBeGreaterThan(0);
    });
  });
});
