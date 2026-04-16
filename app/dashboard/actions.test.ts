import { describe, it, expect, vi, Mock } from 'vitest';
import { getDashboardData } from './actions';
import { createClient as createServerClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('getDashboardData', () => {
  it('fetches aggregated financial data successfully', async () => {
    const mockGetUser = vi.fn().mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });
    const mockFrom = vi.fn().mockReturnThis();
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockSingle = vi.fn().mockResolvedValue({
      data: {
        total_income: 10000000,
        total_expenses: 5000000,
        balance: 5000000,
        investments: 2000000,
        savings: 1000000,
      },
      error: null,
    });

    (createServerClient as Mock).mockReturnValue({
      auth: { getUser: mockGetUser },
      from: mockFrom,
      select: mockSelect,
      eq: mockEq,
      single: mockSingle,
    });

    const data = await getDashboardData();
    expect(data.balance).toBe(5000000);
    expect(data.total_income).toBe(10000000);
  });
});
