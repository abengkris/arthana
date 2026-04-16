import { toast } from 'sonner';

export const triggerBudgetAlert = (label: string, type: 'warning' | 'over') => {
  const title = type === 'warning' ? 'Hampir Limit!' : 'Jebol Bosku!';
  const description =
    type === 'warning'
      ? `Budget ${label} udah mau abis nih, rem dikit ya!`
      : `Ups, budget ${label} udah jebol!`;

  toast(title, {
    description,
    duration: 5000,
  });
};
