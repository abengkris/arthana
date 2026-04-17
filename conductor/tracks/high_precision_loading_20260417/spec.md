# Specification: High-Precision Loading & Error States

## Overview

This track aims to improve the dashboard's user experience by implementing granular Suspense boundaries and Skeleton components for each dashboard card (Summary, AI Insights, Transaction Feed). This ensures that users can see their balance and transactions immediately, even if other parts (like AI-generated insights) take longer to load. It also ensures that a failure in one section doesn't crash the entire dashboard.

## Functional Requirements

- **Granular Loading States:** Implement specialized Skeleton components for `SummaryCards`, `AIInsightCard`, and `TransactionFeed`.
- **Suspense Boundaries:** Wrap each dashboard section (`SummaryCards`, `AIInsightSection`, `TransactionFeed`) in its own `Suspense` boundary with its corresponding Skeleton as a fallback.
- **Granular Error Boundaries:** Implement section-specific error handling for each card. If a section fails to load, display a section-specific error message with a "Retry" button.

## Non-Functional Requirements

- **Visual Style:** Skeletons should use basic geometric shapes with a simple pulse effect.
- **Performance:** Maintain 60fps and ensure that adding multiple Suspense boundaries doesn't negatively impact the overall page performance or cause layout shifts.

## Acceptance Criteria

- [ ] `SummaryCardsSkeleton` component created and used as fallback for `SummaryCards`.
- [ ] `AIInsightSkeleton` component created and used as fallback for `AIInsightSection`.
- [ ] `TransactionFeedSkeleton` component created and used as fallback for `TransactionFeed`.
- [ ] Each section is independently wrapped in `Suspense`.
- [ ] Error boundaries are implemented for each section, showing a specific error message and a retry button if data fetching fails.
- [ ] The dashboard "assembles" progressively as data becomes available without layout shifts.

## Out of Scope

- Implementing the actual AI insight logic or real LLM integration (if not already present).
- Changes to the dashboard layout or design beyond loading/error states.
