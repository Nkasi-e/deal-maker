import type { DetectedContext, DealInsights } from "../../types/pricing";
import { fetchBestPrice } from "./best-price";
import { fetchNegotiationSuggestion, fetchNegotiationTipsForProduct } from "./negotiation";
import { fetchAlternatives } from "./alternatives";

// ---------------------------------------------------------------------------
// Deal insights orchestrator
// ---------------------------------------------------------------------------

/**
 * Fires all API calls in parallel, post-processes the negotiation offer to
 * enforce the 5–12% savings band, and detects "already a good deal".
 */
export async function buildDealInsights(detected: DetectedContext): Promise<DealInsights> {
  const [bestPrice, negotiationMakeOffer, alternatives] = await Promise.all([
    fetchBestPrice(detected),
    fetchNegotiationSuggestion(detected),
    fetchAlternatives(detected),
  ]);

  // Use make-offer suggestion on marketplace pages; fall back to deal tips elsewhere
  let negotiation = negotiationMakeOffer;
  if (!negotiation && detected.prices.length > 0) {
    negotiation = await fetchNegotiationTipsForProduct(detected);
  }

  const currentPrice = detected.prices[0]?.amount ?? null;

  // Hard caps: recommendedOffer must NEVER exceed currentPrice (5–12% savings band)
  if (negotiation?.recommendedOffer != null && currentPrice != null) {
    let offer = negotiation.recommendedOffer;
    if (offer >= currentPrice) offer = currentPrice * 0.95;
    offer = Math.min(offer, currentPrice * 0.95); // 5% savings floor
    offer = Math.max(offer, currentPrice * 0.88); // 12% savings ceiling
    negotiation = { ...negotiation, recommendedOffer: Math.round(offer) };
  }

  // Detect "already a good deal" — vendor price at or below market benchmark
  const benchmark = negotiation?.marketBenchmark ?? null;
  const alreadyGoodDeal = benchmark != null && currentPrice != null && benchmark >= currentPrice;

  // Suppress the offer when it's already a good deal (keep tips)
  if (alreadyGoodDeal && negotiation) {
    negotiation = { ...negotiation, recommendedOffer: null };
  }

  // Potential savings from the best-price comparison
  let potentialSavings: number | null = null;
  if (bestPrice && detected.prices[0] && bestPrice.currency === detected.prices[0].currency) {
    potentialSavings = Math.max(0, detected.prices[0].amount - bestPrice.amount);
  }

  return {
    detected,
    bestPrice: alreadyGoodDeal ? null : bestPrice,
    potentialSavings: alreadyGoodDeal ? null : potentialSavings,
    negotiation,
    alternatives: alternatives ?? null,
    alreadyGoodDeal,
  };
}
