import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SummaryCardsSkeleton } from './SummaryCardsSkeleton';

describe('SummaryCardsSkeleton', () => {
  it('renders without crashing and displays 3 skeleton cards', () => {
    const { container } = render(<SummaryCardsSkeleton />);

    // Check if it renders
    expect(container.firstChild).toBeInTheDocument();

    // Check if it has 3 skeleton cards.
    // They are rendered inside a grid container.
    const gridContainer = container.querySelector(
      '.grid.grid-cols-1.gap-4.md\\:grid-cols-3'
    );
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.children.length).toBe(3);
  });
});
