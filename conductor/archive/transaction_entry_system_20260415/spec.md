# Specification: Transaction Entry System

## Overview

Build the core Transaction Entry System for Arthana, allowing users to log expenses and income from anywhere in the application.

## Functional Requirements

1. **Global Access Points**:
   - Primary "Add Transaction" button in the **Header** (top-right).
   - **Floating Action Button (FAB)** at the bottom-right for mobile-friendliness.
2. **"Add Transaction" Modal**:
   - Reusable UI component using `shadcn/ui` Dialog.
   - Should be accessible globally (e.g., via a global state or common layout component).
3. **Transaction Form**:
   - Managed with `React Hook Form` and validated with `Zod`.
   - **Fields**:
     - **Type**: Toggle/Switch between 'Expense' (default) and 'Income'.
     - **Amount**: Number input (positive value entry).
     - **Category**: Dropdown (Select) fetching data dynamically from the user's `categories` table.
     - **Date**: Date picker (Popover + Calendar), defaulting to today.
     - **Note**: Optional text input for additional context.
4. **Server Action (`addTransaction`)**:
   - Validates input on the server side using the same Zod schema.
   - **Math Logic**: Standardizes expenses as negative values before database insertion.
   - Securely inserts records into the `transactions` table, linked to `auth.uid()`.
   - Triggers `revalidatePath('/dashboard')` and returns success/error status.
5. **UI Feedback**:
   - Displays a `shadcn/ui` Toast upon success or failure.
   - Automatically closes the modal on successful submission.

## Non-Functional Requirements

- **Accessibility**: Modal and form elements must meet standard accessibility requirements (ARIA labels, keyboard navigation).
- **Type Safety**: Strict TypeScript typing for form schemas and API responses.
- **Security**: Ensures Row Level Security (RLS) is enforced via Supabase.

## Acceptance Criteria

- [ ] "Add Transaction" modal opens correctly from both the Header and FAB.
- [ ] Category dropdown successfully loads the user's categories.
- [ ] Amount validation prevents non-positive numbers.
- [ ] Server action correctly negates amounts for 'Expense' types.
- [ ] Transactions are correctly linked to the authenticated user in the database.
- [ ] Dashboard UI updates immediately after a successful transaction.
- [ ] Success/Error Toasts appear as expected.

## Out of Scope

- Inline creation of new categories within the modal.
- Receipt or attachment uploads.
- Management of recurring transactions.
- Editing existing transactions via this specific modal.
