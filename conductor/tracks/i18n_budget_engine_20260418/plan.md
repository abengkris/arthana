# Implementation Plan: Comprehensive Overhaul for i18n & Strategy-Based Budgeting Engine

## Phase 1: Database Migration & Triggers

- [x] Task: Create Supabase Migration for New Columns 9aae8a1
  - [x] Write tests for new database constraints (if using pgTap, else define manual test steps)
  - [x] Implement migration using Supabase CLI to add `budget_strategy`, `locale` to `profiles` and `classification` to `categories`
- [x] Task: Update `handle_new_user` Trigger 9aae8a1
  - [x] Write tests to verify new users receive default categories with proper classifications
  - [x] Implement SQL update for the trigger to insert localized-key default categories
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database Migration & Triggers' (Protocol in workflow.md)

## Phase 2: i18n Infrastructure (next-intl)

- [ ] Task: Setup `next-intl`
  - [ ] Write configuration tests (if applicable) for the routing and middleware
  - [ ] Implement `next-intl` initialization, routing, and middleware to read `locale`
- [ ] Task: Create Dictionaries
  - [ ] Create `messages/en.json` and `messages/id.json` with base UI and category keys
- [ ] Task: Conductor - User Manual Verification 'Phase 2: i18n Infrastructure (next-intl)' (Protocol in workflow.md)

## Phase 3: UI Components & Settings

- [ ] Task: Settings Page (`/settings`)
  - [ ] Write unit tests for Settings page rendering and interaction
  - [ ] Implement Language Toggle and Budget Strategy Selector components
  - [ ] Implement server actions to update user `locale` and `budget_strategy` in Supabase
- [ ] Task: Transaction Modal Classification Field
  - [ ] Write unit tests for `AddTransactionForm` requiring `classification`
  - [ ] Implement mandatory `classification` Select field in the modal
- [ ] Task: Apply Translations to UI
  - [ ] Write tests to verify translations are applied to Dashboard and Modal components
  - [ ] Implement text replacement using `next-intl` hooks across the UI
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI Components & Settings' (Protocol in workflow.md)

## Phase 4: AI Gateway & Context Integration

- [ ] Task: Fetch Context for AI
  - [ ] Write tests to verify `locale` and `budget_strategy` are fetched correctly in the route handler
  - [ ] Implement data fetching logic in `/api/chat/route.ts`
- [ ] Task: Dynamic System Prompting
  - [ ] Write tests for dynamic prompt construction based on locale and strategy
  - [ ] Implement dynamic prompt injection in the AI Gateway setup
- [ ] Task: Update AI Tools & Delivery
  - [ ] Write tests for updated aggregation functions (e.g., `getSpendingByClassification`)
  - [ ] Implement AI tools to use `classification` and deliver insights via Smart Cards and Chat
- [ ] Task: Conductor - User Manual Verification 'Phase 4: AI Gateway & Context Integration' (Protocol in workflow.md)
