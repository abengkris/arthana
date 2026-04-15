'use client';

import * as React from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function FAB({ className, ...props }: FABProps) {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn(
        'fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg md:hidden',
        className
      )}
      aria-label="Add Transaction"
      {...props}
    >
      <PlusIcon className="h-6 w-6" />
    </Button>
  );
}
