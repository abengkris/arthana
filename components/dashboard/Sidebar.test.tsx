import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { vi, describe, it, expect } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('Sidebar', () => {
  it('renders navigation links', () => {
    render(<Sidebar />);
    expect(
      screen.getByRole('link', { name: /dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /budgets/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /transactions/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
  });

  it('marks active link based on pathname', () => {
    render(<Sidebar />);
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute('data-active', 'true');
  });
});
