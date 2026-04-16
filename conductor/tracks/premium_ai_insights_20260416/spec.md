# Specification: Premium Tiers & AI Smart Cards

## 1. Overview

Implement a foundational "Premium Tiers" system and an MVP "Wawasan AI" (AI Insights) feature on the Dashboard. This feature will act as the user's "Automated Pocket Financial Advisor," generating contextual, logic-based financial advice cards in a casual Indonesian tone.

## 2. Functional Requirements

### 2.1. Database & Schema

- **`profiles` Table Update:** Add a `subscription_tier` column (Type: `text`, Default: `'free'`).
- **`ai_insights` Table Creation:**
  - Columns: `id` (UUID), `user_id` (UUID, Foreign Key), `content` (Text), `type` (String, e.g., 'warning', 'encouragement', 'saving_tip'), `created_at` (Timestamp).
  - **Retention Policy:** Ephemeral. Old insights for a user must be deleted or overwritten when new insights are generated to save space.

### 2.2. Smart Card Generator Logic (Server-Side)

- **Trigger:** Automatically evaluated on Dashboard page load via a Server Component.
- **Evaluation Criteria:**
  - **Budget Warning:** A category exceeds 80% of its allocated limit.
  - **Deficit Warning:** Total expenses exceed total income for the current month.
  - **Savings Prompt:** The 'Investasi' (Investment) category has zero transactions this month.
- **Persona:** Casual, friendly Indonesian (e.g., "Waduh, jatah jajanmu udah mepet nih. Yuk, ngerem dikit! 🛑").

### 2.3. Dashboard UI ("Wawasan AI" Section)

- **Placement:** Prominently at the top of the Dashboard, above the Summary Cards.
- **Components:** Utilize shadcn/ui `Alert` or `Card` components.
- **Tier-Based Rendering:**
  - **Free Users (`subscription_tier === 'free'`):** Display exactly 1 auto-generated Smart Card.
  - **Premium Users (`subscription_tier === 'premium'`):** Display multiple applicable cards AND a placeholder button for a future "Konsultasi Chat" (Chat Consultation) feature.

## 3. Non-Functional Requirements

- **Performance:** The Server Component evaluation must be highly optimized to not block the Dashboard rendering.
- **Security:** Ensure Row Level Security (RLS) policies are correctly applied to the new `ai_insights` table, restricting access to the authenticated user.

## 4. Acceptance Criteria

- [ ] A Supabase migration script successfully adds `subscription_tier` to `profiles` and creates the `ai_insights` table.
- [ ] The backend logic correctly identifies the three target scenarios (Budget Warning, Deficit, No Investment).
- [ ] The Dashboard displays the "Wawasan AI" section at the top.
- [ ] Free users see exactly one relevant insight card.
- [ ] Premium users see multiple relevant cards (if applicable) and a disabled "Konsultasi Chat" button.
- [ ] The tone of the cards matches the specified casual Indonesian persona.
- [ ] Generating new insights correctly removes or overwrites old insights for the user (Ephemeral retention).
