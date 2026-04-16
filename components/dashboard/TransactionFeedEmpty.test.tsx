import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TransactionFeed from './TransactionFeed';

describe('TransactionFeed', () => {
  it('renders empty state message when no transactions', () => {
    render(<TransactionFeed transactions={[]} />);
    expect(
      screen.getByText(/Belum ada pergerakan uang nih/i)
    ).toBeInTheDocument();
  });
});
