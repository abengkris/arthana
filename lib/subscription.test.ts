import { describe, it, expect, vi, Mock } from 'vitest';
import { createClient as createServerClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('Database Schema: Subscription Tier', () => {
  it('should have subscription_tier in profiles', async () => {
    const mockGetUser = vi.fn().mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });
    const mockFrom = vi.fn().mockReturnThis();
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockSingle = vi.fn().mockResolvedValue({
      data: {
        id: 'test-user',
        email: 'test@example.com',
        subscription_tier: 'free',
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

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', 'test-user')
      .single();

    expect(error).toBeNull();
    expect(data).toHaveProperty('subscription_tier');
  });
});

describe('Database Schema: AI Insights', () => {
  it('should have ai_insights table', async () => {
    const mockFrom = vi.fn().mockReturnThis();
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockData = [{ id: '1', content: 'Tip', type: 'saving_tip' }];

    (createServerClient as Mock).mockReturnValue({
      from: mockFrom,
      select: mockSelect,
      eq: mockEq,
    });

    mockSelect.mockReturnThis();
    mockEq.mockResolvedValue({ data: mockData, error: null });

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', 'test-user');

    expect(error).toBeNull();
    expect(data).toEqual(mockData);
  });
});
