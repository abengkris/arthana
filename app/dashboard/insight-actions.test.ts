import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { refreshInsights, getInsights } from './insight-actions';
import { createClient as createServerClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/insights', () => ({
  generateInsights: vi.fn().mockReturnValue([
    { content: 'Mock Insight 1', type: 'warning' },
    { content: 'Mock Insight 2', type: 'saving_tip' },
  ]),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('insight-actions', () => {
  const mockGetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('refreshInsights deletes old and inserts new insights', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });

    const createChain = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chain: any = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: {}, error: null }),
        delete: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
      };
      // For thenable (promise) support if needed by supabase-js
      // but here we are mock-awaiting them.
      return chain;
    };

    const mockTransactions = createChain();
    mockTransactions.gte.mockResolvedValue({ data: [], error: null });

    const mockBudget = createChain();
    mockBudget.single.mockResolvedValue({
      data: { total_income: 10000000 },
      error: null,
    });

    const mockCategories = createChain();
    // select().eq() is awaited directly
    mockCategories.eq.mockResolvedValue({ data: [], error: null });

    const mockProfile = createChain();
    mockProfile.single.mockResolvedValue({
      data: { subscription_tier: 'premium' },
      error: null,
    });

    const mockDelete = createChain();
    mockDelete.delete.mockReturnThis();
    mockDelete.eq.mockResolvedValue({ error: null });

    const mockInsert = createChain();
    mockInsert.insert.mockResolvedValue({ error: null });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockSupabase: any = {
      auth: { getUser: mockGetUser },
      from: vi
        .fn()
        .mockReturnValueOnce(mockTransactions) // transactions
        .mockReturnValueOnce(mockBudget) // budgets
        .mockReturnValueOnce(mockCategories) // categories
        .mockReturnValueOnce(mockProfile) // profiles
        .mockReturnValueOnce(mockDelete) // delete
        .mockReturnValueOnce(mockInsert), // insert
    };

    (createServerClient as Mock).mockReturnValue(mockSupabase);

    const insights = await refreshInsights();

    expect(mockSupabase.from).toHaveBeenCalledWith('transactions');
    expect(mockSupabase.from).toHaveBeenCalledWith('ai_insights');
    expect(insights).toHaveLength(2);
  });

  it('getInsights returns limited insights for free users', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });

    const mockInsights = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [
          { content: 'Insight 1', type: 'warning' },
          { content: 'Insight 2', type: 'saving_tip' },
        ],
        error: null,
      }),
    };

    const mockProfile = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { subscription_tier: 'free' },
        error: null,
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockSupabase: any = {
      auth: { getUser: mockGetUser },
      from: vi
        .fn()
        .mockReturnValueOnce(mockInsights)
        .mockReturnValueOnce(mockProfile),
    };

    (createServerClient as Mock).mockReturnValue(mockSupabase);

    const insights = await getInsights();

    expect(insights).toHaveLength(1);
    expect(insights[0].content).toBe('Insight 1');
  });
});
