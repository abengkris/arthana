'use server';

import { createClient } from '@/utils/supabase/server';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';

/**
 * Signs in a user with email and password.
 * @param data - The login credentials.
 * @returns An object with an error message if sign-in fails.
 */
export async function signInWithEmailPassword(data: LoginInput) {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    return { error: 'Invalid input' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}
