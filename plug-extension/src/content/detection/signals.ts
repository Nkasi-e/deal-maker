import type { DetectedPrice } from "../../types/pricing";

// ---------------------------------------------------------------------------
// Keyword signal lists
// ---------------------------------------------------------------------------

export const PRODUCT_SIGNALS = [
  "add to cart", "add to bag", "buy now", "purchase",
  "checkout", "add to basket", "buy it now", "add to wishlist",
  "add to trolley", "proceed to checkout",
];

export const SAAS_SIGNALS = [
  "pricing", "plans", "per user", "per seat", "monthly", "annual", "yearly",
  "subscribe", "start free trial", "get started", "/month", "/year",
  "per month", "per year", "seats", "workspace",
];

// Require explicit "Make Offer" mechanics — not just contact text
export const NEGOTIATION_SIGNALS = [
  "make offer", "make an offer", "best offer", "or best offer",
  "obo", "send offer", "submit offer",
  "request quote", "rfq", "request for quote",
  "get a quote", "request pricing", "custom quote", "negotiate",
];

// Present on most standard e-commerce pages — never sufficient alone
export const WEAK_NEGOTIATION_SIGNALS = [
  "contact seller", "contact for price", "call for price",
];

// ---------------------------------------------------------------------------
// Currency support  (includes ₦ NGN — Nigerian Naira)
// ---------------------------------------------------------------------------

export const CURRENCY_SYMBOLS: Record<string, string> = {
  "$": "USD",  "€": "EUR",  "£": "GBP",  "¥": "JPY",
  "₹": "INR",  "₩": "KRW",  "R$": "BRL", "A$": "AUD", "C$": "CAD",
  "₦": "NGN",
  "CHF": "CHF", "SEK": "SEK", "NOK": "NOK", "DKK": "DKK",
  "zł": "PLN",  "₺": "TRY",  "د.إ": "AED",
};

// Only match prices that carry an explicit currency prefix — no bare numbers
export const EXPLICIT_PRICE_REGEX =
  /(?:[$€£¥₹₩₦]|R\$|A\$|C\$|CHF|SEK|NOK|DKK|zł|₺|USD|EUR|GBP|JPY|INR|KRW|NGN)\s*([\d,]+(?:\.\d{1,2})?)/gi;

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export function getPageText(): string {
  return `${document.title ?? ""}\n${document.body?.innerText ?? ""}`.toLowerCase();
}

export function findSignals(text: string, signals: string[]): string[] {
  return signals.filter((s) => text.includes(s));
}

export function inferCurrency(raw: string, before: string): string {
  for (const [sym, code] of Object.entries(CURRENCY_SYMBOLS)) {
    if (raw.startsWith(sym) || before.endsWith(sym) || raw.includes(code)) return code;
  }
  return "USD";
}

export function extractPriceMatches(
  text: string,
  seen: Set<string>,
  out: DetectedPrice[],
): void {
  const regex = new RegExp(EXPLICIT_PRICE_REGEX.source, "gi");
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[0].trim();
    const amount = parseFloat(m[1].replace(/,/g, ""));
    if (Number.isNaN(amount) || amount < 0 || amount > 1e7) continue;
    const before = text.slice(Math.max(0, m.index - 3), m.index);
    const currency = inferCurrency(raw, before);
    const key = `${amount}-${currency}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ amount, currency, rawText: raw });
  }
}
