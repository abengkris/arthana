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
    .positive('Amount must be greater than zero')
    .multipleOf(0.01, 'Amount cannot have more than 2 decimal places'),
  category_id: z.string().uuid('Invalid category selected'),
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: "That's not a date!",
  }),
  note: z
    .string()
    .max(255, 'Note must be less than 255 characters')
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
