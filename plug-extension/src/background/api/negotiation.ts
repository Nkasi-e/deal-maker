import type { DetectedContext, NegotiationSuggestion } from "../../types/pricing";
import { getEffectiveKeys, callWithFallback } from "./client";

const SYSTEM_PROMPT = "You are DealMaker. Respond only with valid JSON. The recommendedOffer must always be strictly less than the current listed price.";

// ---------------------------------------------------------------------------
// Marketplace "Make Offer" negotiation
// ---------------------------------------------------------------------------

/**
 * For pages with explicit "Make Offer" / "Best Offer" mechanics.
 * Returns a suggested opening offer that is always < currentPrice.
 */
export async function fetchNegotiationSuggestion(
  detected: DetectedContext,
): Promise<NegotiationSuggestion | null> {
  if (!detected.negotiationSignals.length || !detected.prices.length) return null;

  const primary = detected.prices[0];
  const currentPrice = primary.amount;
  const fallbackOffer = Math.round(currentPrice * 0.9);

  const fallback: NegotiationSuggestion = {
    recommendedOffer: fallbackOffer,
    marketBenchmark: Math.round(currentPrice * 0.88),
    currency: primary.currency,
    confidence: "medium",
    summary: "Opening 10–20% below list price is typical for this type of listing.",
    messageTemplate: `Hi – I'm interested in "${detected.title}" but my budget is ${primary.currency} ${fallbackOffer.toLocaleString()}. Would you consider that?`,
  };

  const { openaiApiKey, openrouterApiKey, openrouterModel } = await getEffectiveKeys();
  if (!openrouterApiKey && !openaiApiKey) return fallback;

  const prompt = `You are a negotiation assistant helping a buyer get the best price.

Page type: ${detected.pageType}
Product/Listing: ${detected.title}
Vendor: ${detected.vendor ?? "Unknown"}
Listed price(s): ${detected.prices.map((p) => `${p.amount} ${p.currency}`).join(", ")}
Negotiation signals on page: ${detected.negotiationSignals.join(", ") || "none"}

Tasks:
1. Estimate the fair market benchmark price for this item.
2. Suggest an aggressive but realistic opening offer that aims for 5–10% below the listed price (${currentPrice} ${primary.currency}). The offer MUST be LESS than the listed price.
3. Write a short copy-ready buyer message.

Return JSON:
{
  "recommendedOffer": number (must be < ${currentPrice}),
  "marketBenchmark": number,
  "currency": "${primary.currency}",
  "confidence": "low"|"medium"|"high",
  "summary": "2–3 sentences explaining the logic",
  "messageTemplate": "Short copy-paste buyer message"
}`;

  const result = await callWithFallback<NegotiationSuggestion>(
    openrouterApiKey, openrouterModel, openaiApiKey, SYSTEM_PROMPT, prompt,
  );
  return result ?? fallback;
}

// ---------------------------------------------------------------------------
// Deal tips for product / SaaS pages (no Make Offer mechanics)
// ---------------------------------------------------------------------------

/**
 * Generates practical tips to get a better price on any product or SaaS page,
 * including a market benchmark and a copy-paste outreach message.
 */
export async function fetchNegotiationTipsForProduct(
  detected: DetectedContext,
): Promise<NegotiationSuggestion | null> {
  const { openaiApiKey, openrouterApiKey, openrouterModel } = await getEffectiveKeys();
  if ((!openrouterApiKey && !openaiApiKey) || !detected.prices.length) return null;

  const primary = detected.prices[0];
  let hostname = "";
  try { hostname = new URL(detected.url).hostname.replace(/^www\./, ""); } catch { /* ignore */ }

  const pricesStr = detected.prices
    .filter((p) => p.amount > 0)
    .slice(0, 6)
    .map((p) => `${p.currency} ${p.amount}${detected.priceContext ? ` ${detected.priceContext}` : ""}`)
    .join(", ");

  const prompt = `This is a ${detected.pageType} page. The user wants to know if they can get a better deal.

Product/Service: ${detected.title}
Website: ${hostname}
Vendor: ${detected.vendor ?? "Unknown"}
Plan prices on page: ${pricesStr || "unknown"}

Tasks:
1. Estimate the fair market benchmark price for the entry plan / this product.
2. Suggest 2–4 practical tips to get a better price (e.g. "Ask for annual billing", "Mention competitor X").
3. Write a short copy-paste outreach message to sales/support.

Return JSON:
{
  "recommendedOffer": null,
  "marketBenchmark": number,
  "currency": "${primary.currency}",
  "confidence": "medium",
  "summary": "One sentence on the pricing landscape.",
  "messageTemplate": "Short copy-paste message.",
  "tips": ["tip1", "tip2", "tip3"]
}`;

  return callWithFallback<NegotiationSuggestion>(
    openrouterApiKey, openrouterModel, openaiApiKey, "You are DealMaker. Respond only with valid JSON.", prompt,
  );
}
