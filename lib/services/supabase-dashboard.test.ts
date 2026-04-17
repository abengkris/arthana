import { describe, it, expect, vi } from 'vitest';
import { SupabaseDashboardService } from './supabase-dashboard';
import { SupabaseClient } from '@supabase/supabase-js';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('SupabaseDashboardService', () => {
  const mockSupabase = {
    from: vi.fn(),
  } as unknown as SupabaseClient;

  const service = new SupabaseDashboardService(mockSupabase);

  describe('getSummary', () => {
    it('should calculate summary correctly from transactions and emergency funds', async () => {
      const userId = 'user-123';

      vi.mocked(mockSupabase.from).mockImplementation((table) => {
        const queryBuilder = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn(),
        };

        if (table === 'transactions') {
          queryBuilder.eq = vi.fn().mockResolvedValue({
            data: [
              { amount: 5000, type: 'income' },
              { amount: 2000, type: 'expense' },
            ],
            error: null,
          } as any);
        } else if (table === 'emergency_funds') {
          queryBuilder.eq = vi.fn().mockReturnThis();
          queryBuilder.maybeSingle = vi.fn().mockResolvedValue({
            data: { target_amount: 10000, current_amount: 3000 },
            error: null,
          } as any);
        } else if (table === 'budgets') {
          queryBuilder.eq = vi
            .fn()
            .mockResolvedValue({ data: [], error: null } as any);
        }

        return queryBuilder as any;
      });

      const { data, error } = await service.getSummary(userId);

      expect(error).toBeNull();
      expect(data).toEqual({
        total_income: 5000,
        total_expenses: 2000,
        balance: 3000,
        investments: 0,
        savings: 3000,
        target: 10000,
      });
    });

    it('should return error if transaction fetch fails', async () => {
      vi.mocked(mockSupabase.from).mockImplementation(() => {
        const result = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockImplementation(() => {
            const subResult = Promise.resolve({
              data: null,
              error: new Error('DB Error'),
            });
            (subResult as any).maybeSingle = vi
              .fn()
              .mockResolvedValue({ data: null, error: null } as any);
            return subResult;
          }),
          maybeSingle: vi
            .fn()
            .mockResolvedValue({ data: null, error: null } as any),
        };
        return result as any;
      });

      const { data, error } = await service.getSummary('user-123');

      expect(data).toBeNull();
      expect(error?.message).toBe('DB Error');
    });
  });

  describe('getRecentTransactions', () => {
    it('should fetch and format transactions correctly', async () => {
      const userId = 'user-123';
      const mockData = [
        {
          id: '1',
          amount: 100,
          description: 'Test',
          category_id: 'cat1',
          date: '2024-01-01',
        },
      ];

      vi.mocked(mockSupabase.from).mockImplementation(() => {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockReturnThis(),
          limit: vi
            .fn()
            .mockResolvedValue({ data: mockData, error: null } as any),
        } as any;
      });

      const { data, error } = await service.getRecentTransactions(userId);

      expect(error).toBeNull();
      expect(data).toEqual(mockData);
    });
  });
});
