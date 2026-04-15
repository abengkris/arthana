# Implementation Plan: Dashboard App Shell & Protected Routes

## Phase 1: Authentication Guard & Protected Routes [checkpoint: 45eb95a]

- [x] **Task: Implement Next.js 16 Proxy for Auth Guarding** (28bab3a)
  - [x] Create `src/proxy.ts` (or `app/proxy.ts` if specified by Next.js 16) to handle redirection.
  - [x] Use `@supabase/ssr` to verify the user session.
  - [x] Implement logic to redirect unauthenticated requests from `/dashboard/*` to `/login`.
  - [x] Write tests to verify redirection logic for authenticated and unauthenticated states.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: Auth Guarding' (Protocol in workflow.md)** (45eb95a)

## Phase 2: App Shell UI Components (Sidebar & Header) [checkpoint: cdc31ab]

- [x] **Task: Install and Setup shadcn/ui Components**
  - [x] Install `Sheet`, `ScrollArea`, `Avatar`, `Button`, `Separator`, `DropdownMenu`.
- [x] **Task: Implement Responsive Sidebar Component**
  - [x] Create `components/dashboard/Sidebar.tsx`.
  - [x] Implement desktop-fixed and mobile-drawer (using `Sheet`) versions.
  - [x] Add navigation links: Dashboard (LayoutDashboard), Budgets (Wallet), Transactions (Repeat), Settings (Settings).
  - [x] Write tests to verify navigation links and responsive visibility.
- [x] **Task: Implement Top Header Component**
  - [x] Create `components/dashboard/Header.tsx`.
  - [x] Add breadcrumbs placeholder and User Profile Menu (Avatar + Logout).
  - [x] Write tests for header elements and logout functionality placeholder.
- [x] **Task: Conductor - User Manual Verification 'Phase 2: App Shell UI' (Protocol in workflow.md)** (cdc31ab)

## Phase 3: Dashboard Layout Assembly & Integration [checkpoint: a35bc97]

- [x] **Task: Create Dashboard Root Layout**
  - [x] Implement `app/dashboard/layout.tsx` using the Sidebar and Header components.
  - [x] Ensure proper spacing and layout structure for the content area.
- [x] **Task: Implement Placeholder Dashboard Page**
  - [x] Create `app/dashboard/page.tsx`.
  - [x] Fetch the user session to display their email.
  - [x] Write integration tests to verify the full app shell and user data fetching.
- [x] **Task: Conductor - User Manual Verification 'Phase 3: Dashboard Assembly' (Protocol in workflow.md)** (a35bc97)

## Phase: Review Fixes

- [x] Task: Apply review suggestions (081fc6d)
