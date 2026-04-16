import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BudgetProgressBar from './BudgetProgressBar';

describe('BudgetProgressBar', () => {
  it('renders progress bar with correct label', () => {
    render(<BudgetProgressBar label="Makan" progress={50} status="safe" />);
    expect(screen.getByText(/Makan/i)).toBeInTheDocument();
    expect(screen.getByText(/Masih aman terkendali/i)).toBeInTheDocument();
  });
});
