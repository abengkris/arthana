# Specification: User Onboarding & Financial Profile Setup

## Overview

Implement a comprehensive onboarding flow that collects user financial data, calculates an emergency fund target, and initializes default categories in Supabase. This feature ensures every user starts with a personalized financial foundation.

## Functional Requirements

- **Routing & Access Control:**
  - Implement Next.js Middleware to intercept authenticated requests.
  - Redirect users to `/onboarding` if they haven't completed the setup (verified via `user_metadata.onboarding_complete`).
- **Onboarding UI (Multi-step Wizard):**
  - Create a `/onboarding` page with a multi-step form wizard using `shadcn/ui` components.
  - Collect: `monthlyIncome`, `employmentType` (Full-time / Freelance / Business Owner), `hasDependents` (boolean), `planningCareerPivot` (boolean).
  - Include a Progress Bar, Framer Motion animations for step transitions, and contextual tooltips.
- **Financial Logic (Strict TDD):**
  - Create `src/lib/financial-logic.ts` with centralized multipliers for emergency funds.
  - Calculate Emergency Fund Target:
    - 6x income: Full-time without dependents.
    - 12x income: Freelance/Business Owner OR if they have dependents.
  - Determine Default Categories: "Kebutuhan Pokok", "Investasi", "Hiburan".
  - Add "Dana Transisi" if `planningCareerPivot` is true.
- **Auto-Initialization:**
  - Create a Server Action to handle the Supabase transaction:
    1. Insert the target into `emergency_funds`.
    2. Insert the generated `categories` linked to the user.
    3. Update user metadata to mark onboarding as complete.

## Non-Functional Requirements

- **Test Coverage:** 100% unit test coverage for `financial-logic.ts` and related utilities.
- **Type Safety:** Use Zod for form validation and strict TypeScript types for all data structures.
- **UX:** Mobile-responsive design with clear interaction feedback.

## Acceptance Criteria

- [ ] Authenticated users are forced to `/onboarding` until completion.
- [ ] Emergency fund target matches the logic for all 4 primary user personas.
- [ ] "Dana Transisi" category appears only for users planning a career pivot.
- [ ] Successful onboarding redirects the user to `/dashboard` with initialized data.
- [ ] No data leakage; all records are correctly linked to `auth.uid()`.

## Out of Scope

- Manual editing of categories during onboarding (will be handled in a separate "Budget Management" track).
- Integration with external bank APIs (manual input only for MVP).
