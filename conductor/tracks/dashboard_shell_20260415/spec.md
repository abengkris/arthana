# Specification: Dashboard App Shell & Protected Routes

## Overview

This track involves creating the foundational layout and security for the Arthana dashboard. This includes setting up protected routes via Next.js 16 Proxy and implementing a responsive app shell with a sidebar and top header using shadcn/ui.

## Functional Requirements

### 1. Route Protection

- **Proxy Setup:** Implement `src/proxy.ts` using `@supabase/ssr` to intercept requests to `/dashboard`.
- **Authentication:** Redirect unauthenticated users from `/dashboard/*` to `/login`.
- **Session Handling:** Ensure the proxy correctly identifies valid Supabase auth sessions.

### 2. Dashboard Layout (App Shell)

- **Sidebar:**
  - Navigation items: Dashboard (LayoutDashboard), Budgets (Wallet), Transactions (Repeat), Settings (Settings).
  - Responsive: Hidden on mobile, accessible via a hamburger menu (Sheet component).
  - Desktop: Fixed side navigation with a scrollable area (ScrollArea).
- **Top Header:**
  - Display current page title or Breadcrumbs.
  - User profile menu (Avatar component) with a logout option.
- **Content Area:** Main dashboard view with a simple "Welcome" message fetching the user's email from the session.

## Non-Functional Requirements

- **Responsive Design:** Optimized for mobile and desktop using Tailwind CSS.
- **Type Safety:** Full TypeScript implementation.
- **Security:** RLS-compliant data fetching and robust auth guarding via proxy.

## Acceptance Criteria

- [ ] Users cannot access `/dashboard` without being logged in (redirected to `/login`).
- [ ] Logged-in users see their email on the `/dashboard` page.
- [ ] Sidebar is functional and hidden on mobile behind a menu trigger.
- [ ] Sidebar contains all specified navigation links with correct Lucide icons.
- [ ] Top header displays breadcrumbs and a user profile menu.

## Out of Scope

- Detailed implementation of individual dashboard feature pages (Budgets, Transactions, Settings).
- Advanced session management (MFA, token refresh).
