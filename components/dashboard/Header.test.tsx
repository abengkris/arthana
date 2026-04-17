import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { createClient } from '@/utils/supabase/client';
import { TransactionModalRoot } from '../transactions/TransactionModalRoot';

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

  const renderWithModal = () =>
    render(
      <TransactionModalRoot>
        <Header />
      </TransactionModalRoot>
    );

  it('renders breadcrumbs placeholder', () => {
    renderWithModal();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    renderWithModal();
    expect(
      screen.getByRole('button', { name: /user menu/i })
    ).toBeInTheDocument();
  });

  it('renders New Transaction button', () => {
    renderWithModal();
    expect(
      screen.getByRole('link', { name: /new transaction/i })
    ).toBeInTheDocument();
  });
});
