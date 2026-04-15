import { z } from 'zod';

/**
 * Transaction type enum.
 */
export const TransactionType = z.enum(['expense', 'income']);

/**
 * Schema for transaction entry validation.
 */
export const transactionSchema = z.object({
  type: TransactionType,
  amount: z.coerce
    .number()
    .positive('Nominal harus lebih dari nol')
    .multipleOf(0.01, 'Nominal maksimal 2 angka desimal'),
  category_id: z.string().uuid('Kategori yang dipilih tidak valid'),
  date: z.date({
    required_error: 'Silakan pilih tanggal',
    invalid_type_error: 'Format tanggal tidak valid',
  }),
  note: z
    .string()
    .max(255, 'Catatan tidak boleh lebih dari 255 karakter')
    .optional()
    .nullable(),
});

/**
 * Type for transaction form inputs.
 */
export type TransactionInput = z.infer<typeof transactionSchema>;

/**
 * Type for the normalized transaction record to be inserted into the database.
 */
export interface TransactionRecord {
  user_id: string;
  category_id: string;
  amount: number; // Stored as positive for income, negative for expense
  date: string; // ISO format
  note?: string | null;
}
