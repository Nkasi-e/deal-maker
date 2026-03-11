import type { AlternativeProduct, DetectedContext } from "../../types/pricing";
import { getEffectiveKeys, callWithFallback } from "./client";
import { fetchSerpAlternatives } from "./best-price";

const SYSTEM_PROMPT =
  "You are DealMaker. Identify the exact product category and suggest alternatives ONLY within that same category. " +
  "If the product is an AI tool, suggest AI tools. If it is a design tool, suggest design tools. " +
  "Only real, existing products — no hallucinations. Respond only with valid JSON.";

function buildPhysicalProductPrompt(detected: DetectedContext, priceStr: string, hostname: string): string {
  return `A user is viewing a product listing:
Title: ${detected.title}
Retailer/Vendor: ${detected.vendor ?? hostname}
URL: ${detected.url}
Listed price: ${priceStr}

Give 2–4 alternatives in TWO types:
TYPE A — Same or very similar product on a DIFFERENT retailer (e.g. Newegg, Best Buy, B&H, Walmart) — mention the likely price difference.
TYPE B — A genuinely competing product from a different brand that offers comparable or better value.

Mix both types (2–4 total). Always return alternatives even if the current price looks good.

Return JSON:
{
  "alternatives": [
    {
      "name": "Exact retailer or product name",
      "priceInfo": "Estimated price (e.g. '~$319 on Newegg') or 'Check site'",
      "url": "Direct URL if known",
      "whyConsider": "One punchy reason",
      "pros": ["Pro 1 (≤8 words)", "Pro 2 (≤8 words)", "Pro 3 (≤8 words)"]
    }
  ]
}`;
}

function buildSaasPrompt(detected: DetectedContext, priceStr: string, hostname: string): string {
  return `A user is on a SaaS / service pricing page.

Product/service: ${detected.title}
Website: ${hostname}
Full URL: ${detected.url}
Detected plan prices: ${priceStr}

STEP 1 — Identify the product category from the website and title.
Examples: "AI language model API", "project management tool", "design software", "code editor/IDE", "email marketing", "CRM", etc.

STEP 2 — Suggest 2–4 REAL, well-known competitors in EXACTLY that same category.
If this is an AI assistant/LLM (e.g. Claude, ChatGPT, Gemini), suggest only other AI assistants/LLM products.
If this is a project management tool, suggest only project management tools.

Always include alternatives even if the current pricing looks competitive.

Return JSON:
{
  "category": "The identified product category",
  "alternatives": [
    {
      "name": "Exact product/brand name",
      "priceInfo": "Real pricing if known (e.g. 'Free + $20/mo Pro'), else 'Check site'",
      "url": "Official pricing page URL if known",
      "whyConsider": "One punchy differentiator headline",
      "pros": ["Pro 1 (≤8 words)", "Pro 2 (≤8 words)", "Pro 3 (≤8 words)"]
    }
  ]
}`;
}

function safeHttpsUrl(u?: string): string | null {
  if (!u) return null;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch { return null; }
}

/** Similar products with better or comparable pricing (AI-suggested). */
export async function fetchAlternatives(
  detected: DetectedContext,
): Promise<AlternativeProduct[] | null> {
  const { openaiApiKey, openrouterApiKey, openrouterModel } = await getEffectiveKeys();
  if (!openrouterApiKey && !openaiApiKey) return null;

  let hostname = "";
  try { hostname = new URL(detected.url).hostname.replace(/^www\./, ""); } catch { /* ignore */ }

  const priceStr = detected.prices
    .filter((p) => p.amount > 0)
    .slice(0, 5)
    .map((p) => `${p.currency} ${p.amount}${detected.priceContext ? ` ${detected.priceContext}` : ""}`)
    .join(", ") || "various";

  const isPhysical = detected.pageType === "product" || detected.pageType === "marketplace";
  const prompt = isPhysical
    ? buildPhysicalProductPrompt(detected, priceStr, hostname)
    : buildSaasPrompt(detected, priceStr, hostname);

  type Res = { alternatives?: AlternativeProduct[] };
  const result = await callWithFallback<Res>(openrouterApiKey, openrouterModel, openaiApiKey, SYSTEM_PROMPT, prompt);

  const alts = result?.alternatives;
  if (!Array.isArray(alts) || alts.length === 0) return null;

  const titleTokens = detected.title.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 3).slice(0, 8);

  const filtered = alts
    .map((alt): AlternativeProduct | null => {
      if (!alt.name?.trim() || /^(n\/a|unknown|placeholder|example)/i.test(alt.name)) return null;

      const cleanUrl = safeHttpsUrl(alt.url);

      // Physical products: require some relevance to the product title
      if (isPhysical) {
        const hay = `${alt.name} ${alt.whyConsider ?? ""}`.toLowerCase();
        if (titleTokens.filter((t) => hay.includes(t)).length === 0) return null;
      }

      return {
        ...alt,
        url: cleanUrl ?? undefined,
        merchantSource: cleanUrl ? new URL(cleanUrl).hostname.replace(/^www\./, "") : undefined,
      };
    })
    .filter((x): x is AlternativeProduct => x !== null)
    .slice(0, 4);

  return filtered.length > 0 ? filtered : null;
}
