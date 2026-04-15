'use client';

import * as React from 'react';
import { TransactionProvider, useTransactionModal } from './TransactionContext';
import { TransactionModal } from './TransactionModal';
import { FAB } from '@/components/ui/FAB';

function ModalContainer() {
  const { open, setOpen } = useTransactionModal();
  return (
    <>
      <TransactionModal open={open} onOpenChange={setOpen} />
      <FAB onClick={() => setOpen(true)} />
    </>
  );
}

export function TransactionModalRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionProvider>
      {children}
      <ModalContainer />
    </TransactionProvider>
  );
}
