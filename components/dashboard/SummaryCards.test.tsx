import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SummaryCards from './SummaryCards';

describe('SummaryCards', () => {
  it('renders summary cards with correct labels', () => {
    render(
      <SummaryCards balance={5000000} income={10000000} expenses={5000000} />
    );
    expect(screen.getByText(/Total Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Income/i)).toBeInTheDocument();
    expect(screen.getByText(/Expenses/i)).toBeInTheDocument();
  });
});
