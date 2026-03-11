import type { BestPriceInsight, DetectedContext } from "../../types/pricing";
import { getEffectiveKeys } from "./client";

const SERPAPI_ENDPOINT = "https://serpapi.com/search.json";

interface SerpShoppingResult {
  title?: string;
  price?: string;
  extracted_price?: number;
  source?: string;
  link?: string;
}

interface SerpApiResponse {
  shopping_results?: SerpShoppingResult[];
  error?: string;
}

const CURRENCY_TO_COUNTRY: Record<string, string> = {
  USD: "us",
  GBP: "gb",
  EUR: "de",
  AUD: "au",
  CAD: "ca",
  JPY: "jp",
  KRW: "kr",
  BRL: "br",
  MXN: "mx",
  INR: "us",
  NGN: "us",
  ZAR: "us",
  KES: "us",
  GHS: "us",
};

function inferCurrencyFromPriceString(priceStr: string, fallback: string): string {
  if (priceStr.startsWith("$")) return "USD";
  if (priceStr.startsWith("£")) return "GBP";
  if (priceStr.startsWith("€")) return "EUR";
  if (priceStr.startsWith("₦")) return "NGN";
  if (priceStr.startsWith("₹")) return "INR";
  if (priceStr.startsWith("¥")) return "JPY";
  if (priceStr.startsWith("₩")) return "KRW";
  if (priceStr.startsWith("A$")) return "AUD";
  if (priceStr.startsWith("C$")) return "CAD";
  if (priceStr.startsWith("R$")) return "BRL";
  return fallback;
}

function isTitleRelevant(resultTitle: string, productTitle: string): boolean {
  const tokens = productTitle
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 3);
  if (!tokens.length) return true;
  const hay = resultTitle.toLowerCase();
  const hits = tokens.filter((t) => hay.includes(t));
  return hits.length / tokens.length >= 0.25;
}

export async function fetchBestPrice(
  detected: DetectedContext,
): Promise<BestPriceInsight | null> {
  const { priceApiKey } = await getEffectiveKeys();
  if (!detected.prices.length || !priceApiKey) return null;

  const primary = detected.prices[0];
  const countryCode = CURRENCY_TO_COUNTRY[primary.currency] ?? "us";

  const params = new URLSearchParams({
    engine: "google_shopping",
    q: detected.title,
    api_key: priceApiKey,
    num: "10",
    gl: countryCode,
  });

  let data: SerpApiResponse;
  try {
    const response = await fetch(`${SERPAPI_ENDPOINT}?${params.toString()}`);
    if (!response.ok) return null;
    data = (await response.json()) as SerpApiResponse;
  } catch {
    return null;
  }

  const results = data.shopping_results;
  if (!results?.length) return null;

  const currentVendorLower = (detected.vendor ?? "").toLowerCase();

  const candidates = results
    .filter((r): r is SerpShoppingResult & { extracted_price: number } =>
      typeof r.extracted_price === "number" && r.extracted_price > 0,
    )
    .filter((r) => {
      if (currentVendorLower && r.source?.toLowerCase().includes(currentVendorLower)) return false;
      if (r.title && !isTitleRelevant(r.title, detected.title)) return false;
      return true;
    })
    .sort((a, b) => a.extracted_price - b.extracted_price);

  if (!candidates.length) return null;

  const best = candidates[0];
  const currency = best.price
    ? inferCurrencyFromPriceString(best.price, primary.currency)
    : primary.currency;

  if (currency !== primary.currency) return null;
  if (best.extracted_price >= primary.amount) return null;

  return {
    source: best.source ?? "Google Shopping",
    amount: best.extracted_price,
    currency,
    url: best.link,
  };
}

export interface SerpAlternative {
  title: string;
  price: number;
  currency: string;
  source: string;
  url?: string;
}

export async function fetchSerpAlternatives(
  detected: DetectedContext,
  max = 3,
): Promise<SerpAlternative[]> {
  const { priceApiKey } = await getEffectiveKeys();
  if (!detected.prices.length || !priceApiKey) return [];

  const primary = detected.prices[0];
  const countryCode = CURRENCY_TO_COUNTRY[primary.currency] ?? "us";

  const params = new URLSearchParams({
    engine: "google_shopping",
    q: detected.title,
    api_key: priceApiKey,
    num: "10",
    gl: countryCode,
  });

  let data: SerpApiResponse;
  try {
    const response = await fetch(`${SERPAPI_ENDPOINT}?${params.toString()}`);
    if (!response.ok) return [];
    data = (await response.json()) as SerpApiResponse;
  } catch {
    return [];
  }

  const results = data.shopping_results;
  if (!results?.length) return [];

  const currentVendorLower = (detected.vendor ?? "").toLowerCase();

  const candidates = results
    .filter((r): r is SerpShoppingResult & { extracted_price: number } =>
      typeof r.extracted_price === "number" && r.extracted_price > 0,
    )
    .filter((r) => {
      if (currentVendorLower && r.source?.toLowerCase().includes(currentVendorLower)) return false;
      if (r.title && !isTitleRelevant(r.title, detected.title)) return false;
      return true;
    })
    .sort((a, b) => a.extracted_price - b.extracted_price);

  if (!candidates.length) return [];

  const alts: SerpAlternative[] = [];
  for (const r of candidates) {
    if (alts.length >= max) break;
    const currency = r.price
      ? inferCurrencyFromPriceString(r.price, primary.currency)
      : primary.currency;
    if (currency !== primary.currency) continue;

    alts.push({
      title: r.title ?? detected.title,
      price: r.extracted_price!,
      currency,
      source: r.source ?? "Google Shopping",
      url: r.link,
    });
  }

  return alts;
}

