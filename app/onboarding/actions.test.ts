import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { setupFinancialProfile } from './actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('setupFinancialProfile', () => {
  const mockSupabase = {
    auth: {
      getUser: vi.fn(),
      updateUser: vi.fn(),
    },
    from: vi.fn(() => ({
      upsert: vi.fn(),
      insert: vi.fn(),
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as Mock).mockResolvedValue(mockSupabase);
  });

  it('successfully initializes financial profile', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'test-user' } },
    });
    mockSupabase.from.mockReturnValue({
      upsert: vi.fn().mockResolvedValue({ error: null }),
      insert: vi.fn().mockResolvedValue({ error: null }),
    } as unknown as ReturnType<typeof mockSupabase.from>);
    mockSupabase.auth.updateUser.mockResolvedValue({ error: null });

    const data = {
      monthlyIncome: 1000,
      employmentType: 'Full-time' as const,
      hasDependents: false,
      planningCareerPivot: false,
    };

    await setupFinancialProfile(data);

    expect(mockSupabase.from).toHaveBeenCalledWith('emergency_funds');
    expect(mockSupabase.from).toHaveBeenCalledWith('categories');
    expect(mockSupabase.auth.updateUser).toHaveBeenCalledWith({
      data: { onboarding_complete: true },
    });
    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });

  it('throws error if user is not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

    const data = {
      monthlyIncome: 1000,
      employmentType: 'Full-time' as const,
      hasDependents: false,
      planningCareerPivot: false,
    };

    await expect(setupFinancialProfile(data)).rejects.toThrow('Unauthorized');
  });

  it('returns error if EF upsert fails', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'test-user' } },
    });
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn().mockResolvedValue({ error: { message: 'DB Error' } }),
    } as unknown as ReturnType<typeof mockSupabase.from>);

    const data = {
      monthlyIncome: 1000,
      employmentType: 'Full-time' as const,
      hasDependents: false,
      planningCareerPivot: false,
    };

    const result = await setupFinancialProfile(data);
    expect(result).toEqual({ error: 'Failed to initialize emergency fund' });
  });
});
