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

  it('fails with correct localized error if amount is zero or negative', () => {
    const zeroResult = transactionSchema.safeParse({ ...validBase, amount: 0 });
    expect(zeroResult.success).toBe(false);
    if (!zeroResult.success) {
      expect(zeroResult.error.issues[0].message).toBe(
        'Nominal harus lebih dari nol'
      );
    }

    const negativeResult = transactionSchema.safeParse({
      ...validBase,
      amount: -10,
    });
    expect(negativeResult.success).toBe(false);
    if (!negativeResult.success) {
      expect(negativeResult.error.issues[0].message).toBe(
        'Nominal harus lebih dari nol'
      );
    }
  });

  it('fails with correct localized error if category_id is not a UUID', () => {
    const result = transactionSchema.safeParse({
      ...validBase,
      category_id: 'not-a-uuid',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Kategori yang dipilih tidak valid'
      );
    }
  });

  it('fails with correct localized error if date is invalid', () => {
    const result = transactionSchema.safeParse({
      ...validBase,
      date: 'not-a-date',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Format tanggal tidak valid');
    }
  });

  it('fails with correct localized error if note is too long', () => {
    const result = transactionSchema.safeParse({
      ...validBase,
      note: 'a'.repeat(256),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Catatan tidak boleh lebih dari 255 karakter'
      );
    }
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

  it('fails with correct localized error if amount has more than 2 decimal places', () => {
    const result = transactionSchema.safeParse({
      ...validBase,
      amount: 100.123,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Nominal maksimal 2 angka desimal'
      );
    }
  });
});
