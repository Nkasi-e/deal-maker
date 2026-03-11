// ---------------------------------------------------------------------------
// Page metadata extraction — title and vendor
// ---------------------------------------------------------------------------

const SITE_SUFFIX_PATTERN =
  /\s*[\|:–—-]\s*(Amazon|eBay|Etsy|Walmart|Target|Best Buy|Newegg|Shopify)[\s\S]*$/i;

/**
 * Extracts the product / page title using a reliable priority chain:
 * Schema.org Product.name → H1 → document.title (stripped) → og:title (last resort).
 *
 * We avoid og:title as primary because on Amazon and similar sites it can be
 * set to unrelated things ("Chat history", nav labels, etc.).
 */
export function inferTitle(): string {
  const host = window.location.hostname.toLowerCase();

  // Amazon: trust the explicit productTitle element first
  if (host.includes("amazon.")) {
    const t = document.getElementById("productTitle")?.textContent?.trim();
    if (t) return t;
  }

  // 1. Schema.org Product.name
  for (const s of Array.from(document.querySelectorAll('script[type="application/ld+json"]'))) {
    try {
      const d = JSON.parse(s.textContent ?? "");
      const nodes = Array.isArray(d["@graph"]) ? d["@graph"] : [d];
      for (const n of nodes as Record<string, unknown>[]) {
        if (n["@type"] === "Product" && typeof n["name"] === "string" && (n["name"] as string).length > 3) {
          return (n["name"] as string).trim();
        }
      }
    } catch { /* ignore */ }
  }

  // 2. Single H1 (almost always the product name on detail pages)
  const h1 = document.querySelector("h1")?.textContent?.trim();
  if (h1) return h1;

  // 3. document.title — strip site-name suffixes
  const cleaned = document.title.replace(SITE_SUFFIX_PATTERN, "").trim();
  if (cleaned) return cleaned;

  // 4. og:title as last resort
  const ogTitle = document.querySelector('meta[property="og:title"]');
  return (ogTitle as HTMLMetaElement)?.content?.trim() || "Untitled";
}

/**
 * Returns the vendor / site name.
 * Prefers og:site_name; falls back to a readable domain name.
 */
export function inferVendor(): string | undefined {
  const og = document.querySelector('meta[property="og:site_name"]');
  if (og) return (og as HTMLMetaElement).content?.trim() || undefined;

  const domain = window.location.hostname.replace(/^www\./, "");
  return domain.split(".").slice(-2).join(".");
}
