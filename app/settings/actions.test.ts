import { describe, it, expect, vi, type Mock } from 'vitest';
import { updateSettings } from './actions';
import { createClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('updateSettings', () => {
  it('updates locale and budget_strategy in profiles table', async () => {
    const mockUpdate = vi.fn().mockReturnValue({ error: null });
    const mockEq = vi.fn().mockReturnValue({ update: mockUpdate });

    // Simulate chained auth/user
    const mockGetUser = vi
      .fn()
      .mockResolvedValue({ data: { user: { id: 'test-user-id' } } });

    // Update mock setup
    const supabaseMock = {
      auth: { getUser: mockGetUser },
      from: vi.fn(() => ({
        update: vi.fn(() => ({
          eq: mockEq,
        })),
      })),
    };

    (createClient as Mock).mockResolvedValue(supabaseMock);

    const formData = new FormData();
    formData.append('locale', 'en');
    formData.append('budget_strategy', '50/20/30');

    const result = await updateSettings(null, formData);

    expect(result.success).toBe(true);
    expect(supabaseMock.from).toHaveBeenCalledWith('profiles');
  });

  it('returns error if update fails', async () => {
    const mockGetUser = vi
      .fn()
      .mockResolvedValue({ data: { user: { id: 'test-user-id' } } });
    const mockUpdate = vi
      .fn()
      .mockReturnValue({ error: new Error('Update failed') });

    const supabaseMock = {
      auth: { getUser: mockGetUser },
      from: vi.fn(() => ({
        update: vi.fn(() => ({
          eq: mockUpdate,
        })),
      })),
    };

    (createClient as Mock).mockResolvedValue(supabaseMock);

    const formData = new FormData();
    formData.append('locale', 'en');
    formData.append('budget_strategy', '50/20/30');

    const result = await updateSettings(null, formData);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to update settings.');
  });
});
