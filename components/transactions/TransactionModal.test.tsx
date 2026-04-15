import { render, screen } from '@testing-library/react';
import { TransactionModal } from './TransactionModal';
import { describe, it, expect, vi } from 'vitest';
import { TransactionProvider } from './TransactionContext';

describe('TransactionModal', () => {
  const renderWithProvider = (open: boolean) =>
    render(
      <TransactionProvider>
        <TransactionModal open={open} onOpenChange={vi.fn()} />
      </TransactionProvider>
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
