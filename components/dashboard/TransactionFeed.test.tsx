import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TransactionFeed from './TransactionFeed';

describe('TransactionFeed', () => {
  it('renders a list of transactions', () => {
    const transactions = [
      { id: '1', amount: 50000, description: 'Makan Siang' },
      { id: '2', amount: 200000, description: 'Belanja' },
    ];
    render(<TransactionFeed transactions={transactions} />);
    expect(screen.getByText(/Makan Siang/i)).toBeInTheDocument();
    expect(screen.getByText(/Belanja/i)).toBeInTheDocument();
  });
});
