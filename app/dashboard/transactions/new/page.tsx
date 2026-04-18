import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { NewTransactionForm } from '@/components/transactions/NewTransactionForm';

export default async function AddTransactionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch categories
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, type, classification')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <div className="mx-auto w-full max-w-3xl">
        <NewTransactionForm categories={categories || []} />
      </div>
    </div>
  );
}
