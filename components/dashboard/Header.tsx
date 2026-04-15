'use client';

import { useRouter } from 'next/navigation';
import { LogOutIcon, UserIcon, PlusCircleIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { useTransactionModal } from '../transactions/TransactionContext';

export function Header() {
  const router = useRouter();
  const supabase = createClient();
  const { setOpen } = useTransactionModal();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="bg-card sticky top-0 z-40 flex h-16 items-center justify-between border-b px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs Placeholder */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="default"
          size="sm"
          className="hidden md:flex"
          onClick={() => setOpen(true)}
        >
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          New Transaction
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="User Menu"
            >
              <Avatar>
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              <LogOutIcon data-icon="inline-start" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
