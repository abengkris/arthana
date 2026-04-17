# Implementation Plan: Refactor Data Access to Repository Pattern

## Phase 1: Infrastructure and Base Setup

- [ ] Task: Create `lib/services` directory and define base types
  - [ ] Create directory `lib/services`
  - [ ] Define common error types or result wrappers for services
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Infrastructure and Base Setup' (Protocol in workflow.md)

## Phase 2: Dashboard Service Refactor

- [ ] Task: Define `IDashboardService` interface
  - [ ] Create `lib/services/dashboard.ts` (or `.types.ts`)
  - [ ] Define methods for fetching balance, income, expenses, and transaction feed
- [ ] Task: Implement `SupabaseDashboardService`
  - [ ] Create `lib/services/supabase-dashboard.ts`
  - [ ] Implement `IDashboardService` using Supabase client
- [ ] Task: Write tests for `SupabaseDashboardService`
  - [ ] Create `lib/services/supabase-dashboard.test.ts`
  - [ ] Mock Supabase client and verify data fetching logic
- [ ] Task: Refactor Dashboard Actions
  - [ ] Update `app/dashboard/actions.ts` to inject and use `IDashboardService`
  - [ ] Remove direct Supabase imports from `app/dashboard/actions.ts`
- [ ] Task: Verify Dashboard Functionality
  - [ ] Ensure `app/dashboard/page.tsx` renders correctly with refactored actions
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Dashboard Service Refactor' (Protocol in workflow.md)

## Phase 3: Insight Service Refactor

- [ ] Task: Define `IInsightService` interface
  - [ ] Create `lib/services/insight.ts`
  - [ ] Define methods for fetching and refreshing AI insights
- [ ] Task: Implement `SupabaseInsightService`
  - [ ] Create `lib/services/supabase-insight.ts`
  - [ ] Implement `IInsightService` using Supabase client
- [ ] Task: Write tests for `SupabaseInsightService`
  - [ ] Create `lib/services/supabase-insight.test.ts`
  - [ ] Mock Supabase client and verify insight logic
- [ ] Task: Refactor Insight Actions
  - [ ] Update `app/dashboard/insight-actions.ts` to use `IInsightService`
  - [ ] Ensure financial logic remains in `lib/insights.ts`
- [ ] Task: Verify Insight Functionality
  - [ ] Ensure AI insights still load and refresh correctly on the dashboard
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Insight Service Refactor' (Protocol in workflow.md)

## Phase 4: Final Verification and Cleanup

- [ ] Task: Global Search for Direct Supabase Usage in Actions
  - [ ] Ensure no direct Supabase client usage remains in `app/dashboard/`
- [ ] Task: Run Full Test Suite
  - [ ] Execute `npm test` and ensure 100% pass rate
- [ ] Task: Final Code Quality Check
  - [ ] Verify JSDoc/Documentation for all new services and interfaces
  - [ ] Ensure >80% code coverage for new services
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification and Cleanup' (Protocol in workflow.md)
