# Implementation Plan: Dashboard App Shell & Protected Routes

## Phase 1: Authentication Guard & Protected Routes

- [ ] **Task: Implement Next.js 16 Proxy for Auth Guarding**
  - [ ] Create `src/proxy.ts` (or `app/proxy.ts` if specified by Next.js 16) to handle redirection.
  - [ ] Use `@supabase/ssr` to verify the user session.
  - [ ] Implement logic to redirect unauthenticated requests from `/dashboard/*` to `/login`.
  - [ ] Write tests to verify redirection logic for authenticated and unauthenticated states.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Auth Guarding' (Protocol in workflow.md)**

## Phase 2: App Shell UI Components (Sidebar & Header)

- [ ] **Task: Install and Setup shadcn/ui Components**
  - [ ] Install `Sheet`, `ScrollArea`, `Avatar`, `Button`, `Separator`, `DropdownMenu`.
- [ ] **Task: Implement Responsive Sidebar Component**
  - [ ] Create `components/dashboard/Sidebar.tsx`.
  - [ ] Implement desktop-fixed and mobile-drawer (using `Sheet`) versions.
  - [ ] Add navigation links: Dashboard (LayoutDashboard), Budgets (Wallet), Transactions (Repeat), Settings (Settings).
  - [ ] Write tests to verify navigation links and responsive visibility.
- [ ] **Task: Implement Top Header Component**
  - [ ] Create `components/dashboard/Header.tsx`.
  - [ ] Add breadcrumbs placeholder and User Profile Menu (Avatar + Logout).
  - [ ] Write tests for header elements and logout functionality placeholder.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: App Shell UI' (Protocol in workflow.md)**

## Phase 3: Dashboard Layout Assembly & Integration

- [ ] **Task: Create Dashboard Root Layout**
  - [ ] Implement `app/dashboard/layout.tsx` using the Sidebar and Header components.
  - [ ] Ensure proper spacing and layout structure for the content area.
- [ ] **Task: Implement Placeholder Dashboard Page**
  - [ ] Create `app/dashboard/page.tsx`.
  - [ ] Fetch the user session to display their email.
  - [ ] Write integration tests to verify the full app shell and user data fetching.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Dashboard Assembly' (Protocol in workflow.md)**
