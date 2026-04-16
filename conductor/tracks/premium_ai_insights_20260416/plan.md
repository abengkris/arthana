# Implementation Plan: Premium Tiers & AI Smart Cards

## Phase 1: Database & Schema Migration

- [x] Task: Create Supabase migration for `profiles` and `ai_insights` (1f713c0)
  - [ ] Add `subscription_tier` column to `profiles` table with default 'free'
  - [ ] Create `ai_insights` table with columns: `id`, `user_id`, `content`, `type`, `created_at`
  - [ ] Enable Row Level Security (RLS) on `ai_insights` table
  - [ ] Add RLS policies for `ai_insights` (select/delete for owner)
- [ ] Task: Update TypeScript database types
  - [ ] Run `supabase gen types typescript` (or manual update if needed) to include new table and column
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database & Schema Migration' (Protocol in workflow.md)

## Phase 2: Backend Logic (AI Insights Generator)

- [ ] Task: Implement AI Insights Utility Function
  - [ ] Write tests for `generateInsights` utility
  - [ ] Implement `generateInsights` logic:
    - [ ] Budget Warning (>80% limit)
    - [ ] Deficit Warning (Expenses > Income)
    - [ ] Savings Prompt (No 'Investasi' transactions)
  - [ ] Implement casual Indonesian tone for each scenario
  - [ ] Implement ephemeral logic: delete old insights before inserting new ones
- [ ] Task: Create Server Action/Utility for Dashboard Integration
  - [ ] Create a function to fetch transactions/budgets and trigger insight generation
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
