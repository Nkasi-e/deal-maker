# DealMaker UI

Frontend for **DealMaker** — an AI agent platform that finds, negotiates, and closes business deals for users. This UI is a complete set of screens and flows with mocked data; no backend required to run.

## Stack

- **Next.js** (App Router), **TypeScript**, **TailwindCSS**
- **Components**: Radix UI + CVA (Shadcn-style) — Button, Card, Badge, Progress, Input, Slider
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animation**: Framer Motion
- **State**: React (Zustand ready)
- **Data**: Mock only (`src/data/mock.ts`); ready for TanStack Query + API

## Getting started

```bash
cd ui
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page. Use **Get started** or **View demo dashboard** to enter onboarding or the app.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/onboarding` | Onboarding (4 steps) |
| `/dashboard` | Deal discovery dashboard |
| `/opportunities` | Opportunities list |
| `/opportunities/[id]` | Opportunity detail → Start negotiation |
| `/negotiations` | Negotiations list |
| `/negotiations/[id]` | Negotiation workspace (messages + reasoning) |
| `/evaluate` | Deals ready for evaluation |
| `/evaluate/[id]` | Deal evaluation → Approve / Renegotiate |
| `/vendors` | Vendor comparison table |
| `/analytics` | Savings analytics & charts |
| `/vendor-intelligence` | Vendor profiles |
| `/activity` | Agent activity feed |
| `/settings` | Settings & integrations (placeholder) |

## Docs

- **User journey & UX flows**: `docs/USER_JOURNEY_AND_FLOWS.md`
- **Design system**: `docs/DESIGN_SYSTEM.md`

## Design

- **Style**: Modern AI SaaS (Linear, Notion, Stripe, Vercel, Ramp inspired). Clean layout, generous whitespace, data-first.
- **Principles**: Transparency (show what the AI is doing), Control (override/approve), Trust (explain decisions), Clarity (easy-to-scan negotiations).
