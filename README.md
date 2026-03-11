# DealMaker

**Your AI agent for negotiating better business deals.**

DealMaker helps you discover savings, compare vendors, and negotiate with confidence—whether you’re managing SaaS subscriptions, supplier contracts, or one-off purchases. The product includes a **web app** (your command center for deals and negotiations) and a **Chrome extension** (price detection and negotiation insights right on product and pricing pages).

---

## Table of contents

- [What DealMaker does](#what-dealmaker-does)
- [Who it’s for](#who-its-for)
- [Product overview](#product-overview)
- [User journey](#user-journey)
- [Key experiences](#key-experiences)
- [Design principles](#design-principles)
- [Development](#development)

---

## What DealMaker does

- **Discovers opportunities** — Surfaces deals and renewals where you can save (SaaS, suppliers, freelancers, etc.).
- **Compares prices** — Shows current price, best price found, and potential savings so you can decide quickly.
- **Supports negotiation** — Delivers negotiation tips and copy-paste messages for “Make offer” and “Contact seller” flows.
- **Keeps you in control** — You approve or reject deals; the agent explains its reasoning so you stay informed.
- **Tracks impact** — Savings analytics, vendor intelligence, and an activity feed show what the agent did and why.

---

## Who it’s for

- **Procurement and ops** — Centralize deal discovery, vendor comparison, and approval in one place.
- **SMBs and startups** — Get negotiation support and price visibility without a dedicated team.
- **Anyone buying SaaS or supplies** — Use the extension on pricing pages and marketplaces for instant context and tips.

---

## Product overview

DealMaker has two parts that work together:

| Part | What it is | Where you use it |
|------|------------|------------------|
| **Web app** | Dashboard, onboarding, opportunities, negotiations, deal evaluation, vendor comparison, analytics, and settings. | Browser at your app URL (e.g. `https://app.dealmaker.com` or localhost in dev). |
| **Chrome extension** | Overlay on product and SaaS pricing pages. Detects prices, shows best price and savings, and offers negotiation tips + copyable messages. | Any supported site in Chrome; badge opens the panel. |

- **Web app:** Your home for configured deal types, detected opportunities, active negotiations, and approvals. You set preferences (target savings, aggressiveness, approval threshold) and review everything in one place.
- **Extension:** Brings DealMaker to the page you’re on—no need to leave a store or pricing page to see comparable prices and get negotiation help.

---

## User journey

High-level flow:

1. **Landing** → Get started or view demo.
2. **Onboarding** (4 steps) → Choose deal types (SaaS, suppliers, freelancers, etc.), set preferences (savings target, aggressiveness, approval threshold), then see a preview and go to the dashboard.
3. **Dashboard** → See savings summary, active negotiations, and detected opportunities.
4. **Opportunities** → Browse list, open an opportunity → see current price, benchmark, potential savings → **Start negotiation** or **Compare vendors**.
5. **Negotiation workspace** → Follow the conversation, agent reasoning, progress, and strategy suggestions.
6. **Deal evaluation** → When a deal is reached, review the outcome and **Approve** or **Request renegotiation**.
7. **Ongoing** → Use **Vendor comparison**, **Savings analytics**, **Vendor intelligence**, and **Agent activity** to stay informed and in control.

The **Chrome extension** supports this by giving you price and negotiation context wherever you browse—so you can act from the dashboard or from the page.

---

## Key experiences

### Web app

- **Landing** — Value proposition, how it works, social proof, CTAs (Start free, View demo dashboard).
- **Onboarding** — Welcome; deal types; preferences (savings, aggressiveness, approval); dashboard preview; “Go to dashboard”.
- **Dashboard** — Title and subtitle; summary cards (e.g. savings, active negotiations); “Detected opportunities” grid; vendor monitoring placeholder.
- **Opportunity detail** — Back/drill-down; title and vendor; summary card; CTAs: Start negotiation, Compare vendors, Open workspace, Review deal.
- **Negotiation workspace** — Progress; two-column layout: conversation + reasoning on the left; “Why the agent made this move,” “Strategy suggestions,” “Deal summary” on the right.
- **Deal evaluation** — Back; header; card with original vs negotiated vs savings and “Why this deal was selected”; Approve / Request renegotiation.
- **Vendor comparison** — Table: Vendor, Price, Reliability, Delivery, Score; sort and filter.
- **Savings analytics** — KPI cards; savings trend chart; deal success rate (e.g. pie/donut).
- **Vendor intelligence** — Grid of vendor cards (name, category, avg discount, response speed, reliability, deals closed).
- **Agent activity** — Feed of agent actions (icon, title, description, timestamp).
- **Settings** — Agent preferences and integrations (placeholders).

### Chrome extension

- **On product / SaaS pages** — DealMaker badge (e.g. bottom-right); panel with **Current price**, **Best price found**, **Potential savings**, **View alternatives**.
- **On “Make offer” / negotiation-style pages** — Same panel plus **Negotiation tips** and **Copy negotiation message**.
- **Options** — Configure API keys (or use build-time keys) and model preferences.

---

## Design principles

DealMaker’s UX is built around:

- **Transparency** — Agent actions are visible (activity feed, reasoning in the workspace, “Why this deal” on evaluation).
- **Control** — You approve, reject, or request renegotiation; settings let you tune thresholds and aggressiveness.
- **Trust** — Clear “why” for recommendations (reasoning panel, deal explanation).
- **Clarity** — Simple language, clear numbers (original vs negotiated vs savings), progress and status badges.

---

## Development

This section is for engineers setting up and running the project.

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **pnpm** 9.x — e.g. `npm install -g pnpm@9` or `corepack enable && corepack prepare pnpm@9.15.0 --activate`

### Setup (step by step)

1. **Clone and enter the repo**
   ```bash
   git clone <your-repo-url> dealmaker
   cd dealmaker
   ```

2. **Install dependencies (from repo root)**  
   Installs dependencies for the web app and the extension:
   ```bash
   pnpm install
   ```

3. **(Optional) Extension API keys**  
   For AI features in the extension:
   ```bash
   cp plug-extension/.env.example plug-extension/.env
   # Edit plug-extension/.env: VITE_OPENROUTER_API_KEY and/or VITE_OPENAI_API_KEY
   ```
   You can skip this; the extension still works with built-in tips and sample data.

### Running the project

| Goal | Command (from repo root) | Notes |
|------|---------------------------|------|
| **Web app only** | `pnpm run dev:frontend` | App at **http://localhost:3000** |
| **Extension dev only** | `pnpm run dev:extension` | Vite dev server for extension UI. To use in Chrome, build and load `plug-extension/dist` (see [plug-extension/README.md](plug-extension/README.md)). |
| **Build extension** | `pnpm run build:extension` | Required before loading in Chrome (`chrome://extensions` → Load unpacked → `plug-extension/dist`) |
| **Run both** | Two terminals: `pnpm run dev:frontend` and `pnpm run dev:extension` | Both are long-running. |

### Build for production

From repo root:

| Command | Output |
|---------|--------|
| `pnpm run build:frontend` | Next.js app → `frontend/.next` |
| `pnpm run build:extension` | Chrome extension → `plug-extension/dist` |

Build everything:
```bash
pnpm run build:frontend
pnpm run build:extension
```

### Project layout

| Path | Description |
|------|-------------|
| [**frontend/**](frontend/README.md) | Web app — landing, onboarding, dashboard, opportunities, negotiations, evaluate, vendors, analytics, vendor intelligence, activity, settings. |
| [**plug-extension/**](plug-extension/README.md) | Chrome extension — price detection, comparison, negotiation insights on product and SaaS pages. |

### Quick reference

| Task | Command (from repo root) |
|------|---------------------------|
| Install all dependencies | `pnpm install` |
| Dev: web app only | `pnpm run dev:frontend` |
| Dev: extension only | `pnpm run dev:extension` |
| Build: web app | `pnpm run build:frontend` |
| Build: extension | `pnpm run build:extension` |
