'use client';

import React, { useState } from 'react';
import {
  Bell,
  ArrowDownToLine,
  ArrowUpFromLine,
  Home,
  BarChart2,
  Wallet,
  User,
  Plus,
  Coffee,
  Car,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Mock Data
const categories = [
  { name: 'Food & Dining', value: 450, color: '#F87171', icon: Coffee },
  { name: 'Transport', value: 200, color: '#60A5FA', icon: Car },
  { name: 'Shopping', value: 350, color: '#A78BFA', icon: ShoppingBag },
  { name: 'Bills', value: 500, color: '#34D399', icon: Zap },
];

const transactions = [
  {
    id: 1,
    title: 'Burger King',
    date: 'Today, 12:30 PM',
    amount: -15.5,
    icon: Coffee,
    color: '#F87171',
    bg: '#F8717120',
  },
  {
    id: 2,
    title: 'Uber Ride',
    date: 'Yesterday, 09:15 AM',
    amount: -24.0,
    icon: Car,
    color: '#60A5FA',
    bg: '#60A5FA20',
  },
  {
    id: 3,
    title: 'Salary Deposit',
    date: 'Oct 15, 08:00 AM',
    amount: 4200.0,
    icon: ArrowDownToLine,
    color: '#34D399',
    bg: '#34D39920',
  },
  {
    id: 4,
    title: 'Nike Store',
    date: 'Oct 14, 04:45 PM',
    amount: -120.0,
    icon: ShoppingBag,
    color: '#A78BFA',
    bg: '#A78BFA20',
  },
];

export default function MobileDashboard() {
  const [activeTab, setActiveTab] = useState('Week');

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-[#0F1115] font-sans text-white">
      {/* Scrollable Content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          {/* Header */}
          <div className="mt-4 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="mt-1 text-sm text-[#9CA3AF]">October 2026</p>
            </div>
            <button className="relative rounded-full bg-[#1A1D24] p-3 text-[#9CA3AF] transition-colors hover:text-white">
              <Bell size={20} />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#F87171]"></span>
            </button>
          </div>

          {/* Hero Card */}
          <div className="relative mb-8 overflow-hidden rounded-[24px] bg-[#4A85F6] p-6 shadow-lg shadow-blue-500/20">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>

            <p className="relative z-10 mb-1 text-sm font-medium text-white/80">
              Total Balance
            </p>
            <h2 className="relative z-10 mb-8 text-4xl font-extrabold tracking-tight">
              $12,845.50
            </h2>

            <div className="relative z-10 flex justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <ArrowDownToLine size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/80">Income</p>
                  <p className="font-semibold">$4,200.00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <ArrowUpFromLine size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/80">Expenses</p>
                  <p className="font-semibold">$1,245.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Filter */}
          <div className="mb-8 flex rounded-full bg-[#1A1D24] p-1">
            {['Week', 'Month', 'Year'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#4A85F6] text-white shadow-md'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Spending by Category */}
          <div className="mb-8 rounded-[24px] bg-[#1A1D24] p-6">
            <h3 className="mb-6 text-lg font-bold">Spending by Category</h3>
            <div className="flex items-center justify-between">
              <div className="relative h-32 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-[#9CA3AF]">Total</span>
                  <span className="text-sm font-bold">$1.5k</span>
                </div>
              </div>

              <div className="ml-6 flex flex-1 flex-col gap-3">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm text-[#9CA3AF]">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold">
                      ${category.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Transactions</h3>
              <button className="text-sm font-medium text-[#4A85F6] hover:underline">
                See All
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-[20px] bg-[#1A1D24] p-4 transition-transform active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: tx.bg, color: tx.color }}
                    >
                      <tx.icon size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">{tx.title}</p>
                      <p className="mt-1 text-xs text-[#9CA3AF]">{tx.date}</p>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${
                      tx.amount < 0 ? 'text-white' : 'text-[#34D399]'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : ''}
                    {tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation & FAB */}
      <div className="absolute right-0 bottom-0 left-0 mx-auto w-full max-w-md">
        {/* FAB */}
        <div className="absolute -top-6 right-6 z-20">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4A85F6] text-white shadow-lg shadow-blue-500/40 transition-colors hover:bg-blue-600 active:scale-95">
            <Plus size={28} />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex h-20 items-center justify-around rounded-t-[32px] border-t border-white/5 bg-[#1A1D24] px-2 pb-2">
          <button className="flex flex-col items-center gap-1 p-2 text-[#4A85F6]">
            <Home size={24} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-[#9CA3AF] transition-colors hover:text-white">
            <BarChart2 size={24} />
            <span className="text-[10px] font-medium">Stats</span>
          </button>
          <button className="mr-8 flex flex-col items-center gap-1 p-2 text-[#9CA3AF] transition-colors hover:text-white">
            <Wallet size={24} />
            <span className="text-[10px] font-medium">Budget</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-[#9CA3AF] transition-colors hover:text-white">
            <User size={24} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
