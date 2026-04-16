import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { TransactionFormContainer } from './TransactionFormContainer';
import { useTransactionModal } from './TransactionContext';
import { addTransaction } from '@/app/transactions/actions';
import { toast } from 'sonner';

// Mock dependencies
vi.mock('./TransactionContext', () => ({
  useTransactionModal: vi.fn(() => ({ setOpen: vi.fn() })),
}));

vi.mock('@/app/transactions/actions', () => ({
  addTransaction: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('./TransactionForm', () => ({
  TransactionForm: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
    <button
      onClick={() =>
        onSubmit({
          type: 'expense',
          amount: 100,
          category_id: '1',
          date: new Date(),
          note: '',
        })
      }
    >
      Mock Submit
    </button>
  ),
}));

describe('TransactionFormContainer', () => {
  it('renders TransactionForm and handles successful submission', async () => {
    const mockSetOpen = vi.fn();
    (useTransactionModal as Mock).mockReturnValue({ setOpen: mockSetOpen });
    (addTransaction as Mock).mockResolvedValue({ success: true });

    render(<TransactionFormContainer />);

    screen.getByText('Mock Submit').click();

    await waitFor(() => {
      expect(addTransaction).toHaveBeenCalled();
      expect(mockSetOpen).toHaveBeenCalledWith(false);
      expect(toast.success).toHaveBeenCalledWith('Transaksi berhasil disimpan');
    });
  });

  it('handles failed submission', async () => {
    (addTransaction as Mock).mockResolvedValue({ error: 'DB Error' });

    render(<TransactionFormContainer />);

    screen.getByText('Mock Submit').click();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('DB Error');
    });
  });
});
