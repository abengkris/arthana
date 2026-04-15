import { render, screen } from '@testing-library/react';
import { TransactionModal } from './TransactionModal';
import { describe, it, expect, vi } from 'vitest';

describe('TransactionModal', () => {
  it('renders the modal when open is true', () => {
    render(<TransactionModal open={true} onOpenChange={vi.fn()} />);
    expect(screen.getByText(/add transaction/i)).toBeInTheDocument();
  });

  it('does not render the modal when open is false', () => {
    render(<TransactionModal open={false} onOpenChange={vi.fn()} />);
    expect(screen.queryByText(/add transaction/i)).not.toBeInTheDocument();
  });
});
