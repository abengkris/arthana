import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { signInWithEmailPassword } from './actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('signInWithEmailPassword', () => {
  const mockSupabase = {
    auth: {
      signInWithPassword: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as Mock).mockResolvedValue(mockSupabase);
  });

  it('successfully signs in and redirects to /dashboard', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });

    const data = {
      email: 'test@example.com',
      password: 'password123',
    };

    await signInWithEmailPassword(data);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: data.email,
      password: data.password,
    });
    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });

  it('returns error if sign in fails', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: { message: 'Invalid login credentials' },
    });

    const data = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const result = await signInWithEmailPassword(data);

    expect(result).toEqual({ error: 'Invalid login credentials' });
    expect(redirect).not.toHaveBeenCalled();
  });
});
