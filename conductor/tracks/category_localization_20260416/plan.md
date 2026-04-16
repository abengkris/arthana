# Implementation Plan: Category Refinement and Indonesian Localization

## Phase 1: Database Migration & Precision Seeding [checkpoint: 5c63053]

- [x] Task: Update Database Schema 84b5239
  - [x] Create a Supabase migration file to add the `type` column to the `categories` table.
  - [x] Add logic to the migration to clear existing categories and seed the new specified categories ("Gaji Utama", "Investasi", etc.).
- [x] Task: Update Database Types 4528b6e
  - [x] Regenerate `src/types/database.ts` based on the updated schema.
- [x] Task: Conductor - User Manual Verification 'Database Migration & Precision Seeding' (Protocol in workflow.md) 5c63053

## Phase 2: Server Actions & Validations Update [checkpoint: f07c5ab]

- [x] Task: Update Transaction Server Validations 0699523
  - [x] Write failing test to validate `category_id` against transaction `type`.
  - [x] Update server actions (e.g., in `app/transactions/actions.ts`) to ensure the submitted category matches the transaction type (income/expense).
- [x] Task: Localize Validation Schemas ffd72d7
  - [x] Write failing tests for localized validation errors.
  - [x] Update Zod schemas in `lib/validations/transaction.ts` to use Indonesian error messages (e.g., "Format nominal tidak valid").
- [x] Task: Conductor - User Manual Verification 'Server Actions & Validations Update' (Protocol in workflow.md) f07c5ab

## Phase 3: UI Update & Localization (Transaction Modal)

- [x] Task: Localize Transaction Form Texts 0e5ef6b
  - [x] Write failing tests ensuring the form renders Indonesian labels ("Tambah Transaksi", "Pemasukan", "Pengeluaran", "Nominal", "Tanggal", "Catatan", "Simpan").
  - [x] Update `TransactionForm.tsx` (and related components) with the correct Indonesian translations for labels, placeholders, tooltips, and loading states.
- [~] Task: Implement Reactive Category Dropdown
  - [ ] Write failing tests for category dropdown filtering based on the selected transaction type.
  - [ ] Update the UI logic in `TransactionForm.tsx` to filter the category list based on the active type ("Pemasukan" vs "Pengeluaran").
  - [ ] Implement logic to reset the category selection and require manual re-selection when the transaction type is toggled.
- [ ] Task: Localize Toast Notifications
  - [ ] Update the form submission and related UI actions to use Indonesian toast messages (e.g., "Transaksi berhasil disimpan", "Gagal menyimpan transaksi").
- [ ] Task: Conductor - User Manual Verification 'UI Update & Localization (Transaction Modal)' (Protocol in workflow.md)
