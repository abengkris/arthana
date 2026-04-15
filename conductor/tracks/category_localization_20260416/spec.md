# Track Specification: Category Refinement and Indonesian Localization

## Overview

This track focuses on updating the `categories` table to support 'income' and 'expense' types, seeding the database with a specific set of categories, and fully localizing the Transaction UI (including modals, forms, and notifications) into Indonesian.

## Functional Requirements

### 1. Database Migration & Precision Seeding

- **Schema Update:** Add a new column `type` (type: `text`, allowed values: `'income'`, `'expense'`) to the `categories` table.
- **Data Seeding:**
  - Perform a **Hard Delete** of all existing categories (Warning: any existing transactions linked to these categories will need cascading deletion or will cause constraint errors; assume fresh start or handle constraints gracefully if required).
  - Seed the database with the following categories:
    - **INCOME:** "Gaji Utama"
    - **EXPENSE:** "Investasi", "Keluarga", "Tabungan Target", "Transportasi & Kendaraan", "Kebutuhan Harian", "Langganan Digital"

### 2. UI Update & Localization (Transaction Modal)

- **General Localization:** Enforce STRICT Indonesian localization for all UI texts in the Transaction Modal.
  - "Add Transaction" -> "Tambah Transaksi"
  - "Income" -> "Pemasukan"
  - "Expense" -> "Pengeluaran"
  - "Amount" -> "Nominal"
  - "Date" -> "Tanggal"
  - "Note" -> "Catatan"
  - "Submit" -> "Simpan"
- **Comprehensive Scope:** Localize placeholders, error messages, buttons, tooltips, and loading states.
- **Reactive Category Dropdown:**
  - Filter the category dropdown based on the selected transaction type (Pemasukan vs Pengeluaran).
  - Upon toggling the transaction type, reset the category selection and wait for manual user re-selection.

### 3. Server Actions & Notifications

- **Server Validation:** Update server actions to validate that the submitted `category_id` matches the submitted transaction `type`.
- **Toast Notifications:** Ensure all shadcn/ui toast notifications are localized to Indonesian, covering:
  - Success messages (e.g., "Transaksi berhasil disimpan", "Transaksi berhasil dihapus").
  - General error messages (e.g., "Gagal menyimpan transaksi").
  - Validation error messages (e.g., "Format nominal tidak valid").

## Out of Scope

- Localization of other areas of the application (Dashboard, Settings) outside the Transaction domain.
- Building new UI components from scratch (reusing existing shadcn/ui components).
