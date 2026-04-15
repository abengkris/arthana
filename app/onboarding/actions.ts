'use server';

import { createClient } from '@/utils/supabase/server';
import {
  onboardingSchema,
  type OnboardingData,
  calculateEF,
  getDefaultCategories,
} from '@/lib/financial-logic';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Initializes a user's financial profile by calculating their emergency fund target,
 * generating default budget categories, and marking onboarding as complete.
 * @param {OnboardingData} formData - The validated onboarding data from the client.
 * @throws {Error} Throws an 'Unauthorized' error if the user is not authenticated.
 * @returns {Promise<{ error: string } | void>} Returns an error object if the process fails, or redirects on success.
 */
export async function setupFinancialProfile(formData: OnboardingData) {
  const supabase = await createClient();

  // Validate input
  const validatedData = onboardingSchema.parse(formData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const efTarget = calculateEF(validatedData);
  const categories = getDefaultCategories(validatedData);

  // 1. Insert into emergency_funds
  const { error: efError } = await supabase.from('emergency_funds').upsert({
    user_id: user.id,
    target_amount: efTarget,
    current_amount: 0,
    status: 'active',
  });

  if (efError) {
    console.error('EF Error:', efError);
    return { error: 'Failed to initialize emergency fund' };
  }

  // 2. Bulk insert into categories
  const categoryInserts = categories.map((cat) => ({
    user_id: user.id,
    name: cat,
    type:
      cat === 'Investasi' || cat === 'Dana Transisi' ? 'savings' : 'expense',
    percentage_allocation: 0, // Default to 0, user can customize later
  }));

  const { error: catError } = await supabase
    .from('categories')
    .insert(categoryInserts);

  if (catError) {
    console.error('Category Error:', catError);
    return { error: 'Failed to initialize categories' };
  }

  // 3. Update user metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { onboarding_complete: true },
  });

  if (authError) {
    console.error('Auth Error:', authError);
    return { error: 'Failed to update user profile' };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
