import React from "react";
import type { DealMode } from "../../types/pricing";

// ---------------------------------------------------------------------------
// Per-mode visual metadata
// ---------------------------------------------------------------------------

const MODE_META = {
  negotiate: {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
      </svg>
    ),
    badge: "Negotiation Opportunity",
    subtitle: "Seller accepts offers — we'll craft your best opening bid",
    accent: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    dot: "bg-orange-400",
  },
  compare: {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    badge: "Deal Finder",
    subtitle: "Find the best price and alternatives across the web",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  subscribe: {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    badge: "SaaS Pricing",
    subtitle: "Compare subscription plans and uncover discount strategies",
    accent: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    dot: "bg-sky-400",
  },
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ModeHeaderProps {
  mode: DealMode;
  title?: string;
  vendor?: string;
  price?: number;
  currency?: string;
}

export function ModeHeader({ mode, title, vendor, price, currency }: ModeHeaderProps) {
  const m = MODE_META[mode];
  return (
    <div className={`rounded-xl border ${m.border} ${m.bg} p-4`}>
      {/* Mode badge row */}
      <div className={`flex items-center gap-2 ${m.accent} mb-3`}>
        {m.icon}
        <span className="text-xs font-bold uppercase tracking-widest">{m.badge}</span>
        <span className={`ml-auto w-2 h-2 rounded-full ${m.dot} animate-pulse`} />
      </div>

      {/* Product / page title + listed price */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {title && (
            <p className="text-slate-100 font-semibold leading-snug line-clamp-2 text-sm">{title}</p>
          )}
          {vendor && <p className="text-xs text-slate-500 mt-0.5">{vendor}</p>}
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{m.subtitle}</p>
        </div>
        {price != null && price > 0 && (
          <div className="flex-shrink-0 text-right">
            <p className="text-xs text-slate-500">Listed price</p>
            <p className={`text-base font-bold ${m.accent}`}>
              {currency ?? "USD"}{" "}
              {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
