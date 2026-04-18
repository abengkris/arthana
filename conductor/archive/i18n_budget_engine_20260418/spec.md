# Specification: Comprehensive Overhaul for i18n & Strategy-Based Budgeting Engine

## Overview

This track implements a strategy-based budgeting engine and an internationalization (i18n) infrastructure supporting English and Indonesian (`en` and `id`). It updates the Supabase schema, integrates `next-intl` for Next.js App Router localization, adds user preference settings for language and budget strategy, and upgrades the Vercel AI SDK integration to provide localized, context-aware financial advice.

## Functional Requirements

1. **Database Schema & Migrations (Supabase CLI)**
   - Update `profiles` table: Add `budget_strategy` (text, default '50/30/20') and `locale` (text, default 'id').
   - Update `categories` table: Add `classification` (text, constraint: IN ('kebutuhan', 'keinginan', 'tabungan', 'pendapatan')).
   - Update `handle_new_user` function/trigger: Inject default categories with proper classifications (e.g., salary -> pendapatan, daily_needs -> kebutuhan, entertainment -> keinginan, investment -> tabungan).

2. **i18n Infrastructure**
   - Integrate `next-intl` for Next.js Server & Client components.
   - Create dictionaries (`messages/en.json`, `messages/id.json`) covering dashboard, settings, forms, and category names.
   - Setup Next.js middleware to handle locale routing and read from the user's `locale` in Supabase session/cookies.

3. **UI Components & Settings (shadcn/ui)**
   - **Settings Page (`/settings`)**: Add a Language Toggle and Budget Strategy Selector (options like "50/30/20", "50/20/30", "60/20/20"). Update the `profiles` table on change.
   - **Transaction Modal (`AddTransactionForm`)**: Add a mandatory Select field for `classification` when creating custom categories/transactions.
   - **Translations**: Replace hardcoded text in Dashboard, Smart Cards, and Modals with `next-intl` dictionary references.

4. **AI Gateway & Context Integration**
   - Fetch `locale` and `budget_strategy` from Supabase before initializing Vercel AI Gateway in `/api/chat/route.ts`.
   - Implement dynamic system prompting instructing the AI to use the user's locale and evaluate spending against their selected budget strategy (Needs, Wants, Savings).
   - Update AI tools (e.g., `getSpendingByCategory` or a new `getSpendingByClassification`) to aggregate expenses based on the new `classification` column.
   - Deliver localized insights via **Smart Cards** on the dashboard and **Conversational Chat**.

## Non-Functional Requirements

- Maintain clean, modular code following the Next.js App Router guidelines.
- Do not break existing authentication.
- Ensure Supabase CLI is used to generate and version control database migrations.

## Acceptance Criteria

- `profiles` and `categories` tables reflect new columns in Supabase.
- Default categories are generated with proper classifications for new users.
- The app renders in English or Indonesian based on user preferences.
- The Settings page successfully updates the database with language and strategy choices.
- Transactions require a classification.
- AI provides advice tailored to the user's language and budget strategy ratios via Smart Cards and Chat.

## Out of Scope

- Support for languages other than English and Indonesian.
- Custom budgeting ratios (users must select from predefined options).
- Advanced automated notifications (e.g., push/email).
