'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

export default function MobileHeader() {
  const currentMonthYear = format(new Date(), 'MMMM yyyy');

  return (
    <div className="mt-4 mb-8 flex items-center justify-between lg:hidden">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">{currentMonthYear}</p>
      </div>
      <button className="relative rounded-full bg-[#1A1D24] p-3 text-[#9CA3AF] transition-colors hover:text-white">
        <Bell size={20} />
        <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#F87171]"></span>
      </button>
    </div>
  );
}
