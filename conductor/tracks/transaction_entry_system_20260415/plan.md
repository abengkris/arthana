# Implementation Plan: Transaction Entry System

## Phase 1: Logic & Schema (Server-Side) [checkpoint: b0b9d87]

Building the robust foundation for transaction processing.

- [x] **Task 1.1: Define Transaction Schemas** 28bb923
  - [ ] Create `lib/validations/transaction.ts` with Zod schemas for 'Expense' and 'Income' inputs.
  - [ ] Define shared types for transaction data.
- [x] **Task 1.2: Implement Server Action Logic (TDD)** 15f3e5f
  - [ ] **Write Tests**: Create `app/transactions/actions.test.ts` to test `addTransaction` logic (input validation, negative conversion for expenses).
  - [ ] **Implement**: Create `app/transactions/actions.ts` and implement `addTransaction` with Supabase integration and revalidation.
  - [ ] **Verify**: Ensure all tests pass and RLS is correctly utilized via the server-side client.
- [x] **Task 1.3: Conductor - User Manual Verification 'Phase 1: Logic & Schema' (Protocol in workflow.md)** b0b9d87

## Phase 2: Global UI Elements (Buttons & Modals)

Setting up the entry points and the container for the form.

- [ ] **Task 2.1: Create Header Trigger**
  - [ ] **Write Tests**: Create `components/dashboard/HeaderAction.test.tsx` to verify button rendering and click behavior.
  - [ ] **Implement**: Add "New Transaction" button to the existing Header component.
- [ ] **Task 2.2: Create Floating Action Button (FAB)**
  - [ ] **Write Tests**: Create `components/ui/FAB.test.tsx` for responsive visibility and click event.
  - [ ] **Implement**: Develop a generic `FAB` component with a plus icon.
- [ ] **Task 2.3: Global Transaction Modal Shell**
  - [ ] **Write Tests**: Create `components/transactions/TransactionModal.test.tsx` to ensure Dialog opens/closes.
  - [ ] **Implement**: Create `components/transactions/TransactionModal.tsx` using `shadcn/ui` Dialog.
- [ ] **Task 2.4: Conductor - User Manual Verification 'Phase 2: Global UI Elements' (Protocol in workflow.md)**

## Phase 3: Form Development (Transaction Form)

Building the interactive form with dynamic data.

- [ ] **Task 3.1: Transaction Form Implementation (TDD)**
  - [ ] **Write Tests**: Create `components/transactions/TransactionForm.test.tsx` to test form validation and submission behavior.
  - [ ] **Implement**: Build `TransactionForm.tsx` using React Hook Form, Zod, and `shadcn/ui` (Switch, Input, Select, Calendar).
- [ ] **Task 3.2: Dynamic Category Integration**
  - [ ] **Write Tests**: Mock category data in `TransactionForm.test.tsx` to verify dropdown rendering.
  - [ ] **Implement**: Fetch user categories within the form or pass them as props from a server component.
- [ ] **Task 3.3: Conductor - User Manual Verification 'Phase 3: Form Development' (Protocol in workflow.md)**

## Phase 4: Integration & Feedback (Final Polish)

Connecting all parts and providing user feedback.

- [ ] **Task 4.1: Final Integration**
  - [ ] Connect `TransactionForm` to the `addTransaction` server action.
  - [ ] Implement Toast notifications for success/error messages.
- [ ] **Task 4.2: End-to-End Verification**
  - [ ] Verify the full flow: Open Modal -> Fill Form -> Submit -> See Toast -> Check Dashboard Update.
- [ ] **Task 4.3: Conductor - User Manual Verification 'Phase 4: Integration & Feedback' (Protocol in workflow.md)**
