'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSettings(_prevState: unknown, formData: FormData) {
  const locale = formData.get('locale') as string;
  const budget_strategy = formData.get('budget_strategy') as string;

  if (!locale || !budget_strategy) {
    return { success: false, error: 'Missing fields' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({ locale, budget_strategy })
    .eq('id', user.id);

  if (error) {
    return { success: false, error: 'Failed to update settings.' };
  }

  revalidatePath('/settings');
  revalidatePath('/dashboard');
  return { success: true };
}
