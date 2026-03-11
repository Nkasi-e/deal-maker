export type PageType = "product" | "saas" | "marketplace" | "unknown";

/**
 * High-level intent mode derived from the page type and host signals.
 * Drives the overlay's visual theme, section ordering, and CTA language.
 *
 * - "negotiate"  → peer-to-peer or quote-based marketplace (eBay, Alibaba, Etsy "Make Offer")
 * - "compare"    → fixed-price e-commerce product page (Amazon, Walmart, Shopify stores …)
 * - "subscribe"  → SaaS / subscription pricing page (Notion, Slack, Linear …)
 */
export type DealMode = "negotiate" | "compare" | "subscribe";

export interface DetectedPrice {
  amount: number;
  currency: string;
  rawText: string;
  elementXPath?: string;
}

export interface DetectedContext {
  pageType: PageType;
  /** Resolved deal mode — drives overlay theme + section ordering */
  dealMode: DealMode;
  title: string;
  vendor?: string;
  url: string;
  prices: DetectedPrice[];
  negotiationSignals: string[];
  /** Inferred unit e.g. "per seat/month" for SaaS */
  priceContext?: string;
  /** False on listing / category / search pages — we only analyse single product pages */
  isProductDetailPage?: boolean;
  /** True only when SaaS page is an actual pricing/plans page */
  isSaasPricingPage?: boolean;
  /** Parsed SaaS plans when pricing table/cards are detected */
  saasPlans?: SaaSPlan[];
}

export interface SaaSPlan {
  name: string;
  price: number;
  currency: string;
  billingInterval?: string;
  features?: string[];
}

export interface BestPriceInsight {
  source: string;
  amount: number;
  currency: string;
  url?: string;
}

export interface NegotiationSuggestion {
  /** The suggested opening offer — always <= current price */
  recommendedOffer: number | null;
  /** AI-estimated fair market benchmark price for this product */
  marketBenchmark: number | null;
  currency: string;
  confidence: "low" | "medium" | "high";
  summary: string;
  messageTemplate: string;
  /** Generic tips (e.g. "Ask for annual discount") when no make-offer */
  tips?: string[];
}

/** Similar product/service with better or comparable pricing (AI-suggested) */
export interface AlternativeProduct {
  name: string;
  priceInfo: string;
  url?: string;
  merchantSource?: string;
  /** One-line headline reason to consider */
  whyConsider: string;
  /** 2–3 short bullet pros */
  pros?: string[];
}

export interface DealInsights {
  detected: DetectedContext;
  bestPrice?: BestPriceInsight | null;
  potentialSavings?: number | null;
  negotiation?: NegotiationSuggestion | null;
  /** Similar products with better or comparable pricing */
  alternatives?: AlternativeProduct[] | null;
  /** True when vendor price is already at or below market benchmark */
  alreadyGoodDeal?: boolean;
}

export type PriceDetectionMessage =
  | {
      type: "PRICE_DETECTED";
      payload: DetectedContext;
    }
  | {
      type: "REQUEST_REFRESH";
    };

export type BackgroundToContentMessage =
  | {
      type: "INSIGHTS_READY";
      payload: DealInsights;
    }
  | {
      type: "INSIGHTS_ERROR";
      error: string;
    };
