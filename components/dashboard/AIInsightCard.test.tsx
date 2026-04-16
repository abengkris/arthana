import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AIInsightCard } from './AIInsightCard';

describe('AIInsightCard', () => {
  it('renders a warning insight correctly', () => {
    render(<AIInsightCard content="Waduh, jajanmu mepet!" type="warning" />);
    expect(screen.getByText(/waduh, jajanmu mepet/i)).toBeInTheDocument();
    // Lucide icons are often hard to query directly,
    // but we can check if the Alert component is used
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders a saving tip insight correctly', () => {
    render(<AIInsightCard content="Yuk, investasi!" type="saving_tip" />);
    expect(screen.getByText(/yuk, investasi/i)).toBeInTheDocument();
  });

  it('renders an encouragement insight correctly', () => {
    render(
      <AIInsightCard content="Hebat, tabunganmu nambah!" type="encouragement" />
    );
    expect(screen.getByText(/hebat, tabunganmu nambah/i)).toBeInTheDocument();
  });
});
