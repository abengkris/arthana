# Specification: Friendly Dashboard

## Overview

- Goal: Create a dashboard with a friendly, casual Indonesian persona.
- Persona: Supportive companion for general users.

## Functional Requirements

- **Greeting Header:** Time-based dynamic greetings in Indonesian (e.g., "Selamat Pagi [Nama]! Gimana arus kasmu hari ini? ☕").
- **Top Cards:** "Sisa Dompet", "Uang Masuk", "Uang Keluar" (IDR formatting via Currency.js).
- **Tabungan Impian 🚀:** Aggregated 'Investasi' and 'Tabungan Target' categories. Encouraging text.
- **Budget Progress:** Shadcn chart-based progress bars with friendly labels (Safe, Warning, Over).
- **Budget Alerts:** Notifications via Toasts, Banner Alerts, and Progress Bar labels.
- **Jejak Uangmu:** Latest 5 transactions with an illustrative empty state.

## Tech Stack

- Next.js 16.2.3 Server Components for data.
- UI Components: Shadcn/UI.
- Charts: Shadcn/Chart.
- Currency formatting: Currency.js.
- Typography: Geist.

## Non-Functional Requirements

- Tone: Friendly, casual, conversational Indonesian.

## Out of Scope

- Detailed transaction history page.
- External account syncing.
