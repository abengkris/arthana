# Specification: Setup Supabase Authentication, Database Schema, and strict RLS

## Overview

This track focuses on the foundational setup of Supabase for the Arthana project. This includes configuring the Next.js SSR client, defining the core database schema for budgeting and transaction management, enforcing strict Row Level Security (RLS), and implementing a basic authentication UI.

## Functional Requirements

1.  **Supabase SSR Client Configuration:**
    - Install and configure `@supabase/ssr` for Next.js 16.2.3.
    - Ensure compatibility with React Server Components (RSC) and Client Components.
2.  **Database Schema Definition:**
    - Create a SQL migration script for the following tables:
      - `categories`: Stores expense categories with type and percentage allocation.
      - `budgets`: Stores monthly/yearly income and budget targets.
      - `transactions`: Logs individual expenses linked to categories and users.
      - `emergency_funds`: Tracks emergency fund targets and current status.
3.  **Strict Row Level Security (RLS):**
    - Enable RLS on all operational tables.
    - Implement policies ensuring users can only access (SELECT, INSERT, UPDATE, DELETE) their own data using `auth.uid()`.
    - Ensure multi-tenant isolation with zero data leakage.
4.  **TypeScript Integration:**
    - Create strict TypeScript interfaces matching the database schema in `src/types/database.ts`.
5.  **Authentication UI:**
    - Develop a basic Login/Register component using shadcn/ui forms.
    - Integrate with Supabase Auth to verify connection and session management.

## Non-Functional Requirements

- **Security:** Strict adherence to RLS and multi-tenant isolation.
- **Type Safety:** 100% type coverage for database interactions.
- **Modularity:** Clean separation of concerns between database logic, types, and UI.

## Acceptance Criteria

- [ ] Supabase SSR client successfully initialized and usable in RSC.
- [ ] Database schema applied successfully to the Supabase project.
- [ ] RLS policies verified to prevent unauthorized data access.
- [ ] TypeScript types accurately reflect the database schema.
- [ ] User can successfully register and log in via the Auth UI.
- [ ] All code passes linting and follows project style guides.
