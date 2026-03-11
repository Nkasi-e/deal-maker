# DealMaker Design System

## Design system recommendations

- **Tokens**: All interactive and surface colors, radius, and chart colors live in `globals.css` as CSS variables and are extended in `tailwind.config.ts`. Use semantic names (`--primary`, `--success`, `--muted`, etc.).
- **Typography**: `--font-sans` (Inter) for UI; clear hierarchy with `text-display-lg`, `text-display-md`, `text-display-sm` for headings.
- **Spacing**: Consistent padding (e.g. `p-6` for cards, `p-8` for page content); generous whitespace for a “command center” feel.
- **Motion**: Subtle entrance animations (fade + slight Y) for cards and lists; progress bars and key metrics can use light motion to draw attention.
- **Data-first**: Numbers and status are primary; use badges, progress bars, and clear labels (e.g. “Current price”, “Potential savings”) so negotiations are scannable.

---

## Layout descriptions

- **Landing**: Full-width; hero with gradient-mesh background; value props in grid; “How it works” steps; savings example card; footer CTA.
- **Onboarding**: Centered single-column card; step progress bar; one card per step with form or selection; primary CTA to continue or “Go to dashboard”.
- **Dashboard**: Top bar (title + subtitle); 4 summary cards in a row; “Detected opportunities” grid (cards); “Vendor monitoring” placeholder section.
- **Opportunity detail**: Breadcrumb/back; header with title and vendor; one main card (summary); CTAs (Start negotiation, Compare vendors, Open workspace, or Review deal).
- **Negotiation workspace**: Header with progress bar; two-column layout: conversation (messages + reasoning) left, right column = “Why the agent made this move”, “Strategy suggestions”, “Deal summary”.
- **Deal evaluation**: Back link; header; one card with original/negotiated/savings and “Why this deal was selected”; Approve / Request renegotiation buttons.
- **Vendor comparison**: Header; filter input; table with sortable columns (Vendor, Price, Reliability, Delivery, Score).
- **Savings analytics**: Header; 4 KPI cards; two charts (savings trend bar chart, deal success rate pie/donut).
- **Vendor intelligence**: Header; grid of vendor cards (name, category, avg discount, response speed, reliability, deals closed).
- **Agent activity**: Header; single feed (icon + title + description + timestamp per event).
- **Settings**: Header; cards for “Agent preferences” and “Integrations” (placeholders).

---

## Component structure (high level)

```
src/
├── app/                    # Routes and page layouts
├── components/
│   ├── layout/             # AppSidebar
│   └── ui/                 # Button, Card, Badge, Input, Progress, Slider
├── data/
│   └── mock.ts             # Mock data for all screens
├── lib/
│   └── utils.ts            # cn, formatCurrency, formatPercent
└── docs/                   # This file + USER_JOURNEY_AND_FLOWS.md
```

- **Reusable UI**: Use `components/ui` for primitives (Button, Card, Badge, Input, Progress, Slider). Compose these in page-level content.
- **Layout**: `AppSidebar` is the only shared layout component for the app shell; dashboard layout wraps children with sidebar + main.
- **Data**: All screens read from `data/mock.ts`; replace with TanStack Query + API later.

---

## Frontend folder structure (current)

```
ui/
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.ts
├── docs/
│   ├── USER_JOURNEY_AND_FLOWS.md
│   └── DESIGN_SYSTEM.md
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── (marketing)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx                    # Landing
    │   │   └── onboarding/[[...step]]/
    │   │       └── page.tsx                # Onboarding 4 steps
    │   └── (dashboard)/
    │       ├── layout.tsx                  # Sidebar + main
    │       ├── dashboard/page.tsx
    │       ├── opportunities/
    │       │   ├── page.tsx
    │       │   └── [id]/page.tsx
    │       ├── negotiations/
    │       │   ├── page.tsx
    │       │   └── [id]/page.tsx
    │       ├── evaluate/
    │       │   ├── page.tsx
    │       │   └── [id]/page.tsx
    │       ├── vendors/page.tsx
    │       ├── analytics/page.tsx
    │       ├── vendor-intelligence/page.tsx
    │       ├── activity/page.tsx
    │       └── settings/page.tsx
    ├── components/
    │   ├── layout/
    │   │   └── AppSidebar.tsx
    │   └── ui/
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── badge.tsx
    │       ├── progress.tsx
    │       ├── input.tsx
    │       └── slider.tsx
    ├── data/
    │   └── mock.ts
    └── lib/
        └── utils.ts
```

---

## Recommended frontend stack (in use)

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: TailwindCSS
- **Components**: Radix primitives + CVA (Shadcn-style): Button, Card, Badge, Progress, Input, Slider
- **Icons**: Lucide React
- **Charts**: Recharts (BarChart, PieChart, ResponsiveContainer, Tooltip)
- **Animation**: Framer Motion (page and list animations)
- **State**: Local React state; Zustand ready for cross-page state if needed
- **Forms**: React Hook Form ready (onboarding uses controlled state; can migrate)
- **Data**: Mock in `data/mock.ts`; TanStack Query recommended for API integration
- **Design tokens**: CSS variables in `globals.css`, extended in `tailwind.config.ts`
