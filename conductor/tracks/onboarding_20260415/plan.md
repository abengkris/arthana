# Implementation Plan: User Onboarding & Financial Profile Setup

## Phase 1: Foundation & Financial Logic (TDD)

Focus on building the core utility logic with 100% test coverage before any UI work.

- [x] Task: Create `lib/constants.ts` for financial multipliers (e.g., `EF_MULTIPLIER_BASE: 6`, `EF_MULTIPLIER_EXTENDED: 12`). b48454c
- [x] Task: Create `lib/financial-logic.ts` and define `calculateEF` and `getDefaultCategories` functions. b434abf
- [x] Task: (TDD) Write unit tests for `calculateEF` covering all 4 primary user personas. eb7df81
- [x] Task: (TDD) Write unit tests for `getDefaultCategories` ensuring "Dana Transisi" is conditionally added. eb7df81
- [x] Task: Implement the logic to pass all tests in `lib/financial-logic.ts`. eb7df81
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Financial Logic' (Protocol in workflow.md)

## Phase 2: Routing & Access Control

Ensure users are correctly funneled into the onboarding flow.

- [ ] Task: Create `src/middleware.ts` to intercept requests to `/dashboard` and sub-routes.
- [ ] Task: Add logic to check `user_metadata.onboarding_complete` and redirect to `/onboarding` if false.
- [ ] Task: Verify redirection logic with manual testing for both authenticated and unauthenticated states.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Routing & Access Control' (Protocol in workflow.md)

## Phase 3: Onboarding UI (Wizard)

Build the user-facing onboarding experience.

- [ ] Task: Scaffold the `/onboarding` page and layout.
- [ ] Task: Create a `StepIndicator` component with a progress bar and Framer Motion animations.
- [ ] Task: Build the multi-step form wizard using `react-hook-form` and `zod`.
  - [ ] Sub-task: Step 1 - Basic Info (Income & Employment).
  - [ ] Sub-task: Step 2 - Risk Profile (Dependents & Career Pivot).
  - [ ] Sub-task: Step 3 - Summary & Confirmation.
- [ ] Task: Add contextual tooltips and interactive feedback for each step.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Onboarding UI' (Protocol in workflow.md)

## Phase 4: Auto-Initialization Logic

Connect the UI to Supabase using a secure transaction.

- [ ] Task: Create a Next.js Server Action `setupFinancialProfile` in `src/app/onboarding/actions.ts`.
- [ ] Task: Implement the Supabase transaction:
  - [ ] Sub-task: Insert into `emergency_funds`.
  - [ ] Sub-task: Bulk insert into `categories`.
  - [ ] Sub-task: Update `auth.users` metadata via `supabase.auth.updateUser`.
- [ ] Task: Add error handling and loading states to the form submission.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Auto-Initialization Logic' (Protocol in workflow.md)

## Phase 5: Final Integration & Verification

Ensure a seamless transition to the dashboard.

- [ ] Task: Implement a smooth post-onboarding redirect to `/dashboard`.
- [ ] Task: Final end-to-end verification of the full onboarding-to-dashboard flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Final Integration & Verification' (Protocol in workflow.md)
