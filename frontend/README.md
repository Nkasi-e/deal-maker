# DealMaker Web App

The **DealMaker web app** is your command center for deal discovery, negotiations, and approvals. It includes the landing experience, onboarding, dashboard, opportunities, negotiation workspaces, deal evaluation, vendor comparison, savings analytics, vendor intelligence, agent activity, and settings.

This app is one part of DealMaker; the other is the [Chrome extension](../plug-extension/README.md), which adds price detection and negotiation insights on product and SaaS pricing pages. Together they give users a single place to configure preferences and review outcomes, plus in-context help while browsing.

---

## What this app covers

- **Marketing & onboarding** — Landing page, value proposition, and a 4-step onboarding flow (deal types, preferences, preview, then dashboard).
- **Dashboard** — Savings summary, active negotiations, detected opportunities, and vendor monitoring.
- **Opportunities** — List and detail views; start a negotiation or compare vendors from an opportunity.
- **Negotiations** — List of workspaces and a workspace view with conversation, agent reasoning, progress, and strategy suggestions.
- **Deal evaluation** — List of deals ready for approval; detail view with original vs negotiated vs savings, “Why this deal,” and Approve / Request renegotiation.
- **Vendor comparison** — Sortable, filterable table (vendor, price, reliability, delivery, score).
- **Savings analytics** — KPIs and charts (e.g. savings trend, deal success rate).
- **Vendor intelligence** — Vendor cards (name, category, avg discount, response speed, reliability, deals closed).
- **Agent activity** — Feed of agent actions with timestamps.
- **Settings** — Agent preferences and integrations (placeholders).

All of this is implemented with **mock data** (`src/data/mock.ts`); no backend is required to run the app. The codebase is ready to plug in TanStack Query and real APIs when available.

---

## Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** TailwindCSS; design tokens in `globals.css` and `tailwind.config.ts`
- **Components:** Radix UI primitives + CVA (Shadcn-style) — Button, Card, Badge, Progress, Input, Slider, Tabs, etc.
- **Icons:** Lucide React
- **Charts:** Recharts (e.g. BarChart, PieChart, ResponsiveContainer, Tooltip)
- **Animation:** Framer Motion (entrance and list animations)
- **State:** React state; Zustand is available for cross-page state
- **Forms:** React Hook Form is available (onboarding uses controlled state; can be migrated)
- **Data:** Mock in `src/data/mock.ts`; structure is ready for TanStack Query + API

---

## Getting started

From the **repo root** (recommended):

```bash
pnpm install
pnpm run dev:frontend
```

Or from this folder:

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Get started** or **View demo dashboard** to go through onboarding or jump into the app.

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/onboarding` | Onboarding (4 steps: welcome, deal types, preferences, preview) |
| `/dashboard` | Deal discovery dashboard |
| `/opportunities` | Opportunities list |
| `/opportunities/[id]` | Opportunity detail → Start negotiation, Compare vendors |
| `/negotiations` | Negotiations list |
| `/negotiations/[id]` | Negotiation workspace (messages, reasoning, strategy) |
| `/evaluate` | Deals ready for evaluation |
| `/evaluate/[id]` | Deal evaluation → Approve / Request renegotiation |
| `/vendors` | Vendor comparison table |
| `/analytics` | Savings analytics and charts |
| `/vendor-intelligence` | Vendor profiles |
| `/activity` | Agent activity feed |
| `/settings` | Settings and integrations (placeholder) |

Auth routes (e.g. `/auth`, `/auth/signin`, `/auth/signup`) are present for future integration.

---

## Design

- **Style:** Modern AI/SaaS aesthetic (clean layout, generous whitespace, data-first). Cards, badges, and progress indicators make negotiations and savings easy to scan.
- **Principles:** Transparency (show what the agent is doing), Control (approve/reject/renegotiate), Trust (explain decisions), Clarity (clear numbers and status).

Layout and component structure follow the design system described in the repo (e.g. shared layout with `AppSidebar`, reusable UI in `components/ui`, page-level composition in `app/`).

---

## Scripts (from `frontend/`)

| Script | Command | Description |
|--------|---------|-------------|
| dev | `pnpm dev` | Next.js dev server with Turbo |
| build | `pnpm build` | Production build |
| start | `pnpm start` | Run production build |
| lint | `pnpm lint` | Next.js ESLint |
| clean | `pnpm clean` | ESLint only (as defined in package.json) |

For monorepo usage, run from the repo root: `pnpm run dev:frontend`, `pnpm run build:frontend`, etc.
