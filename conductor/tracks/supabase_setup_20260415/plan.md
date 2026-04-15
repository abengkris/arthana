# Implementation Plan: Setup Supabase Authentication, Database Schema, and strict RLS

## Phase 1: Database Setup [checkpoint: 06083fe]
- [x] **Task 1: Generate SQL script for core database schema** 08146fc
    - [x] Create `supabase/migrations/20260415_create_core_tables.sql`
    - [x] Define `categories`, `budgets`, `transactions`, and `emergency_funds` tables
    - [x] Verify foreign keys and default values
- [x] **Task 2: Generate SQL script for strict RLS policies** f281c50
    - [x] Create `supabase/migrations/20260415_enable_rls.sql`
    - [x] Enable RLS on all tables
    - [x] Create policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE` where `user_id = auth.uid()`
- [x] **Task 3: Conductor - User Manual Verification 'Database Setup' (Protocol in workflow.md)** 06083fe

## Phase 2: Project Configuration
- [x] **Task 1: Install and configure @supabase/ssr for Next.js 16.2.3** 093ea8a
    - [x] Install dependencies (`@supabase/ssr`, `@supabase/supabase-js`)
    - [x] Create `utils/supabase/server.ts` and `utils/supabase/client.ts` for RSC and Client Components
- [ ] **Task 2: Create strict TypeScript interfaces in src/types/database.ts**
    - [ ] Map all database tables to TypeScript interfaces
    - [ ] Ensure consistent naming and optional fields
- [ ] **Task 3: Conductor - User Manual Verification 'Project Configuration' (Protocol in workflow.md)**

## Phase 3: UI Implementation
- [ ] **Task 1: Write Tests for Auth UI**
    - [ ] Create `components/auth/AuthForm.test.tsx`
    - [ ] Define tests for form validation and submission
- [ ] **Task 2: Build basic Auth UI component (Login/Register) using shadcn/ui forms**
    - [ ] Create `components/auth/AuthForm.tsx` using `shadcn/ui` Form, Input, and Button
    - [ ] Implement toggle between Login and Register modes
- [ ] **Task 3: Integrate Supabase Auth and verify connection**
    - [ ] Add Supabase Auth logic to the Auth UI
    - [ ] Verify successful login and session persistence
- [ ] **Task 4: Conductor - User Manual Verification 'UI Implementation' (Protocol in workflow.md)**
