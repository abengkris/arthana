import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { createClient } from '@/utils/supabase/client';

// Mock Supabase client
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Header', () => {
  const mockSignOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as Mock).mockReturnValue({
      auth: {
        signOut: mockSignOut,
      },
    });
  });

  it('renders breadcrumbs placeholder', () => {
    render(<Header />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /user menu/i })
    ).toBeInTheDocument();
  });
});
