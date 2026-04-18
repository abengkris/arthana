'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface GreetingHeaderProps {
  name?: string | null;
}

export default function GreetingHeader({ name }: GreetingHeaderProps) {
  const t = useTranslations('dashboard.greeting');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const hour = typeof window !== 'undefined' ? new Date().getHours() : 0;
  let greetingKey = 'default';
  if (mounted) {
    if (hour < 12) greetingKey = 'morning';
    else if (hour < 15) greetingKey = 'afternoon';
    else if (hour < 18) greetingKey = 'evening';
    else greetingKey = 'night';
  }

  const displayName = name || t('friend');
  const displayGreeting = t(greetingKey);

  return (
    <h1 className="text-2xl font-bold tracking-tight text-balance">
      {displayGreeting}, {displayName}! {t('question')} ☕
    </h1>
  );
}
