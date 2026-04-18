'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Wallet, User, Plus } from 'lucide-react';

import { useTranslations } from 'next-intl';

export default function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('bottom_nav');

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full bg-[#0F1115] lg:hidden">
      {/* FAB */}
      <div className="absolute -top-6 right-6 z-20">
        <Link
          href="/dashboard/transactions/new"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4A85F6] text-white shadow-lg shadow-blue-500/40 transition-colors hover:bg-blue-600 active:scale-95"
        >
          <Plus size={28} />
        </Link>
      </div>

      {/* Navigation Bar */}
      <div className="flex h-20 items-center justify-around rounded-t-[32px] border-t border-white/5 bg-[#1A1D24] px-2 pb-2">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname === '/dashboard' ? 'text-[#4A85F6]' : 'text-[#9CA3AF] hover:text-white'}`}
        >
          <Home size={24} />
          <span className="text-[10px] font-medium">{t('home')}</span>
        </Link>
        <Link
          href="/dashboard/budgets"
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname.includes('/budgets') ? 'text-[#4A85F6]' : 'text-[#9CA3AF] hover:text-white'}`}
        >
          <BarChart2 size={24} />
          <span className="text-[10px] font-medium">{t('stats')}</span>
        </Link>
        <Link
          href="/dashboard/transactions"
          className={`mr-8 flex flex-col items-center gap-1 p-2 transition-colors ${pathname.includes('/transactions') ? 'text-[#4A85F6]' : 'text-[#9CA3AF] hover:text-white'}`}
        >
          <Wallet size={24} />
          <span className="text-[10px] font-medium">{t('budget')}</span>
        </Link>
        <Link
          href="/settings"
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${pathname.includes('/settings') ? 'text-[#4A85F6]' : 'text-[#9CA3AF] hover:text-white'}`}
        >
          <User size={24} />
          <span className="text-[10px] font-medium">{t('profile')}</span>
        </Link>
      </div>
    </div>
  );
}
