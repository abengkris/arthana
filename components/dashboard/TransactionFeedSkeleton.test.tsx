import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TransactionFeedSkeleton } from './TransactionFeedSkeleton';

describe('TransactionFeedSkeleton', () => {
  it('renders without crashing and displays skeleton rows', () => {
    const { container } = render(<TransactionFeedSkeleton />);

    // Check if it renders
    expect(container.firstChild).toBeInTheDocument();

    // Check for skeleton list items
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBeGreaterThan(0);

    // Check for skeleton elements inside
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
