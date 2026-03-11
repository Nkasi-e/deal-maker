import type { DealMode, PageType } from "../../types/pricing";

// ---------------------------------------------------------------------------
// Host classifications
// ---------------------------------------------------------------------------

export const FIXED_PRICE_RETAILER_HOSTS = [
  "amazon.", "walmart.", "target.", "bestbuy.", "costco.", "homedepot.", "lowes.",
  "apple.", "dell.", "hp.", "lenovo.", "samsung.", "lg.", "sony.", "microsoft.",
  "officedepot.", "staples.", "macys.", "nordstrom.", "gap.", "hm.", "zara.",
  "ikea.", "wayfair.", "overstock.", "newegg.", "bhphotovideo.",
];

export const KNOWN_MARKETPLACE_HOSTS = [
  // Consumer C2C / resale
  "ebay.", "etsy.", "poshmark.", "mercari.", "depop.", "vinted.",
  "offerup.", "letgo.", "wallapop.", "shpock.", "craigslist.", "gumtree.",
  // Fashion / sneakers / luxury
  "stockx.", "goat.", "grailed.", "vestiaire.", "tradesy.", "thredup.", "therealreal.",
  // Home / collectibles
  "chairish.", "rubylane.", "bonanza.", "1stdibs.",
  // Music / audio
  "reverb.", "discogs.",
  // B2B / wholesale / quote-based
  "alibaba.", "aliexpress.", "1688.", "made-in-china.", "globalsources.",
  "thomasnet.", "indiamart.", "tradekey.",
  // Social commerce
  "facebook.com/marketplace",
];

export const SEARCH_LIKE_HOSTS = [
  "google.", "bing.", "duckduckgo.", "yahoo.", "baidu.", "yandex.",
  "ecosia.", "ask.com", "aol.", "naver.", "seznam.",
];

// ---------------------------------------------------------------------------
// Host helpers
// ---------------------------------------------------------------------------

export function isKnownMarketplaceHost(): boolean {
  const h = window.location.hostname.toLowerCase() + window.location.pathname.toLowerCase();
  return KNOWN_MARKETPLACE_HOSTS.some((m) => h.includes(m));
}

export function isMarketplaceListing(pathname: string): boolean {
  return /\/(used|offer-listing|offers|merchant|marketplace|listing)\//i.test(pathname);
}

export function resolveDealMode(pageType: PageType, isMarketplace: boolean): DealMode {
  if (pageType === "saas") return "subscribe";
  if (pageType === "marketplace" || isMarketplace) return "negotiate";
  return "compare";
}

// ---------------------------------------------------------------------------
// Single product detail page detection
// ---------------------------------------------------------------------------

const LISTING_PATTERNS = [
  /\/categor/i, /\/categories/i, /\/collection/i, /\/catalog/i,
  /\/search/i, /\/shop\/?$/i, /\/store\/?$/i, /\/browse/i,
  /\/list\b/i, /\/tag\//i, /\/brand\//i, /\/department/i,
  /\/bestseller/i, /\/new-arrivals/i, /\/sale\/?$/i, /\/deals\/?$/i,
  /\?q=/i, /\?s=/i, /\?search/i, /\?query/i, /\?keyword/i,
  /\?cat=/i, /\?category=/i,
];

const DETAIL_URL_PATTERNS: RegExp[] = [
  /\/dp\/[A-Z0-9]{5,}/,                  // Amazon
  /\/gp\/product\/[A-Z0-9]{5,}/,
  /\/itm\/\d+/i,                          // eBay
  /\/i\.\w+\.\d+/i,
  /\/listing\/\d+/i,                      // Etsy
  /\/ip\/[^/]+\/\d+/i,                    // Walmart
  /\/\d+\.p\b/i,                          // Best Buy
  /\/p\/[A-Z0-9]{2}-\d+-/i,              // Newegg
  /\/p\/[^/]+-\/-\/A-\d+/i,             // Target
  /\/item\/\d+/i,                         // AliExpress / Alibaba
  /\/prd\/\d+/i,                          // ASOS
  /\/products\/[^/\s?#]+$/i,             // Shopify
  /\/product\/[^/\s?#]+\/?$/i,           // WooCommerce
  /\/p\/[a-z0-9][a-z0-9-]{1,}/i,        // Generic
  /\/product-detail\//i,
  /\/product_detail\//i,
  /\/item-detail\//i,
  /\/buy\//i,
  /\/detail\//i,
  /\/goods\/\d+/i,                        // Asian e-commerce
  /\/sku\/[^/]+/i,
  /\/pd\/[^/]+/i,
];

const HOST_DETAIL_HINTS: Record<string, RegExp> = {
  "walmart.com": /\/ip\//i,
  "target.com": /\/p\//i,
  "bestbuy.com": /\.p\b/i,
  "newegg.com": /\/p\//i,
  "costco.com": /\/p\//i,
};

/**
 * Returns true only when the current page is a single product detail page —
 * not a listing, search, or category page.  Covers 20+ platforms.
 */
export function isProductDetailPage(): boolean {
  const pathname = window.location.pathname;        // preserve case — ASINs are uppercase
  const pathLower = pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const host = window.location.hostname.toLowerCase();

  // Early exit: listing / search / category
  if (LISTING_PATTERNS.some((p) => p.test(pathLower) || p.test(search))) return false;

  // Strong URL match
  if (DETAIL_URL_PATTERNS.some((p) => p.test(pathname))) {
    // On Amazon, also require the core product title + price to be present to
    // avoid triggering on intermediate/redirect states.
    if (host.includes("amazon.")) {
      const hasTitle = !!document.getElementById("productTitle");
      const hasMainPrice = !!document.querySelector(
        "#corePriceDisplay_desktop_feature_div .a-price .a-offscreen, " +
        "#priceblock_ourprice, #priceblock_dealprice, #priceblock_saleprice",
      );
      if (!hasTitle || !hasMainPrice) return false;
    }
    return true;
  }

  // Structured data signals
  let hasSchemaProduct = false;
  for (const s of Array.from(document.querySelectorAll('script[type="application/ld+json"]'))) {
    try {
      const data = JSON.parse(s.textContent ?? "");
      const nodes = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
      if (nodes.some((n: Record<string, unknown>) => n["@type"] === "Product")) { hasSchemaProduct = true; break; }
    } catch { /* ignore */ }
  }
  const hasMicrodataProduct = !!document.querySelector('[itemtype*="schema.org/Product"]');
  const ogType = document.querySelector('meta[property="og:type"]');
  const hasOgProduct = !!(ogType && (ogType as HTMLMetaElement).content?.toLowerCase().includes("product"));

  // DOM heuristics: single H1 + cart button + price element + hero image
  const h1Count = document.querySelectorAll("h1").length;
  const hasCartBtn = !!document.querySelector(
    'button[id*="cart" i], button[class*="cart" i], button[class*="buy" i], [id*="add-to-cart" i], [id*="addtocart" i]',
  );
  const hasPriceEl = !!document.querySelector('[itemprop="price"], [class*="price" i], [id*="price" i]');
  const hasPrimaryImage = !!document.querySelector(
    'img[id*="main" i], img[class*="hero" i], img[class*="product" i], [data-testid*="hero" i] img',
  );
  if (h1Count === 1 && hasCartBtn && hasPriceEl && hasPrimaryImage) return true;

  // Reject listing-like grid layouts
  const cardCount = document.querySelectorAll(
    "[class*='product-card' i], [class*='product-tile' i], [data-testid*='product-card' i], [class*='grid-item' i]",
  ).length;
  if (cardCount >= 6) return false;

  // Metadata fallback with some corroboration
  if ((hasSchemaProduct || hasMicrodataProduct || hasOgProduct) && (h1Count === 1 || hasCartBtn)) return true;

  // Host-specific URL hints
  for (const [h, re] of Object.entries(HOST_DETAIL_HINTS)) {
    if (host.includes(h) && re.test(pathLower)) return true;
  }

  return false;
}
