import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TransactionFeed from './TransactionFeed';

describe('TransactionFeed', () => {
  it('renders a list of transactions', () => {
    const transactions = [
      {
        id: '1',
        amount: 50000,
        description: 'Makan Siang',
        category_id: 'c1',
        category_name: 'Food & Dining',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        amount: 200000,
        description: 'Belanja',
        category_id: 'c2',
        category_name: 'Shopping',
        date: new Date().toISOString(),
      },
    ];
    render(<TransactionFeed transactions={transactions} />);
    expect(screen.getByText(/Makan Siang/i)).toBeInTheDocument();
    expect(screen.getByText(/Belanja/i)).toBeInTheDocument();
  });
});
