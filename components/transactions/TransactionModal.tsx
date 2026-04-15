'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionModal({
  open,
  onOpenChange,
}: TransactionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Log a new expense or income to your budget.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* TransactionForm will be inserted here in Phase 3 */}
          <div className="border-muted-foreground/25 bg-muted/50 flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground text-sm">Form Placeholder</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
