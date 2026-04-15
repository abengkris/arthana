# Product Guidelines: Arthana

## Branding & Visual Style
- **Interface:** Modern, accessible, and interactive.
- **Components:** Built with Tailwind CSS and shadcn/ui.
- **Principles:** High visual impact, polished spacing, and modern interactivity.
- **Visuals:** Use platform-native primitives (stylized shapes, gradients, icons) to ensure a coherent experience.

## UX Principles
- **Feedback:** Provide immediate interactive feedback to the user.
- **Accessibility:** Adhere to high accessibility standards.
- **Navigation:** Clear and intuitive, leading the user through onboarding and daily tracking.

## Technical Standards
- **Framework:** Next.js 16.2.3 (App Router).
- **Language:** TypeScript with strict static typing.
- **Code Generation:** Modular, type-safe, and functional.
- **Data Fetching:** Prefer React Server Components for secure data retrieval.

## Security & Privacy
- **RLS Mandatory:** Row Level Security MUST be enforced on all operations in operational tables.
- **Data Isolation:** Zero data leakage between tenants is strictly enforced.
- **Multi-Tenant:** Ownership foreign keys must reference `auth.users`.
