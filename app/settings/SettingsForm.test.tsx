import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SettingsForm from './SettingsForm';
import { NextIntlClientProvider } from 'next-intl';

// Mock the next-intl hooks
const messages = {
  settings: {
    title: 'Settings',
    preferences: 'Preferences',
    language: 'Language',
    budget_strategy: 'Budget Strategy',
    strategy: {
      '50_30_20': '50/30/20 (Balanced)',
      '50_20_30': '50/20/30 (Aggressive Saving)',
      '60_20_20': '60/20/20 (Realistic/Sandwich Gen)',
    },
    save: 'Save Changes',
  },
};

describe('SettingsForm', () => {
  it('renders settings form fields correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SettingsForm initialLocale="en" initialStrategy="50/30/20" />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Budget Strategy')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Changes' })
    ).toBeInTheDocument();
  });
});
