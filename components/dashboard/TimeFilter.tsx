'use client';

import React, { useState } from 'react';

export default function TimeFilter() {
  const [activeTab, setActiveTab] = useState('Month');

  return (
    <div className="mb-8 flex w-full max-w-sm rounded-full bg-[#1A1D24] p-1">
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
  );
}
