# Specification: High-Precision Loading & Error States for Dashboard

## Overview

This track aims to improve the dashboard's user experience by implementing granular Suspense boundaries and Skeleton components. This ensures that users can see parts of their dashboard (like balance and transactions) immediately, even if other parts (like AI-generated insights) take longer to load. It also ensures that a failure in one section doesn't crash the entire dashboard.

## Functional Requirements

- **Granular Loading States:** Implement specialized Skeleton components for `SummaryCards`, `AIInsightCard`, and `TransactionFeed`.
- **Suspense Boundaries:** Wrap each dashboard section (`SummaryCards`, `AIInsightSection`, `TransactionFeed`) in its own `Suspense` boundary with its corresponding Skeleton as a fallback.
- **Granular Error Boundaries:** Implement section-specific error handling to ensure that if one section fails to load, the rest of the dashboard remains functional and provides a graceful fallback UI.

## Non-Functional Requirements

- **Visual Consistency:** Skeletons should match the layout and styling of their corresponding components using `shadcn/ui` standards.
- **Animation:** Use the default pulse effect for Skeleton loaders.
- **Performance:** Ensure that adding multiple Suspense boundaries doesn't negatively impact the overall page performance.

## Acceptance Criteria

- [ ] `SummaryCardsSkeleton` component created and used as fallback for `SummaryCards`.
- [ ] `AIInsightSkeleton` component created and used as fallback for `AIInsightSection`.
- [ ] `TransactionFeedSkeleton` component created and used as fallback for `TransactionFeed`.
- [ ] Each section is independently wrapped in `Suspense`.
- [ ] Error boundaries are implemented for each section, showing a localized error message or retry button if data fetching fails.
- [ ] The dashboard "assembles" progressively as data becomes available.

## Out of Scope

- Implementing the actual AI insight logic or real LLM integration (if not already present).
- Changes to the dashboard layout or design beyond loading/error states.
