import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { proxy } from './proxy';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    redirect: vi.fn((url) => ({
      status: 302,
      headers: { location: url.toString() },
    })),
    next: vi.fn(() => ({
      status: 200,
    })),
  },
}));

describe('Auth Proxy', () => {
  const mockGetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as Mock).mockReturnValue({
      auth: {
        getUser: mockGetUser,
      },
    });
  });

  it('redirects to /login if unauthenticated and accessing /dashboard', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });
    // Type assertion used to bypass complex NextRequest mocking in the test environment.
    const request = {
      nextUrl: {
        pathname: '/dashboard',
        clone: () => new URL('http://localhost:3000/dashboard'),
      },
      url: 'http://localhost:3000/dashboard',
    } as unknown as NextRequest;

    await proxy(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/login' })
    );
  });

  it('allows access to /dashboard if authenticated', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    });
    // Type assertion used to bypass complex NextRequest mocking in the test environment.
    const request = {
      nextUrl: {
        pathname: '/dashboard',
        clone: () => new URL('http://localhost:3000/dashboard'),
      },
      url: 'http://localhost:3000/dashboard',
    } as unknown as NextRequest;

    await proxy(request);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it('allows access to public routes', async () => {
    // Type assertion used to bypass complex NextRequest mocking in the test environment.
    const request = {
      nextUrl: {
        pathname: '/',
        clone: () => new URL('http://localhost:3000/'),
      },
      url: 'http://localhost:3000/',
    } as unknown as NextRequest;

    await proxy(request);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
