# Implementation Plan: Premium Tiers & AI Smart Cards

## Phase 1: Database & Schema Migration [checkpoint: bed9a58]

- [x] Task: Create Supabase migration for `profiles` and `ai_insights` (1f713c0)
  - [x] Add `subscription_tier` column to `profiles` table with default 'free'
  - [x] Create `ai_insights` table with columns: `id`, `user_id`, `content`, `type`, `created_at`
  - [x] Enable Row Level Security (RLS) on `ai_insights` table
  - [x] Add RLS policies for `ai_insights` (select/delete for owner)
- [x] Task: Update TypeScript database types (11b1ac2)
  - [x] Run `supabase gen types typescript` (or manual update if needed) to include new table and column
- [x] Task: Conductor - User Manual Verification 'Phase 1: Database & Schema Migration' (Protocol in workflow.md)

## Phase 2: Backend Logic (AI Insights Generator)

- [x] Task: Implement AI Insights Utility Function (34377dc)
  - [x] Write tests for `generateInsights` utility
  - [x] Implement `generateInsights` logic:
    - [x] Budget Warning (>80% limit)
    - [x] Deficit Warning (Expenses > Income)
    - [x] Savings Prompt (No 'Investasi' transactions)
  - [x] Implement casual Indonesian tone for each scenario
  - [x] Implement ephemeral logic: delete old insights before inserting new ones
- [x] Task: Create Server Action/Utility for Dashboard Integration (34377dc)
  - [x] Create a function to fetch transactions/budgets and trigger insight generation
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Backend Logic (AI Insights Generator)' (Protocol in workflow.md)

## Phase 3: UI Components & Dashboard Integration

- [ ] Task: Create AI Insight Card Component
  - [ ] Write tests for `AIInsightCard` component
  - [ ] Implement component using shadcn/ui `Alert` or `Card`
  - [ ] Support different types ('warning', 'encouragement', 'saving_tip') with icons/colors
- [ ] Task: Implement "Wawasan AI" Section on Dashboard
  - [ ] Update `app/dashboard/page.tsx` (Server Component) to evaluate and fetch insights
  - [ ] Implement conditional rendering based on `subscription_tier`:
    - [ ] Free: Show 1 card
    - [ ] Premium: Show multiple cards + "Konsultasi Chat" placeholder
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI Components & Dashboard Integration' (Protocol in workflow.md)

## Phase 4: Final Integration & Verification

- [ ] Task: End-to-end verification of the Premium/Free user flow
  - [ ] Verify free user limitations
  - [ ] Verify premium user features
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Integration & Verification' (Protocol in workflow.md)
