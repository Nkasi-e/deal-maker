import React from "react";
import type { DealInsights } from "../../types/pricing";
import { Card, SectionLabel, CopyButton } from "./atoms";

type Insights = DealInsights;

// ---------------------------------------------------------------------------
// Vendor prices
// ---------------------------------------------------------------------------

export function VendorPricesSection({ insights }: { insights: Insights }) {
  const { prices, priceContext } = insights.detected;
  if (!prices.length) return null;

  const label = prices.length > 1
    ? `Vendor prices${priceContext ? ` · ${priceContext}` : ""}`
    : "Vendor price";

  return (
    <Card delay={60}>
      <SectionLabel>{label}</SectionLabel>
      {prices.length > 1 ? (
        <div className="flex flex-wrap gap-2 mt-1">
          {prices.filter((p) => p.amount > 0).slice(0, 6).map((p, i) => (
            <span
              key={`${p.amount}-${i}`}
              className="inline-flex rounded-lg bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white"
              style={{ animation: "scaleIn 0.2s ease-out both", animationDelay: `${i * 40}ms`, opacity: 0 }}
            >
              {p.currency} {p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-3xl font-bold text-white mt-0.5">
          {prices[0].currency} {prices[0].amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Market benchmark + status cards
// ---------------------------------------------------------------------------

export function BenchmarkSection({ insights }: { insights: Insights }) {
  const { negotiation } = insights;
  if (negotiation?.marketBenchmark == null) return null;
  return (
    <Card delay={110}>
      <SectionLabel>Market benchmark</SectionLabel>
      <p className="text-2xl font-bold text-slate-100 mt-0.5">
        {negotiation.currency} {negotiation.marketBenchmark.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>
      <p className="text-xs text-slate-500 mt-1">Estimated fair market price for this product</p>
    </Card>
  );
}

export function AlreadyGoodDealSection({ insights }: { insights: Insights }) {
  if (!insights.alreadyGoodDeal) return null;
  return (
    <Card delay={160} className="bg-dm-success/10 border-dm-success/30">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-dm-success/20 flex items-center justify-center"
          style={{ animation: "scaleIn 0.25s ease-out 0.2s both", opacity: 0 }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-dm-success">Already a good deal</p>
          <p className="text-xs text-slate-400 mt-0.5">Vendor price is at or below market benchmark — no negotiation needed.</p>
        </div>
      </div>
    </Card>
  );
}

export function NoBetterPriceSection({ noBetterPrice }: { noBetterPrice: boolean }) {
  if (!noBetterPrice) return null;
  return (
    <Card delay={160} className="border-slate-700/40">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-300">No better pricing found</p>
          <p className="text-xs text-slate-500 mt-0.5">Couldn't find cheaper direct alternatives — see similar products below.</p>
        </div>
      </div>
    </Card>
  );
}

export function BestPriceSection({ insights }: { insights: Insights }) {
  if (!insights.bestPrice || insights.alreadyGoodDeal) return null;
  const { bestPrice, potentialSavings, detected } = insights;
  return (
    <>
      <Card delay={180}>
        <SectionLabel>Best price found</SectionLabel>
        <p className="text-2xl font-bold text-dm-success mt-0.5">
          {bestPrice.currency} {bestPrice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-slate-400 mt-1">{bestPrice.source}</p>
      </Card>
      {potentialSavings != null && potentialSavings > 0 && (
        <Card delay={220} className="bg-dm-success/10 border-dm-success/30">
          <SectionLabel>Potential savings</SectionLabel>
          <p className="text-2xl font-bold text-dm-success mt-0.5">
            {detected.prices[0]?.currency ?? "USD"}{" "}
            {potentialSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </Card>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Alternatives
// ---------------------------------------------------------------------------

export function AlternativesSection({ insights }: { insights: Insights }) {
  const alts = insights.alternatives;
  if (!alts?.length) return null;
  return (
    <Card delay={240}>
      <SectionLabel>Similar products to consider</SectionLabel>
      <ul className="space-y-4 mt-2">
        {alts.map((alt, i) => (
          <li key={i} className="border-t border-slate-800/50 pt-4 first:border-0 first:pt-0"
            style={{ animation: "fadeUp 0.3s ease-out both", animationDelay: `${260 + i * 60}ms`, opacity: 0 }}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-bold text-white leading-snug">{alt.name}</span>
              <span className="flex-shrink-0 text-xs font-semibold text-dm-accent bg-dm-accent/10 border border-dm-accent/20 rounded-md px-2 py-0.5">
                {alt.priceInfo}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 italic">{alt.whyConsider}</p>
            {alt.merchantSource && <p className="text-[11px] text-slate-500 mt-1">Source: {alt.merchantSource}</p>}
            {alt.pros && alt.pros.length > 0 && (
              <ul className="mt-2 space-y-1">
                {alt.pros.map((pro, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-xs text-slate-300"
                    style={{ animation: "fadeUp 0.25s ease-out both", animationDelay: `${300 + i * 60 + j * 35}ms`, opacity: 0 }}>
                    <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-dm-success/60" />
                    {pro}
                  </li>
                ))}
              </ul>
            )}
            {alt.url && (
              <a href={alt.url} rel="noopener noreferrer"
                className="inline-block text-xs text-slate-500 hover:text-dm-accent mt-2 hover:underline transition-colors">
                View pricing →
              </a>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Negotiation & tips
// ---------------------------------------------------------------------------

export function NegotiationSection({ insights }: { insights: Insights }) {
  const { negotiation, alreadyGoodDeal } = insights;
  if (!negotiation) return null;
  return (
    <Card delay={300} className="space-y-3">
      <SectionLabel>{alreadyGoodDeal ? "Buying tips" : "Negotiation & tips"}</SectionLabel>

      {!alreadyGoodDeal && negotiation.recommendedOffer != null && (
        <div className="flex items-baseline gap-2 rounded-lg bg-dm-accent/10 border border-dm-accent/20 px-3 py-2"
          style={{ animation: "scaleIn 0.22s ease-out 0.35s both", opacity: 0 }}>
          <span className="text-xs text-slate-400">Suggested offer</span>
          <span className="text-lg font-bold text-dm-accent">
            {negotiation.currency} {negotiation.recommendedOffer.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}

      <p className="text-sm text-slate-300 leading-relaxed">{negotiation.summary}</p>

      {negotiation.tips && negotiation.tips.length > 0 && (
        <ul className="space-y-1.5">
          {negotiation.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300"
              style={{ animation: "fadeUp 0.28s ease-out both", animationDelay: `${320 + i * 45}ms`, opacity: 0 }}>
              <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-dm-accent/60" />
              {tip}
            </li>
          ))}
        </ul>
      )}

      {negotiation.messageTemplate && (
        <CopyButton
          text={negotiation.messageTemplate}
          label={alreadyGoodDeal ? "Copy message to sales" : "Copy negotiation message"}
        />
      )}
    </Card>
  );
}
