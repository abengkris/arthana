import React from 'react';

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
  const greeting = getGreeting();
  return (
    <h1 className="text-2xl font-bold tracking-tight text-balance">
      {greeting}, {name}! Gimana arus kasmu hari ini? ☕
    </h1>
  );
}
