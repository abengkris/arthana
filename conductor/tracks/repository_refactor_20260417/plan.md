# Implementation Plan: Refactor Data Access to Repository Pattern

## Phase 1: Infrastructure and Base Setup [checkpoint: eb6de2e]

- [x] Task: Create `lib/services` directory and define base types d05334a
  - [x] Create directory `lib/services`
  - [x] Define common error types or result wrappers for services
- [x] Task: Conductor - User Manual Verification 'Phase 1: Infrastructure and Base Setup' (Protocol in workflow.md) eb6de2e

## Phase 2: Dashboard Service Refactor [checkpoint: 247e4f6]

- [x] Task: Define `IDashboardService` interface 7c2bcc8
  - [x] Create `lib/services/dashboard.ts` (or `.types.ts`)
  - [x] Define methods for fetching balance, income, expenses, and transaction feed
- [x] Task: Implement `SupabaseDashboardService` 339d53e
  - [x] Create `lib/services/supabase-dashboard.ts`
  - [x] Implement `IDashboardService` using Supabase client
- [x] Task: Write tests for `SupabaseDashboardService` 58a4dd1
  - [x] Create `lib/services/supabase-dashboard.test.ts`
  - [x] Mock Supabase client and verify data fetching logic
- [x] Task: Refactor Dashboard Actions c9f5fd1
  - [x] Update `app/dashboard/actions.ts` to inject and use `IDashboardService`
  - [x] Remove direct Supabase imports from `app/dashboard/actions.ts`
- [x] Task: Verify Dashboard Functionality c9f5fd1
  - [x] Ensure `app/dashboard/page.tsx` renders correctly with refactored actions
- [x] Task: Conductor - User Manual Verification 'Phase 2: Dashboard Service Refactor' (Protocol in workflow.md) 247e4f6

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
