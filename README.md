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
- [Contributing](#contributing)

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
- **pnpm** 9.x — the [quickstart script](#quick-setup) can enable it via corepack or npm if missing

### Quick setup

From the repo root, run the one-time setup script. It checks Node.js, ensures pnpm is available, installs dependencies, and optionally creates `plug-extension/.env` from the example:

```bash
git clone https://github.com/Nkasi-e/deal-maker.git dealmaker
cd dealmaker
./quickstart.sh
```

Then start the app or extension (see [Commands](#commands) below).

### Manual setup

1. **Clone and enter the repo**
   ```bash
   git clone https://github.com/Nkasi-e/deal-maker.git dealmaker
   cd dealmaker
   ```

2. **Install dependencies (from repo root)**  
   ```bash
   pnpm install
   ```
   Or use the Makefile: `make install`.

3. **(Optional) Extension API keys**  
   For AI features in the extension:
   ```bash
   cp plug-extension/.env.example plug-extension/.env
   # Edit plug-extension/.env: VITE_OPENROUTER_API_KEY and/or VITE_OPENAI_API_KEY
   ```
   The extension still works with built-in tips and sample data if you skip this.

### Commands

You can use **make** (recommended) or **pnpm** from the repo root:

| Goal | Make | pnpm |
|------|------|------|
| **Web app** | `make frontend` | `pnpm run dev:frontend` |
| **Extension dev** | `make extension` | `pnpm run dev:extension` |
| **Both (same terminal)** | `make both` | — |
| **Build all** | `make build` | `pnpm run build:frontend` then `pnpm run build:extension` |
| **Install deps** | `make install` | `pnpm install` |

Run `make` or `make help` to list all targets. The web app runs at **http://localhost:3000**. To use the extension in Chrome, run `make build-extension` (or `pnpm run build:extension`) and load **`plug-extension/dist`** in `chrome://extensions` (Load unpacked).

### Build for production

| Command | Output |
|---------|--------|
| `make build-frontend` or `pnpm run build:frontend` | Next.js app → `frontend/.next` |
| `make build-extension` or `pnpm run build:extension` | Chrome extension → `plug-extension/dist` |

Build everything: `make build`.

### Project layout

| Path | Description |
|------|-------------|
| [**frontend/**](frontend/README.md) | Web app — landing, onboarding, dashboard, opportunities, negotiations, evaluate, vendors, analytics, vendor intelligence, activity, settings. |
| [**plug-extension/**](plug-extension/README.md) | Chrome extension — price detection, comparison, negotiation insights on product and SaaS pages. |
| **Makefile** | `make help`, `make install`, `make frontend`, `make extension`, `make both`, `make build`, etc. |
| **quickstart.sh** | One-time setup: Node/pnpm check, `pnpm install`, optional extension `.env`. |

### Quick reference

| Task | Command |
|------|---------|
| One-time setup | `./quickstart.sh` |
| List make targets | `make` or `make help` |
| Install dependencies | `make install` or `pnpm install` |
| Start web app | `make frontend` or `pnpm run dev:frontend` |
| Start extension dev | `make extension` or `pnpm run dev:extension` |
| Start both | `make both` |
| Build all | `make build` |

---

## Contributing

DealMaker is open to contributions. We welcome bug reports, feature ideas, documentation improvements, and code changes.

- **Bugs and features** — Open an issue to report a bug or suggest a feature. Please search existing issues first.
- **Code and docs** — Open a pull request from a fork. Use a short branch (e.g. `fix/extension-panel` or `docs/readme-setup`), keep changes focused, and reference any related issue.
- **Scope** — Contributions to the web app ([frontend/](frontend/README.md)), the Chrome extension ([plug-extension/](plug-extension/README.md)), tooling (Makefile, quickstart.sh), and docs (README, design, and UX) are all welcome.

By contributing, you agree that your contributions may be used under the same terms as the project license.
