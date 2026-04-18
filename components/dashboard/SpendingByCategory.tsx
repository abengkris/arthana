'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatIDR } from '@/lib/formatters';
import { CategorySpending } from '@/lib/services/dashboard';

interface SpendingByCategoryProps {
  categories: CategorySpending[];
}

import { useTranslations } from 'next-intl';

export default function SpendingByCategory({
  categories,
}: SpendingByCategoryProps) {
  const t = useTranslations('dashboard_charts');
  const tc = useTranslations('category');
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="mb-8 w-full rounded-[24px] bg-[#1A1D24] p-6 text-white">
      <h3 className="mb-6 text-lg font-bold">{t('spending_by_category')}</h3>

      {categories.length === 0 ? (
        <div className="py-8 text-center text-sm text-[#9CA3AF]">
          {t('spending_empty')}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-12">
          <div className="relative h-40 w-40 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  innerRadius={50}
                  outerRadius={80}
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
              <span className="text-xs text-[#9CA3AF]">{t('total')}</span>
              <span className="text-sm font-bold">
                {formatIDR(total).replace(',00', '')}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-3">
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
                    {tc(category.name)}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {formatIDR(category.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
