# Implementation Plan: Authentication Flow

## Phase 1: Authentication Core Setup [checkpoint: 4ec3df5]

Goal: Configure Supabase Auth with @supabase/ssr and define necessary schemas and types.

- [x] Task: Supabase SSR Integration Review (5948ff4)
  - [x] Verify `utils/supabase/server.ts` and `utils/supabase/client.ts` are correctly configured for `@supabase/ssr`.
  - [x] Update `utils/supabase/server.ts` if needed to handle SSR cookie patterns.

- [x] Task: Define Auth Schemas (0612671)
  - [x] Create `lib/validations/auth.ts` defining Zod schemas for login and registration.
  - [x] Implement password validation: min 8 characters, at least 1 number.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Authentication Core Setup' (Protocol in workflow.md)

## Phase 2: Login Flow Implementation

Goal: Implement the login page, server action, and UI components.

- [ ] Task: Write Tests for Login Server Action
  - [ ] Create `app/login/actions.test.ts` to test login functionality (success/failure scenarios).
- [ ] Task: Implement Login Server Action
  - [ ] Create `app/login/actions.ts` with `signInWithEmailPassword` function using `supabase.auth.signInWithPassword`.
- [ ] Task: Write Tests for Login UI Component
  - [ ] Create `components/auth/LoginForm.test.tsx` to verify form rendering and client-side validation.
- [ ] Task: Implement Login UI Component
  - [ ] Create `components/auth/LoginForm.tsx` using `shadcn/ui` components (Card, Form, Input, Button).
- [ ] Task: Create Login Page
  - [ ] Create `app/login/page.tsx` rendering the `LoginForm`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Login Flow Implementation' (Protocol in workflow.md)

## Phase 3: Registration Flow Implementation

Goal: Implement the registration page and server action.

- [ ] Task: Write Tests for Registration Server Action
  - [ ] Create `app/register/actions.test.ts` to test sign-up functionality.
- [ ] Task: Implement Registration Server Action
  - [ ] Create `app/register/actions.ts` with `signUpWithEmailPassword` function using `supabase.auth.signUp`.
- [ ] Task: Write Tests for Registration UI Component
  - [ ] Create `components/auth/RegisterForm.test.tsx` to verify form rendering and validation.
- [ ] Task: Implement Registration UI Component
  - [ ] Create `components/auth/RegisterForm.tsx` using `shadcn/ui`.
- [ ] Task: Create Registration Page
  - [ ] Create `app/register/page.tsx` rendering the `RegisterForm`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Registration Flow Implementation' (Protocol in workflow.md)

## Phase 4: Auth Callback and Redirection

Goal: Handle the auth code exchange and ensure secure redirection.

- [ ] Task: Implement Auth Callback Route
  - [ ] Create `app/auth/callback/route.ts` using `@supabase/ssr` to exchange the `code` for a session.
  - [ ] Implement secure redirect to `/dashboard`.
- [ ] Task: Verify Authentication State Protection
  - [ ] Ensure `middleware.ts` correctly handles session cookies for protected routes like `/dashboard`.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Auth Callback and Redirection' (Protocol in workflow.md)
