# Project Overview
This application, named **Arthana**, is a dynamic personal finance management SaaS designed for public users. Its core vision is to act as an "Automated Pocket Financial Advisor." Arthana goes beyond basic expense tracking by proactively providing tactical allocation advice (e.g., suggesting "Spartan Mode" when a user nears a deficit) and automatically calculating financial safety net targets based on the user's specific risk profile.

# Tech Stack & Infrastructure
- **Framework:** Next.js 16.2.3 (App Router).
- **Styling & UI Components:** Tailwind CSS paired with shadcn/ui for accessible, consistent, and modern interface components.
- **Backend, Auth & Database:** Supabase (PostgreSQL, Supabase Auth, Edge Functions).
- **Deployment:** Vercel (Edge-ready, serverless workflow).
- **Language:** TypeScript with strict static typing.
- **Package Manager:** pnpm.

# Core Features (MVP)
1. **Dynamic Budgeting:** Automated allocation of income into specific expense categories based on customizable percentages.
2. **Auto Emergency Fund:** Dynamic calculation of emergency fund targets (3, 6, or 12 months) triggered during user onboarding based on their employment and risk profile.
3. **Smart Advisory & Anomaly Detection:** Automated notification system for rapid budget depletion, complete with one-click actionable recommendations to prevent monthly deficits.
4. **Transaction Logging:** Real-time expense tracking that dynamically syncs with and deducts from remaining category budgets.

# Security & Database Strict Rules
- **Row Level Security (RLS) is MANDATORY:** Every SQL operation (SELECT, INSERT, UPDATE, DELETE) on operational tables (`transactions`, `budgets`, `categories`) MUST be validated using `auth.uid()`.
- **Multi-Tenant Isolation:** Zero data leakage between tenants is strictly enforced. All ownership foreign keys must reference the standard `auth.users` table in Supabase.

# Development Guidelines for Gemini CLI
- **Code Generation:** Output TypeScript code that is modular, type-safe, functional, and strictly copy-paste ready. Avoid excessive verbosity and redundant explanations.
- **UI Construction:** Prioritize the use of shadcn/ui components for interface design. Assume shadcn components are already initialized and use standard import syntax (e.g., `import { Button } from "@/components/ui/button"`).
- **Data Fetching:** Utilize Next.js 16.2.3 Server Components for secure data fetching directly from Supabase. Pass data down to Client Components only when client-side interactivity (hooks) is strictly required.
- **Deployment Readiness:** Ensure all logic and environment variables (e.g., Supabase keys) are securely referenced and compatible with Vercel deployment standards.
