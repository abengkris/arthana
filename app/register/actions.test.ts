import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { signUpWithEmailPassword } from './actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

describe('signUpWithEmailPassword', () => {
  const mockSupabase = {
    auth: {
      signUp: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as Mock).mockResolvedValue(mockSupabase);
    (headers as Mock).mockResolvedValue({
      get: vi.fn().mockReturnValue('http://localhost:3000'),
    });
  });

  it('successfully signs up and redirects to /dashboard', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });

    const data = {
      email: 'test@example.com',
      password: 'password123',
    };

    await signUpWithEmailPassword(data);

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: expect.stringContaining('/auth/callback'),
      },
    });
    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });

  it('returns error if sign up fails', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: null },
      error: { message: 'User already registered' },
    });

    const data = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await signUpWithEmailPassword(data);

    expect(result).toEqual({ error: 'User already registered' });
    expect(redirect).not.toHaveBeenCalled();
  });
});
