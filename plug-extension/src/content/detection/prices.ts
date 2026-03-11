import type { DetectedPrice } from "../../types/pricing";
import { EXPLICIT_PRICE_REGEX, extractPriceMatches, inferCurrency } from "./signals";

// ---------------------------------------------------------------------------
// Primary price — 5-layer priority chain (platform-agnostic)
// ---------------------------------------------------------------------------

/**
 * Returns the single most-trustworthy price for the current product.
 * Priority: Schema.org JSON-LD → HTML Microdata → OpenGraph meta →
 *           data-* attributes → DOM proximity to Add-to-Cart button.
 */
export function extractPrimaryPrice(): DetectedPrice | null {
  const host = window.location.hostname.toLowerCase();

  // Amazon: prefer the main Buy Box price near the corePriceDisplay block
  if (host.includes("amazon.")) {
    const priceEl = document.querySelector(
      "#corePriceDisplay_desktop_feature_div .a-price .a-offscreen, " +
      "#priceblock_ourprice, #priceblock_dealprice, #priceblock_saleprice",
    ) as HTMLElement | null;

    if (priceEl) {
      const raw = priceEl.innerText?.trim() ?? "";
      const m = new RegExp(EXPLICIT_PRICE_REGEX.source, "i").exec(raw);
      if (m) {
        const amount = parseFloat(m[1].replace(/,/g, ""));
        if (!Number.isNaN(amount) && amount > 0) {
          const currency = inferCurrency(m[0], "");
          return { amount, currency, rawText: m[0].trim() };
        }
      }
    }
  }

  const currentPath = window.location.pathname;
  const currentTitle = (document.querySelector("h1")?.textContent ?? document.title ?? "")
    .toLowerCase()
    .slice(0, 60);

  // 1. Schema.org JSON-LD ─────────────────────────────────────────────────────
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  let bestPrice: DetectedPrice | null = null;
  let bestScore = -1;

  for (const s of Array.from(scripts)) {
    try {
      const data = JSON.parse(s.textContent ?? "");
      const nodes: Record<string, unknown>[] = Array.isArray(data["@graph"])
        ? (data["@graph"] as Record<string, unknown>[])
        : [data];

      for (const node of nodes) {
        if (node["@type"] !== "Product") continue;
        const raw = node["offers"] as Record<string, unknown> | Record<string, unknown>[] | undefined;
        if (!raw) continue;
        const offer = Array.isArray(raw) ? raw[0] : raw;
        const price = parseFloat(String(offer["price"] ?? "").replace(/,/g, ""));
        const currency = String(offer["priceCurrency"] ?? "USD");
        if (Number.isNaN(price) || price <= 0 || price >= 1e7) continue;

        let score = 0;
        const nodeUrl = String(node["url"] ?? node["@id"] ?? "");
        if (nodeUrl && nodeUrl.includes(currentPath)) score += 10;
        const nodeName = String(node["name"] ?? "").toLowerCase();
        if (currentTitle && nodeName) {
          const hits = currentTitle.split(" ").filter((w) => w.length > 3 && nodeName.includes(w));
          score += hits.length > 0 ? 5 : 0;
        }
        if (String(offer["availability"] ?? "").toLowerCase().includes("instock")) score += 3;
        if (score > bestScore) { bestScore = score; bestPrice = { amount: price, currency, rawText: `${currency} ${price}` }; }
      }
    } catch { /* ignore */ }
  }
  if (bestPrice) return bestPrice;

  // 2. HTML Microdata ──────────────────────────────────────────────────────────
  const microdataEl = document.querySelector('[itemprop="price"]');
  if (microdataEl) {
    const raw = microdataEl.getAttribute("content")
      ?? microdataEl.getAttribute("data-price")
      ?? (microdataEl as HTMLElement).innerText;
    const price = parseFloat(raw.replace(/[^0-9.]/g, ""));
    const curEl = document.querySelector('[itemprop="priceCurrency"]');
    const currency = curEl?.getAttribute("content") ?? "USD";
    if (!Number.isNaN(price) && price > 0) return { amount: price, currency, rawText: `${currency} ${price}` };
  }

  // 3. OpenGraph / meta product tags ──────────────────────────────────────────
  const ogPrice = document.querySelector(
    'meta[property="og:price:amount"], meta[property="product:price:amount"]',
  );
  if (ogPrice) {
    const price = parseFloat((ogPrice as HTMLMetaElement).content?.replace(/,/g, "") ?? "");
    const curMeta = document.querySelector(
      'meta[property="og:price:currency"], meta[property="product:price:currency"]',
    );
    const currency = (curMeta as HTMLMetaElement)?.content ?? "USD";
    if (!Number.isNaN(price) && price > 0) return { amount: price, currency, rawText: `${currency} ${price}` };
  }

  // 4. data-* price attributes ─────────────────────────────────────────────────
  for (const sel of ["[data-price]", "[data-product-price]", "[data-sale-price]", "[data-regular-price]", "[data-current-price]"]) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const raw = el.getAttribute(sel.replace(/[\[\]]/g, "")) ?? "";
    let price = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (price > 10000 && !raw.includes(".")) price /= 100; // Shopify stores price in cents
    if (!Number.isNaN(price) && price > 0 && price < 1e7) return { amount: price, currency: "USD", rawText: `$${price}` };
  }

  // 5. DOM proximity to Add-to-Cart button ────────────────────────────────────
  const cartBtn = document.querySelector(
    'button[id*="cart" i], button[class*="cart" i], button[class*="buy" i], ' +
    '[id*="add-to-cart" i], [id*="addtocart" i], [id*="buy-now" i]',
  );
  if (cartBtn) {
    let container: Element | null = cartBtn;
    for (let i = 0; i < 8 && container; i++) {
      container = container.parentElement;
      const priceEl = container?.querySelector('[class*="price" i], [id*="price" i], [itemprop="price"]');
      if (priceEl) {
        const t = (priceEl as HTMLElement).innerText?.trim() ?? "";
        const m = new RegExp(EXPLICIT_PRICE_REGEX.source, "gi").exec(t);
        if (m) {
          const price = parseFloat(m[1].replace(/,/g, ""));
          const currency = inferCurrency(m[0], "");
          if (!Number.isNaN(price) && price > 0) return { amount: price, currency, rawText: m[0].trim() };
        }
        break;
      }
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Full price scan — collects ALL currency-prefixed prices on the page
// ---------------------------------------------------------------------------

export function extractAllPrices(): DetectedPrice[] {
  const prices: DetectedPrice[] = [];
  const seen = new Set<string>();

  // Line-by-line innerText scan — reassembles split-DOM prices (Amazon, etc.)
  for (const line of (document.body?.innerText ?? "").split(/\n+/)) {
    const t = line.trim();
    if (t.length >= 2 && t.length <= 300) extractPriceMatches(t, seen, prices);
  }

  // Targeted selector scan for SPAs and framework stores
  const selectors = [
    "[data-price]", "[data-product-price]", "[data-sale-price]",
    "[itemprop='price']", "[class*='price']", "[class*='Price']",
    "[class*='amount']", "[class*='Amount']", "[id*='price' i]",
    "ins .amount", ".woocommerce-Price-amount",
  ];
  for (const sel of selectors) {
    try {
      document.querySelectorAll(sel).forEach((el) => {
        const content = el.getAttribute("content") ?? el.getAttribute("data-price") ?? "";
        if (content) {
          const withCurrency = content.includes("$") || /[€£¥₹₩₦]/.test(content) ? content : `$${content}`;
          extractPriceMatches(withCurrency, seen, prices);
        }
        const t = (el as HTMLElement).innerText?.trim() ?? "";
        if (t && t.length <= 200) extractPriceMatches(t, seen, prices);
      });
    } catch { /* ignore */ }
  }

  return prices.sort((a, b) => a.amount - b.amount);
}

// ---------------------------------------------------------------------------
// Noise filter — keep only plausible product prices around the primary anchor
// ---------------------------------------------------------------------------

/**
 * Filters all detected prices to just the ones plausibly belonging to the
 * main product (40%–200% of anchor).  Discards accessories, shipping, etc.
 */
export function selectProductPrices(
  all: DetectedPrice[],
  primary: DetectedPrice | null,
): DetectedPrice[] {
  if (all.length === 0) return primary ? [primary] : [];

  const anchor = primary ?? (() => {
    const candidates = all.filter((p) => p.amount >= 5).sort((a, b) => a.amount - b.amount);
    return candidates[Math.floor(candidates.length / 2)] ?? all[all.length - 1];
  })();

  const inRange = all.filter((p) => p.amount >= anchor.amount * 0.4 && p.amount <= anchor.amount * 2.0);
  const rest = inRange.filter((p) => p.amount !== anchor.amount).sort((a, b) => a.amount - b.amount);
  return [anchor, ...rest].slice(0, 4);
}
