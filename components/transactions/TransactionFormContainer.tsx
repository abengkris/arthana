'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { TransactionForm } from './TransactionForm';
import { addTransaction } from '@/app/transactions/actions';
import { createClient } from '@/utils/supabase/client';
import { type TransactionInput } from '@/lib/validations/transaction';
import { useTransactionModal } from './TransactionContext';

export function TransactionFormContainer() {
  const [categories, setCategories] = React.useState<
    {
      id: string;
      name: string;
      type: 'income' | 'expense' | 'savings';
      classification: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setOpen } = useTransactionModal();

  React.useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, type, classification')
        .order('name');

      if (!error && data) {
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (data: TransactionInput) => {
    setIsLoading(true);
    const result = await addTransaction(data);
    setIsLoading(false);

    if (result.success) {
      setOpen(false);
      toast.success('Transaksi berhasil disimpan');
    } else {
      toast.error(result.error || 'Gagal menyimpan transaksi');
    }
  };

  return (
    <TransactionForm
      categories={categories}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
