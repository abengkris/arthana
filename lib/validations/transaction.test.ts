import { describe, it, expect } from 'vitest';
import { transactionSchema } from './transaction';

describe('transactionSchema', () => {
  const validBase = {
    type: 'expense' as const,
    amount: 100.5,
    category_id: '550e8400-e29b-41d4-a716-446655440000',
    date: new Date(),
    note: 'Test note',
  };

  it('validates a valid expense transaction', () => {
    const result = transactionSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it('validates a valid income transaction', () => {
    const result = transactionSchema.safeParse({
      ...validBase,
      type: 'income',
    });
    expect(result.success).toBe(true);
  });

  it('validates transaction with optional/null note', () => {
    const withoutNote: Partial<typeof validBase> = { ...validBase };
    delete withoutNote.note;
    expect(transactionSchema.safeParse(withoutNote).success).toBe(true);

    const nullNote = { ...validBase, note: null };
    expect(transactionSchema.safeParse(nullNote).success).toBe(true);
  });

  it('fails if amount is zero or negative', () => {
    expect(
      transactionSchema.safeParse({ ...validBase, amount: 0 }).success
    ).toBe(false);
    expect(
      transactionSchema.safeParse({ ...validBase, amount: -10 }).success
    ).toBe(false);
  });

  it('fails if category_id is not a UUID', () => {
    expect(
      transactionSchema.safeParse({ ...validBase, category_id: 'not-a-uuid' })
        .success
    ).toBe(false);
  });

  it('fails if date is invalid', () => {
    expect(
      transactionSchema.safeParse({ ...validBase, date: 'not-a-date' }).success
    ).toBe(false);
  });

  it('fails if note is too long', () => {
    expect(
      transactionSchema.safeParse({ ...validBase, note: 'a'.repeat(256) })
        .success
    ).toBe(false);
  });

  it('validates amount as a string number (coerce)', () => {
    const result = transactionSchema.safeParse({
      ...validBase,
      amount: '123.45',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(123.45);
    }
  });

  it('fails if amount has more than 2 decimal places', () => {
    expect(
      transactionSchema.safeParse({ ...validBase, amount: 100.123 }).success
    ).toBe(false);
  });
});
