import { render, screen } from '@testing-library/react';
import GreetingHeader from './GreetingHeader';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  dashboard: {
    greeting: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
      night: 'Good Night',
      default: 'Hello',
      friend: 'Friend',
      question: 'How is your cash flow?',
    },
  },
};

describe('GreetingHeader', () => {
  it('renders a friendly greeting', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <GreetingHeader name="User" />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/User/i)).toBeInTheDocument();
    expect(screen.getByText(/How is your cash flow/i)).toBeInTheDocument();
  });
});
