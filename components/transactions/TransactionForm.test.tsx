import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionForm } from './TransactionForm';
import { describe, it, expect, vi } from 'vitest';

describe('TransactionForm', () => {
  const mockCategories = [
    { id: 'cat-1', name: 'Food' },
    { id: 'cat-2', name: 'Rent' },
  ];

  it('renders all fields', () => {
    render(<TransactionForm categories={mockCategories} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/transaction type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/note/i)).toBeInTheDocument();
  });

  it('shows loading state on submit button', () => {
    render(
      <TransactionForm
        categories={mockCategories}
        onSubmit={vi.fn()}
        isLoading={true}
      />
    );
    const submitButton = screen.getByRole('button', {
      name: /add transaction/i,
    });
    expect(submitButton).toBeDisabled();
  });

  // More complex tests for React Hook Form might require more setup with Select/Calendar
});
