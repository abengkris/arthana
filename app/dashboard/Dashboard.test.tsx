import { render, screen } from '@testing-library/react';
import DashboardPage from './page';
import DashboardLayout from './layout';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient as createClientSide } from '@/utils/supabase/client';

// Mock Supabase server client
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

// Mock Supabase client side
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock AIInsightSection
vi.mock('@/components/dashboard/AIInsightSection', () => ({
  AIInsightSection: () => <div data-testid="mock-insights">Mock Insights</div>,
}));

// Mock insight actions
vi.mock('@/app/dashboard/insight-actions', () => ({
  refreshInsights: vi
    .fn()
    .mockResolvedValue([{ content: 'Mock Insight', type: 'warning' }]),
  getInsights: vi
    .fn()
    .mockResolvedValue([{ content: 'Mock Insight', type: 'warning' }]),
}));

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Dashboard Integration', () => {
  const mockGetUser = vi.fn();
  const mockSignOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (createServerClient as Mock).mockResolvedValue({
      auth: {
        getUser: mockGetUser,
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValue({
          data: { subscription_tier: 'free' },
          error: null,
        }),
      order: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ error: null }),
      gte: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    (createClientSide as Mock).mockReturnValue({
      auth: {
        signOut: mockSignOut,
      },
    });
  });

  it('renders dashboard with user email', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { email: 'test@example.com' } },
      error: null,
    });

    const Page = await DashboardPage();
    render(<DashboardLayout>{Page}</DashboardLayout>);

    expect(screen.getByText(/gimana arus kasmu hari ini/i)).toBeInTheDocument();
    expect(screen.getByText(/arthana/i)).toBeInTheDocument(); // From Sidebar
  });
});
