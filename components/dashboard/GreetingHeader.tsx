'use client';

import React, { useState, useEffect } from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
};

interface GreetingHeaderProps {
  name?: string | null;
}

export default function GreetingHeader({ name }: GreetingHeaderProps) {
  const [greeting, setGreeting] = useState<string>('Halo');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(getGreeting());

    setMounted(true);
  }, []);

  const displayName = name || 'Teman';
  const displayGreeting = mounted ? greeting : 'Halo';

  return (
    <h1 className="text-2xl font-bold tracking-tight text-balance">
      {displayGreeting}, {displayName}! Gimana arus kasmu hari ini? ☕
    </h1>
  );
}
