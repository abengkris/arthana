# Specification: Refactor Data Access to Repository Pattern

## Overview

This track involves refactoring the existing data access logic in Arthana from scattered Server Actions and logic files into a centralized, testable, and interface-based repository pattern. This change aims to improve code maintainability, testability, and separation of concerns.

## Objectives

- Centralize all Supabase database queries and mutations into a new `lib/services/` directory.
- Define TypeScript interfaces for each service to facilitate mocking and dependency injection during testing.
- Refactor current dashboard and insight actions to consume these new services.
- Ensure that financial calculation logic (e.g., emergency fund calculations) remains decoupled from the data access layer.

## Functional Requirements

- **Directory Structure:** Create a `lib/services/` directory to house the repository interfaces and implementations.
- **Service Interfaces:** Each service (e.g., `DashboardService`, `InsightService`) must have a corresponding TypeScript interface defined.
- **Supabase Integration:** Services will use the Supabase client (from `utils/supabase/`) to perform database operations.
- **Action Refactoring:** Update `app/dashboard/actions.ts` and `app/dashboard/insight-actions.ts` to use the new services instead of direct Supabase calls.

## Non-Functional Requirements

- **Testability:** The new structure must allow for easy unit testing of services by mocking the Supabase client and testing actions by mocking the services.
- **Type Safety:** Maintain strict TypeScript typing throughout the refactoring process.
- **Performance:** Ensure that the refactoring does not introduce unnecessary performance overhead (e.g., redundant database calls).

## Acceptance Criteria

- [ ] `lib/services/` directory exists with interfaces and implementations.
- [ ] `DashboardService` and `InsightService` (or similar names) are implemented and used.
- [ ] Dashboard and AI Insights sections correctly display data after the refactor.
- [ ] All existing tests pass, and new tests are added to verify the service layer.
- [ ] No direct Supabase calls remain in the refactored Server Actions.

## Out of Scope

- Migrating other modules (e.g., authentication, onboarding) is not required in this track but can be planned for future tracks.
- Adding new financial features or modifying existing financial logic.
- UI changes or redesigns.
