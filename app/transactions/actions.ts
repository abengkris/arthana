'use server';

import { createClient } from '@/utils/supabase/server';
import {
  transactionSchema,
  type TransactionInput,
  type TransactionRecord,
} from '@/lib/validations/transaction';
import { revalidatePath } from 'next/cache';

/**
 * Adds a new transaction for the authenticated user.
 * Normalizes 'expense' amounts to negative values for storage.
 * @param data - The transaction input.
 * @returns Success status or error message.
 */
export async function addTransaction(data: TransactionInput) {
  const validation = transactionSchema.safeParse(data);

  if (!validation.success) {
    return { error: 'Invalid input' };
  }

  const supabase = await createClient();

  // Get current user for security
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'Unauthorized' };
  }

  // Normalize amount: negative for expense, positive for income
  const normalizedAmount =
    validation.data.type === 'expense'
      ? -Math.abs(validation.data.amount)
      : Math.abs(validation.data.amount);

  const transactionRecord: TransactionRecord = {
    user_id: user.id,
    category_id: validation.data.category_id,
    amount: normalizedAmount,
    date: validation.data.date.toISOString(),
    note: validation.data.note,
  };

  const { error } = await supabase
    .from('transactions')
    .insert(transactionRecord);

  if (error) {
    return { error: error.message };
  }

  // Clear cache and trigger UI update
  revalidatePath('/dashboard');

  return { success: true };
}
