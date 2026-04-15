'use client';

import * as React from 'react';
import { TransactionForm } from './TransactionForm';
import { addTransaction } from '@/app/transactions/actions';
import { createClient } from '@/utils/supabase/client';
import { type TransactionInput } from '@/lib/validations/transaction';
import { useTransactionModal } from './TransactionContext';

export function TransactionFormContainer() {
  const [categories, setCategories] = React.useState<
    { id: string; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setOpen } = useTransactionModal();

  React.useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
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
      // Toast notification will be added in Phase 4
    } else {
      console.error(result.error);
      // Toast error will be added in Phase 4
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
