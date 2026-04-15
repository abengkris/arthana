# Specification: Authentication Flow

## Overview

Implement a complete, secure, and polished authentication flow for Arthana using `Next.js 16 (App Router)`, `@supabase/ssr`, and `shadcn/ui`. This track covers user registration, login, and the critical server-side session exchange (auth callback).

## User Personas

- **New User:** Wants to create an account quickly to start managing their finances.
- **Returning User:** Wants to log in securely to access their dashboard.

## Functional Requirements

1.  **Registration Page (`/register`):**
    - Minimal form collecting only `Email` and `Password`.
    - Client-side validation using `Zod` and `React Hook Form`.
    - Password requirement: Minimum 8 characters, at least 1 number.
    - Displays errors (e.g., email already in use) clearly using `shadcn/ui` components.
2.  **Login Page (`/login`):**
    - Form collecting `Email` and `Password`.
    - Client-side validation for email format and password presence.
    - Securely submits to a Supabase Server Action.
    - Displays "Invalid credentials" or connection errors via `shadcn/ui` Toasts or inline messages.
3.  **Auth Callback (`/auth/callback/route.ts`):**
    - Handles the code exchange for a session cookie using `@supabase/ssr`.
    - Ensures secure redirects to `/dashboard` upon successful exchange.
4.  **Security & UX:**
    - Polished UI using `shadcn/ui` (Cards, Forms, Inputs, Buttons, Toasts).
    - Server-side cookie management via `@supabase/ssr` to ensure persistent sessions.
    - Strictly enforces `/dashboard` as the post-authentication destination.

## Non-Functional Requirements

- **Performance:** Auth actions should be fast (< 500ms for local state updates).
- **Accessibility:** All forms must follow `shadcn/ui` (Radix) accessibility standards.
- **Type Safety:** Full TypeScript implementation for forms, actions, and Supabase client.

## Acceptance Criteria

- [ ] User can successfully register with a valid email and a password (8+ chars, 1+ number).
- [ ] User can successfully log in with registered credentials.
- [ ] Failed login/registration attempts display clear, helpful error messages.
- [ ] Successful login/registration redirects the user to `/dashboard`.
- [ ] Auth callback correctly handles the Supabase session exchange.
- [ ] All UI components are visually consistent with the Arthana brand.

## Out of Scope

- OAuth providers (Google, GitHub, etc.).
- Password reset flow ("Forgot Password").
- Email verification (SMTP setup).
- Multi-factor authentication (MFA).
