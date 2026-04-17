import { describe, it, expect, vi } from 'vitest';
import { SupabaseInsightService } from './supabase-insight';
import { SupabaseClient } from '@supabase/supabase-js';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('SupabaseInsightService', () => {
  const mockSupabase = {
    from: vi.fn(),
  } as unknown as SupabaseClient;

  const service = new SupabaseInsightService(mockSupabase);

  describe('getInsights', () => {
    it('should fetch insights and filter by tier (free)', async () => {
      const userId = 'user-123';
      const mockInsights = [
        { content: 'Insight 1', type: 'warning' },
        { content: 'Insight 2', type: 'saving_tip' },
      ];

      vi.mocked(mockSupabase.from).mockImplementation((table) => {
        const queryBuilder: any = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi
            .fn()
            .mockResolvedValue({ data: mockInsights, error: null } as any),
          single: vi
            .fn()
            .mockResolvedValue({
              data: { subscription_tier: 'free' },
              error: null,
            } as any),
        };
        return queryBuilder;
      });

      const { data, error } = await service.getInsights(userId);

      expect(error).toBeNull();
      expect(data).toHaveLength(1);
      expect(data?.[0].content).toBe('Insight 1');
    });

    it('should fetch all insights for premium tier', async () => {
      const userId = 'user-123';
      const mockInsights = [
        { content: 'Insight 1', type: 'warning' },
        { content: 'Insight 2', type: 'saving_tip' },
      ];

      vi.mocked(mockSupabase.from).mockImplementation((table) => {
        const queryBuilder: any = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi
            .fn()
            .mockResolvedValue({ data: mockInsights, error: null } as any),
          single: vi
            .fn()
            .mockResolvedValue({
              data: { subscription_tier: 'premium' },
              error: null,
            } as any),
        };
        return queryBuilder;
      });

      const { data, error } = await service.getInsights(userId);

      expect(error).toBeNull();
      expect(data).toHaveLength(2);
    });
  });

  describe('refreshInsights', () => {
    it('should refresh insights successfully', async () => {
      const userId = 'user-123';

      vi.mocked(mockSupabase.from).mockImplementation((table) => {
        const queryBuilder: any = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          gte: vi.fn().mockReturnThis(),
          maybeSingle: vi
            .fn()
            .mockResolvedValue({
              data: { total_income: 10000 },
              error: null,
            } as any),
          single: vi
            .fn()
            .mockResolvedValue({
              data: { subscription_tier: 'free' },
              error: null,
            } as any),
          delete: vi.fn().mockReturnThis(),
          insert: vi.fn().mockResolvedValue({ data: null, error: null } as any),
        };

        if (table === 'transactions') {
          queryBuilder.gte = vi
            .fn()
            .mockResolvedValue({ data: [], error: null } as any);
        } else if (table === 'categories') {
          queryBuilder.eq = vi
            .fn()
            .mockResolvedValue({ data: [], error: null } as any);
        }

        return queryBuilder;
      });

      const { data, error } = await service.refreshInsights(userId);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should return error if refresh fails', async () => {
      vi.mocked(mockSupabase.from).mockImplementation(() => {
        const mockObj: any = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          gte: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        };

        // Make the first data fetch (transactions) fail
        mockObj.gte = vi
          .fn()
          .mockResolvedValueOnce({
            data: null,
            error: new Error('Refresh Fail'),
          });

        return mockObj;
      });

      const { data, error } = await service.refreshInsights('user-123');

      expect(data).toBeNull();
      expect(error?.message).toBe('Refresh Fail');
    });
  });
});
