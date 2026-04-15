'use server';

import { createClient } from '@/utils/supabase/server';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';

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
