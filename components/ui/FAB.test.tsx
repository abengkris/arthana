import { render, screen, fireEvent } from '@testing-library/react';
import { FAB } from './FAB';
import { describe, it, expect, vi } from 'vitest';

describe('FAB', () => {
  it('renders correctly', () => {
    render(<FAB />);
    expect(screen.getByLabelText(/add transaction/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<FAB onClick={handleClick} />);
    fireEvent.click(screen.getByLabelText(/add transaction/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
