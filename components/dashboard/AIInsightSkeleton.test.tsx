import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AIInsightSkeleton } from './AIInsightSkeleton';

describe('AIInsightSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<AIInsightSkeleton />);

    // Check if it renders an Alert (which is a div with role=alert typically, or just the root element)
    expect(container.firstChild).toBeInTheDocument();

    // Check for skeleton elements inside
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
