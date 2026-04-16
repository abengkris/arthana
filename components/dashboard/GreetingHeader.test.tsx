import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GreetingHeader from './GreetingHeader';

describe('GreetingHeader', () => {
  it('renders a friendly greeting', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-16T12:00:00Z')); // Should be 12:00 UTC
    render(<GreetingHeader name="Budi" />);
    expect(screen.getByText(/Selamat/i)).toBeInTheDocument();
    expect(screen.getByText(/Budi/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
