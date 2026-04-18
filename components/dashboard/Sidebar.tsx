'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  WalletIcon,
  RepeatIcon,
  SettingsIcon,
  MenuIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useTranslations } from 'next-intl';

const navItems = [
  { id: 'dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
  { id: 'budgets', href: '/dashboard/budgets', icon: WalletIcon },
  { id: 'transactions', href: '/dashboard/transactions', icon: RepeatIcon },
  { id: 'settings', href: '/settings', icon: SettingsIcon },
];

function NavLinks({ pathname }: { pathname: string }) {
  const t = useTranslations('nav');
  return (
    <div className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          className="justify-start gap-3"
          asChild
          data-active={pathname === item.href}
        >
          <Link href={item.href}>
            <item.icon data-icon="inline-start" />
            {t(item.id)}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Trigger */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
              <span className="sr-only">Toggle Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle>Arthana</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full">
              <NavLinks pathname={pathname} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="bg-card fixed inset-y-0 hidden w-64 flex-col border-r lg:flex">
        <div className="border-b p-6">
          <h1 className="text-xl font-bold">Arthana</h1>
        </div>
        <ScrollArea className="flex-1">
          <NavLinks pathname={pathname} />
        </ScrollArea>
      </aside>
    </>
  );
}
