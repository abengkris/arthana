import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addTransaction } from './actions';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Mock Supabase
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

// Mock Next.js cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('addTransaction Action', () => {
  const mockUser = { id: 'user-123' };
  const mockInsert = vi.fn().mockResolvedValue({ error: null });
  const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

  // Define a minimal mock for Supabase to satisfy TypeScript
  const mockSupabase = {
    auth: {
      getUser: vi
        .fn()
        .mockResolvedValue({ data: { user: mockUser }, error: null }),
    },
    from: mockFrom,
  } as unknown as ReturnType<typeof createClient>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createClient).mockResolvedValue(mockSupabase);
  });

  const validExpense = {
    type: 'expense' as const,
    amount: 100,
    category_id: '550e8400-e29b-41d4-a716-446655440000',
    date: new Date('2026-04-15'),
    note: 'Dinner',
  };

  it('successfully adds an expense with negative amount', async () => {
    const result = await addTransaction(validExpense);

    expect(result).toEqual({ success: true });
    expect(mockFrom).toHaveBeenCalledWith('transactions');
    expect(mockInsert).toHaveBeenCalledWith({
      user_id: mockUser.id,
      category_id: validExpense.category_id,
      amount: -100, // Negative for expense
      date: validExpense.date.toISOString(),
      note: 'Dinner',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/dashboard');
  });

  it('successfully adds income with positive amount', async () => {
    const validIncome = {
      ...validExpense,
      type: 'income' as const,
      amount: 500,
    };
    const result = await addTransaction(validIncome);

    expect(result).toEqual({ success: true });
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 500, // Positive for income
      })
    );
  });

  it('returns error on validation failure', async () => {
    // @ts-expect-error - explicitly testing invalid input
    const result = await addTransaction({ ...validExpense, amount: -10 });

    expect(result).toHaveProperty('error');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('returns error if user is not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValueOnce({
      data: { user: null },
      error: null,
    });
    const result = await addTransaction(validExpense);

    expect(result).toEqual({ error: 'Unauthorized' });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('returns error if database insertion fails', async () => {
    mockInsert.mockResolvedValueOnce({ error: { message: 'DB Error' } });
    const result = await addTransaction(validExpense);

    expect(result).toEqual({ error: 'DB Error' });
  });
});
