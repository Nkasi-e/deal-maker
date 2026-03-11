import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DealInsights } from "../../types/pricing";
import { ensureRoot, ROOT_ID, SkeletonCard } from "./atoms";
import { ModeHeader } from "./ModeHeader";
import {
  VendorPricesSection, BenchmarkSection, AlreadyGoodDealSection,
  NoBetterPriceSection, BestPriceSection, AlternativesSection, NegotiationSection,
} from "./sections";

// ---------------------------------------------------------------------------
// Main overlay panel
// ---------------------------------------------------------------------------

interface OverlayProps {
  insights: DealInsights | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onCopyMessage: (text: string) => void;
}

export function OverlayPanel({ insights, loading, error, onClose }: OverlayProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const hasBetterPrice =
    (insights?.bestPrice != null && (insights.potentialSavings ?? 0) > 0) ||
    (insights?.alternatives != null && insights.alternatives.length > 0);

  const noBetterPrice = insights != null && !insights.alreadyGoodDeal && !hasBetterPrice;

  const panel = (
    <div
      className="dealmaker-overlay fixed top-0 right-0 z-[2147483646] h-full w-[min(100vw,380px)] max-w-full bg-[#0f172a] border-l border-slate-700/50 animate-slide-in-right"
      role="dialog"
      aria-label="DealMaker insights"
      style={{ display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.5)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50"
        style={{ flexShrink: 0 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-dm-accent animate-pulse-slow" />
          <h2 className="text-base font-bold text-white tracking-tight">DealMaker</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700/60 hover:text-white transition-all active:scale-90"
          aria-label="Close panel"
          style={{ cursor: "pointer", background: "none", border: "none", lineHeight: 0 }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>

        {/* Loading */}
        {loading && (
          <>
            <SkeletonCard delay={0} />
            <SkeletonCard delay={80} />
            <SkeletonCard delay={160} />
            <p className="text-xs text-slate-500 text-center pt-1"
              style={{ animation: "fadeUp 0.4s ease-out 0.3s both", opacity: 0 }}>
              Analysing prices &amp; market data…
            </p>
          </>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="rounded-xl bg-red-900/20 border border-red-800/40 text-red-100 p-4 text-sm space-y-2"
            style={{ animation: "scaleIn 0.22s ease-out both" }}
          >
            <p className="font-semibold">We couldn’t load DealMaker insights</p>
            <p className="text-red-200/80 text-xs">
              This is usually a temporary network or API issue. Your current page content is safe and
              unaffected.
            </p>
            <p className="text-red-400/80 text-[11px] break-words">
              <span className="font-semibold">Technical detail:</span> {error}
            </p>
          </div>
        )}

        {/* Insights */}
        {!loading && !error && insights && (
          <>
            <div style={{ animation: "fadeUp 0.35s ease-out both", opacity: 0 }}>
              <ModeHeader
                mode={insights.detected.dealMode}
                title={insights.detected.title}
                vendor={insights.detected.vendor}
                price={insights.detected.prices[0]?.amount}
                currency={insights.detected.prices[0]?.currency}
              />
            </div>
            <VendorPricesSection insights={insights} />
            <BenchmarkSection insights={insights} />
            <AlreadyGoodDealSection insights={insights} />
            <NoBetterPriceSection noBetterPrice={noBetterPrice} />
            <BestPriceSection insights={insights} />
            <AlternativesSection insights={insights} />
            <NegotiationSection insights={insights} />
          </>
        )}

        {/* Nothing detected */}
        {!loading && !error && !insights && (
          <div className="text-center py-10 space-y-2" style={{ animation: "fadeUp 0.35s ease-out both" }}>
            <p className="text-slate-400 text-sm">No pricing detected on this page.</p>
            <p className="text-slate-600 text-xs">Navigate to a product or pricing page.</p>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(panel, ensureRoot(ROOT_ID));
}
