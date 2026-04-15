import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionForm } from './TransactionForm';
import { describe, it, expect, vi } from 'vitest';

describe('TransactionForm', () => {
  const mockCategories = [
    { id: 'cat-1', name: 'Food' },
    { id: 'cat-2', name: 'Rent' },
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

  // More complex tests for React Hook Form might require more setup with Select/Calendar
});
