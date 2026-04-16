import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GoalTrackerCard from './GoalTrackerCard';

describe('GoalTrackerCard', () => {
  it('renders goal tracker with correct details', () => {
    render(<GoalTrackerCard current={1000000} target={5000000} />);
    expect(screen.getByText(/Tabungan Impian 🚀/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Langkah kecil menuju kebebasan finansialmu!/i)
    ).toBeInTheDocument();
  });
});
