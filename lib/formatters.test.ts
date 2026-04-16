import { describe, it, expect } from 'vitest';
import { formatIDR } from './formatters';

describe('formatIDR', () => {
  it('formats amount correctly', () => {
    expect(formatIDR(5000000)).toBe('Rp 5.000.000');
  });
});
