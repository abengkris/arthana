import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionForm } from './TransactionForm';
import { describe, it, expect, vi } from 'vitest';

describe('TransactionForm', () => {
  const mockCategories = [
    { id: 'cat-1', name: 'Food', type: 'expense' as const },
    { id: 'cat-2', name: 'Rent', type: 'expense' as const },
    { id: 'cat-3', name: 'Salary', type: 'income' as const },
  ];

  it('renders all fields with Indonesian labels', () => {
    render(<TransactionForm categories={mockCategories} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Jenis Transaksi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nominal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kategori/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tanggal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Catatan/i)).toBeInTheDocument();
  });

  it('shows loading state on submit button with Indonesian text', () => {
    render(
      <TransactionForm
        categories={mockCategories}
        onSubmit={vi.fn()}
        isLoading={true}
      />
    );
    const submitButton = screen.getByRole('button', {
      name: /simpan/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it('filters categories based on selected transaction type', async () => {
    render(<TransactionForm categories={mockCategories} onSubmit={vi.fn()} />);

    // Default is expense
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument();
    });
    expect(screen.getByRole('option', { name: 'Rent' })).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'Salary' })
    ).not.toBeInTheDocument();

    // Close the dropdown
    fireEvent.keyDown(selectTrigger, { key: 'Escape', code: 'Escape' });

    // Switch to income
    const typeSwitch = screen.getByRole('switch', { name: /Jenis Transaksi/i });
    fireEvent.click(typeSwitch);

    fireEvent.click(selectTrigger);

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

  it('resets category selection when transaction type changes', async () => {
    render(<TransactionForm categories={mockCategories} onSubmit={vi.fn()} />);

    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('option', { name: 'Food' }));

    // Switch to income
    const typeSwitch = screen.getByRole('switch', { name: /Jenis Transaksi/i });
    fireEvent.click(typeSwitch);

    expect(screen.getByText('Pilih kategori')).toBeInTheDocument();
  });
});
