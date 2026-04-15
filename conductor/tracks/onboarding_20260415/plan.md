# Implementation Plan: User Onboarding & Financial Profile Setup

## Phase 1: Foundation & Financial Logic (TDD) [checkpoint: a59c6e7]

Focus on building the core utility logic with 100% test coverage before any UI work.

- [x] Task: Create `lib/constants.ts` for financial multipliers (e.g., `EF_MULTIPLIER_BASE: 6`, `EF_MULTIPLIER_EXTENDED: 12`). b48454c
- [x] Task: Create `lib/financial-logic.ts` and define `calculateEF` and `getDefaultCategories` functions. b434abf
- [x] Task: (TDD) Write unit tests for `calculateEF` covering all 4 primary user personas. eb7df81
- [x] Task: (TDD) Write unit tests for `getDefaultCategories` ensuring "Dana Transisi" is conditionally added. eb7df81
- [x] Task: Implement the logic to pass all tests in `lib/financial-logic.ts`. eb7df81
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Financial Logic' (Protocol in workflow.md) a59c6e7

## Phase 2: Routing & Access Control [checkpoint: 52508a3]

Ensure users are correctly funneled into the onboarding flow.

- [x] Task: Create `middleware.ts` to intercept requests to `/dashboard` and sub-routes. d0ab23a
- [x] Task: Add logic to check `user_metadata.onboarding_complete` and redirect to `/onboarding` if false. d0ab23a
- [x] Task: Verify redirection logic with manual testing for both authenticated and unauthenticated states. 52508a3
- [x] Task: Conductor - User Manual Verification 'Phase 2: Routing & Access Control' (Protocol in workflow.md) 52508a3

## Phase 3: Onboarding UI (Wizard) [checkpoint: 8b08459]

Build the user-facing onboarding experience.

- [x] Task: Scaffold the `/onboarding` page and layout. ceafe69
- [x] Task: Create a `StepIndicator` component with a progress bar and Framer Motion animations. ceafe69
- [x] Task: Build the multi-step form wizard using `react-hook-form` and `zod`. 4239cd5
  - [x] Sub-task: Step 1 - Basic Info (Income & Employment). 4239cd5
  - [x] Sub-task: Step 2 - Risk Profile (Dependents & Career Pivot). 4239cd5
  - [x] Sub-task: Step 3 - Summary & Confirmation. 4239cd5
- [x] Task: Add contextual tooltips and interactive feedback for each step. 4239cd5
- [x] Task: Conductor - User Manual Verification 'Phase 3: Onboarding UI' (Protocol in workflow.md) 8b08459

## Phase 4: Auto-Initialization Logic [checkpoint: 90fc192]

Connect the UI to Supabase using a secure transaction.

- [x] Task: Create a Next.js Server Action `setupFinancialProfile` in `app/onboarding/actions.ts`. 0a44296
- [x] Task: Implement the Supabase transaction: 0a44296
  - [x] Sub-task: Insert into `emergency_funds`. 0a44296
  - [x] Sub-task: Bulk insert into `categories`. 0a44296
  - [x] Sub-task: Update `auth.users` metadata via `supabase.auth.updateUser`. 0a44296
- [x] Task: Add error handling and loading states to the form submission. 0a44296
- [x] Task: Conductor - User Manual Verification 'Phase 4: Auto-Initialization Logic' (Protocol in workflow.md) 3c22e73

## Phase 5: Final Integration & Verification

Ensure a seamless transition to the dashboard.

- [ ] Task: Implement a smooth post-onboarding redirect to `/dashboard`.
- [ ] Task: Final end-to-end verification of the full onboarding-to-dashboard flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Final Integration & Verification' (Protocol in workflow.md)
