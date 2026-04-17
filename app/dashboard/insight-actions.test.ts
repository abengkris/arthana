import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { refreshInsights, getInsights } from './insight-actions';
import { createClient as createServerClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('insight-actions', () => {
  const mockGetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockChain = () => {
    const chain: any = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
    };
    return chain;
  };

  it('refreshInsights deletes old and inserts new insights', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });

    const mockFrom = vi.fn().mockImplementation((table: string) => {
      const mockChain = createMockChain();
      if (table === 'transactions') {
        mockChain.gte = vi.fn().mockResolvedValue({ data: [], error: null });
      } else if (table === 'budgets') {
        mockChain.maybeSingle = vi
          .fn()
          .mockResolvedValue({ data: { total_income: 10000000 }, error: null });
      } else if (table === 'categories') {
        mockChain.eq = vi.fn().mockResolvedValue({ data: [], error: null });
      } else if (table === 'profiles') {
        mockChain.single = vi
          .fn()
          .mockResolvedValue({
            data: { subscription_tier: 'premium' },
            error: null,
          });
      } else if (table === 'ai_insights') {
        mockChain.delete = vi.fn().mockReturnThis();
        mockChain.eq = vi.fn().mockResolvedValue({ error: null });
        mockChain.insert = vi.fn().mockResolvedValue({ error: null });
      }
      return mockChain;
    });

    const mockSupabase: any = {
      auth: { getUser: mockGetUser },
      from: mockFrom,
    };

    (createServerClient as Mock).mockReturnValue(mockSupabase);

    const insights = await refreshInsights();

    expect(mockFrom).toHaveBeenCalledWith('transactions');
    expect(mockFrom).toHaveBeenCalledWith('ai_insights');
    expect(Array.isArray(insights)).toBe(true);
  });

  it('getInsights returns limited insights for free users', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });

    const mockFrom = vi.fn().mockImplementation((table: string) => {
      const mockChain = createMockChain();
      if (table === 'ai_insights') {
        mockChain.order = vi.fn().mockResolvedValue({
          data: [
            { content: 'Insight 1', type: 'warning' },
            { content: 'Insight 2', type: 'saving_tip' },
          ],
          error: null,
        });
      } else if (table === 'profiles') {
        mockChain.single = vi.fn().mockResolvedValue({
          data: { subscription_tier: 'free' },
          error: null,
        });
      }
      return mockChain;
    });

    const mockSupabase: any = {
      auth: { getUser: mockGetUser },
      from: mockFrom,
    };

    (createServerClient as Mock).mockReturnValue(mockSupabase);

    const insights = await getInsights();

    expect(insights).toHaveLength(1);
    expect(insights[0].content).toBe('Insight 1');
  });
});
