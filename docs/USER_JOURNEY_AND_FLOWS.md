# DealMaker – User Journey & UX Flows

## 1. Full Screen List

| # | Screen | Route | Purpose |
|---|--------|--------|---------|
| 1 | Landing page | `/` | Product value, how it works, CTA |
| 2 | Onboarding – Welcome | `/onboarding?step=1` | Welcome and intro |
| 3 | Onboarding – Deal types | `/onboarding?step=2` | Select SaaS, suppliers, freelancers, etc. |
| 4 | Onboarding – Preferences | `/onboarding?step=3` | Target savings, aggressiveness, approval threshold |
| 5 | Onboarding – Preview | `/onboarding?step=4` | Dashboard preview, finish |
| 6 | Deal discovery dashboard | `/dashboard` | Savings summary, active negotiations, opportunities, vendor monitoring |
| 7 | Opportunities list | `/opportunities` | All detected/active opportunities |
| 8 | Opportunity detail | `/opportunities/[id]` | Current vendor, price, benchmark, savings, CTA: Start negotiation |
| 9 | Negotiations list | `/negotiations` | Active negotiation workspaces |
| 10 | Negotiation workspace | `/negotiations/[id]` | Messages, agent reasoning, progress, strategy |
| 11 | Deal evaluation list | `/evaluate` | Deals ready for approval |
| 12 | Deal evaluation | `/evaluate/[id]` | Final deal card, approve / request renegotiation |
| 13 | Vendor comparison | `/vendors` | Table: vendor, price, reliability, delivery, score; sort/filter |
| 14 | Savings analytics | `/analytics` | Monthly/annual savings, charts, success rate |
| 15 | Vendor intelligence | `/vendor-intelligence` | Vendor profiles, outcomes, discounts, reliability |
| 16 | Agent activity feed | `/activity` | Real-time feed of agent actions |
| 17 | Settings | `/settings` | Agent preferences & integrations placeholder |

---

## 2. UX Flow (High Level)

```
Landing → Get started → Onboarding (4 steps) → Dashboard
                                                      ↓
                    ┌─────────────────────────────────┼─────────────────────────────────┐
                    ↓                                 ↓                                 ↓
            Opportunities                      Negotiations                       Evaluate
                    ↓                                 ↓                                 ↓
            Opportunity detail  ──Start negot.──→  Negotiation workspace  ──Deal reached──→  Deal evaluation
                    ↓                                 (messages + reasoning)                    ↓
            Compare vendors                                                              Approve / Renegotiate
```

- **Discovery**: User lands on Dashboard or Opportunities, sees detected opportunities.
- **Detail**: Clicks opportunity → sees current price, benchmark, potential savings → "Start negotiation".
- **Negotiation**: Workspace shows conversation, agent reasoning, progress, strategy suggestions.
- **Evaluation**: When deal is reached, user sees Deal evaluation screen → Approve or Request renegotiation.
- **Analytics & trust**: Savings analytics, vendor intelligence, and agent activity feed support transparency and control.

---

## 3. Navigation Architecture

- **Marketing (no sidebar)**: `/`, `/onboarding`.
- **App (sidebar)**:
  - **Dashboard** – Deal discovery home.
  - **Opportunities** – List and detail (drill-down).
  - **Negotiations** – List and workspace (drill-down).
  - **Deal evaluation** – List and single deal (drill-down).
  - **Vendor comparison** – Single table view.
  - **Savings analytics** – Single dashboard view.
  - **Vendor intelligence** – Single view.
  - **Agent activity** – Single feed view.
  - **Settings** – Placeholder.

Sidebar is fixed left; main content area scrolls. Active route highlighted in sidebar.

---

## 4. UX Principles (Agent-Driven Interface)

- **Transparency**: Every agent action visible (activity feed, reasoning panel in workspace, deal explanation in evaluation).
- **Control**: User can approve, reject, or request renegotiation; settings for thresholds and aggressiveness.
- **Trust**: Clear “why” for recommendations (reasoning panel, “Why this deal” copy on evaluation).
- **Clarity**: Simple language, clear numbers (original vs negotiated vs savings), progress and status badges.

---

## 5. Example UI Copy (Key Screens)

- **Landing headline**: “Your AI agent for negotiating better business deals.”
- **Landing CTA**: “Start free”, “View demo dashboard”.
- **Onboarding**: “What deals do you want help with?”, “Agent setup preferences”, “You’re all set”.
- **Dashboard**: “Deal discovery”, “Your command center for savings and active negotiations”.
- **Opportunity detail**: “Start negotiation”, “Compare vendors”.
- **Negotiation workspace**: “Conversation”, “Why the agent made this move”, “Strategy suggestions”.
- **Deal evaluation**: “Why this deal was selected”, “Approve deal”, “Request renegotiation”.
- **Vendor comparison**: “Compare vendors by price, reliability, delivery, and score.”
- **Analytics**: “Monthly savings”, “Annual savings”, “Deals closed”, “Savings trend”, “Deal success rate”.
- **Activity**: “Real-time feed of agent actions”.

---

## 6. Dashboard Widget Ideas

- Savings summary (monthly + annual run rate).
- Active negotiations count + quick links.
- Detected opportunities (cards: title, vendor, status, potential savings).
- Vendor monitoring (contracts/renewals – placeholder until integrations).
- Optional: “Agent is working on…” live status.
- Optional: Next recommended action (e.g. “Review 1 deal”, “Start negotiation for X”).
