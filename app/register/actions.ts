'use server';

import { createClient } from '@/utils/supabase/server';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signUpWithEmailPassword(data: RegisterInput) {
  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    return { error: 'Invalid input' };
  }

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}
