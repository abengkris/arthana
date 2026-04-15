'use client';

import * as React from 'react';

interface TransactionContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const TransactionContext = React.createContext<
  TransactionContextType | undefined
>(undefined);

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <TransactionContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionModal() {
  const context = React.useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionModal must be used within a TransactionProvider'
    );
  }
  return context;
}
