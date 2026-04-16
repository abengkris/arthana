import { describe, it, expect, vi } from 'vitest';
import { triggerBudgetAlert } from './alerts';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('triggerBudgetAlert', () => {
  it('triggers a toast alert', () => {
    triggerBudgetAlert('Makan', 'warning');
    expect(toast).toHaveBeenCalled();
  });
});
