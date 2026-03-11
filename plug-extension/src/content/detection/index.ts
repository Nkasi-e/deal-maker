import type { DetectedContext, DetectedPrice, PageType } from "../../types/pricing";
import { getPageText, findSignals, PRODUCT_SIGNALS, SAAS_SIGNALS, NEGOTIATION_SIGNALS, WEAK_NEGOTIATION_SIGNALS } from "./signals";
import { extractPrimaryPrice, extractAllPrices, selectProductPrices } from "./prices";
import { FIXED_PRICE_RETAILER_HOSTS, SEARCH_LIKE_HOSTS, isKnownMarketplaceHost, isMarketplaceListing, isProductDetailPage, resolveDealMode } from "./page-type";
import { inferBillingInterval, isLikelySaasPricingPage, extractSaasPlans } from "./saas";
import { inferTitle, inferVendor } from "./metadata";

// ---------------------------------------------------------------------------
// Page context detection (orchestrator)
// ---------------------------------------------------------------------------

export function detectPageContext(): DetectedContext {
  const host = window.location.hostname.toLowerCase();
  const pathname = window.location.pathname;
  const text = getPageText();

  // Collect signals
  const productSignals = findSignals(text, PRODUCT_SIGNALS);
  const saasSignals = findSignals(text, SAAS_SIGNALS);
  let strongNeg = findSignals(text, NEGOTIATION_SIGNALS);
  const weakNeg = findSignals(text, WEAK_NEGOTIATION_SIGNALS);

  // Suppress negotiation signals on fixed-price retailers (unless it's a used/marketplace URL)
  const isFixedPriceRetailer = FIXED_PRICE_RETAILER_HOSTS.some((h) => host.includes(h));
  if (isFixedPriceRetailer && !isMarketplaceListing(pathname)) strongNeg = [];

  const negotiationSignals = strongNeg.length > 0 ? [...strongNeg, ...weakNeg] : strongNeg;

  // Classify page type
  const isSaasPricingPage = isLikelySaasPricingPage(text);
  const saasPlans = isSaasPricingPage ? extractSaasPlans() : [];
  const onKnownMarketplace = isKnownMarketplaceHost();

  let pageType: PageType = "unknown";
  if (strongNeg.length > 0 || onKnownMarketplace) pageType = "marketplace";
  else if (productSignals.length > 0) pageType = "product";
  // For known SaaS hosts like ChatGPT/Slack, the path/hash + host/title are
  // enough to treat `/.../pricing` (or `#pricing`) as a SaaS pricing page even
  // if the body text doesn't yet contain many \"plans\" keywords.
  else if (isSaasPricingPage || saasSignals.length > 0) pageType = "saas";

  const isOnDetailPage =
    pageType === "product" || pageType === "marketplace"
      ? isProductDetailPage()
      : true; // SaaS pricing page is always the target page

  // Extract prices
  let prices: DetectedPrice[];
  if (pageType === "saas") {
    const all = extractAllPrices();
    const paid = all.filter((p) => p.amount >= 3);
    const free = all.filter((p) => p.amount < 3);
    if (saasPlans.length > 0) {
      const planPrices: DetectedPrice[] = saasPlans.map((plan) => ({
        amount: plan.price,
        currency: plan.currency,
        rawText: `${plan.currency} ${plan.price}`,
      }));
      prices = [...planPrices, ...paid].slice(0, 8);
    } else {
      prices = [...paid, ...free].slice(0, 8);
    }
  } else if (pageType === "product" || pageType === "marketplace") {
    prices = selectProductPrices(extractAllPrices(), extractPrimaryPrice());
  } else {
    prices = extractAllPrices().slice(0, 6);
  }

  return {
    pageType,
    dealMode: resolveDealMode(pageType, onKnownMarketplace),
    title: inferTitle().slice(0, 200),
    vendor: inferVendor(),
    url: window.location.href,
    prices,
    negotiationSignals,
    priceContext: pageType === "saas" ? inferBillingInterval(text) : undefined,
    isProductDetailPage: isOnDetailPage,
    isSaasPricingPage,
    saasPlans,
  };
}

// ---------------------------------------------------------------------------
// Gate — decides whether to show the DealMaker panel on this page
// ---------------------------------------------------------------------------

export function shouldShowDealMaker(context: DetectedContext): boolean {
  const host = window.location.hostname.toLowerCase();

  // Never auto-pop on search engines or news portals
  if (SEARCH_LIKE_HOSTS.some((h) => host.includes(h))) return false;

  if (context.pageType === "saas") return context.isSaasPricingPage === true;

  if (context.pageType === "product" || context.pageType === "marketplace") {
    if (!context.isProductDetailPage) return false;
    return context.prices.length > 0 || context.negotiationSignals.length > 0;
  }

  return false;
}

// Re-export commonly used detection utilities so callers only import from this index
export { inferVendor, inferTitle } from "./metadata";
export { isLikelySaasPricingPage } from "./saas";
export { isProductDetailPage } from "./page-type";
