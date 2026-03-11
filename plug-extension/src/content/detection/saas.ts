import type { SaaSPlan } from "../../types/pricing";
import { EXPLICIT_PRICE_REGEX, inferCurrency } from "./signals";
import { extractAllPrices } from "./prices";
import { FIXED_PRICE_RETAILER_HOSTS } from "./page-type";

// ---------------------------------------------------------------------------
// Billing interval inference
// ---------------------------------------------------------------------------

export function inferBillingInterval(text: string): string | undefined {
  const t = text.toLowerCase();
  if (t.includes("per seat") && (t.includes("month") || t.includes("/mo"))) return "per seat/month";
  if (t.includes("per user") && (t.includes("month") || t.includes("/mo"))) return "per user/month";
  if (t.includes("annual") || t.includes("per year") || t.includes("/year") || t.includes("/yr")) return "per year";
  if (t.includes("monthly") || t.includes("per month") || t.includes("/month") || t.includes("/mo")) return "per month";
  return undefined;
}

// ---------------------------------------------------------------------------
// SaaS pricing page detection
// ---------------------------------------------------------------------------

const KNOWN_SAAS_HOSTS =
  /(openai|chatgpt|anthropic|claude|notion|slack|atlassian|linear|figma|airtable|hubspot|intercom|stripe|vercel|netlify|canva|asana|monday|clickup|loom|miro|dropbox|github|gitlab|zoom|twilio|sendgrid|mailchimp|convertkit|segment|mixpanel|amplitude|datadog|pagerduty|sentry|cursor|replit|render|railway|supabase|planetscale|neon|convex|fly\.io|deno|perplexity|mistral|cohere|groq|together\.ai|replicate|elevenlabs|midjourney|runway|stability)\./i;

const EXCLUDED_PATHS = [
  "/blog", "/docs", "/documentation", "/help", "/support",
  "/changelog", "/about", "/careers",
];

/**
 * Returns true when the current page is a SaaS pricing / plans page.
 * Requires at least one URL/host/title signal AND structural evidence
 * (pricing-card elements, ≥2 prices, or a #pricing hash anchor).
 */
export function isLikelySaasPricingPage(text: string): boolean {
  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const title = document.title.toLowerCase();

  // Retail hosts never qualify as SaaS pricing pages
  if (FIXED_PRICE_RETAILER_HOSTS.some((h) => host.includes(h))) return false;

  // Exclude clearly non-pricing path prefixes
  if (EXCLUDED_PATHS.some((x) => path.startsWith(x) || path.includes(`${x}/`))) return false;
  if (/\/(blog|docs|help|support|news|resources)\b/i.test(path)) return false;

  // Signal layer 1 — URL path or hash
  const pathHint =
    /\/(pricing|plans?|subscriptions?|billing|upgrade|pro|checkout)\b/i.test(path)
    || /^\/upgrade$|^\/pro$/i.test(path)
    || /pricing|plans?|upgrade|billing/i.test(hash);

  // Signal layer 2 — known SaaS host
  const hostHint = KNOWN_SAAS_HOSTS.test(host);

  // Signal layer 3 — page title
  const titleHint = /(pricing|plans?|upgrade|choose a plan|get pro|go pro|subscribe)/i.test(title);

  if (!pathHint && !hostHint && !titleHint) return false;

  // Structural evidence: pricing-card DOM elements, ≥2 prices, or explicit pricing
  // intent in the URL (path or hash).  For SaaS, `/something/pricing` is a very
  // strong signal even if cards/prices haven't rendered yet (Slack, ChatGPT, etc.).
  const priceLikeEls = document.querySelectorAll(
    "[class*='pricing-card' i], [class*='plan-card' i], [class*='tier' i], [data-plan], [data-pricing]",
  );
  const extracted = extractAllPrices().filter((p) => p.amount > 0);
  const hashIsStructural = /pricing|plans?|upgrade|billing/i.test(hash);
  const pathHasPricing = /pricing/i.test(path);

  return extracted.length >= 2
    || priceLikeEls.length >= 2
    || hashIsStructural
    || pathHasPricing;
}

// ---------------------------------------------------------------------------
// SaaS plan extraction
// ---------------------------------------------------------------------------

const PLAN_CARD_SELECTORS = [
  "[class*='pricing-card' i]",
  "[class*='plan-card' i]",
  "[class*='tier' i]",
  "[data-plan]",
  "[data-pricing]",
  "[class*='pricing' i] [class*='card' i]",
];

export function extractSaasPlans(): SaaSPlan[] {
  const plans: SaaSPlan[] = [];
  const seen = new Set<string>();

  for (const sel of PLAN_CARD_SELECTORS) {
    document.querySelectorAll(sel).forEach((node) => {
      const el = node as HTMLElement;
      const blockText = (el.innerText || "").trim();
      if (!blockText || blockText.length < 20) return;

      const priceMatch = new RegExp(EXPLICIT_PRICE_REGEX.source, "i").exec(blockText);
      if (!priceMatch) return;
      const amount = parseFloat(priceMatch[1].replace(/,/g, ""));
      if (Number.isNaN(amount) || amount <= 0) return;
      const currency = inferCurrency(priceMatch[0], "");

      const headingEl = el.querySelector("h2, h3, h4, [class*='name' i], [class*='title' i]") as HTMLElement | null;
      const name = (headingEl?.innerText?.trim() || blockText.split("\n")[0]?.trim() || "Plan").slice(0, 60);

      const interval = inferBillingInterval(blockText);
      const features = blockText
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 8 && !/[$€£¥₹₩₦]/.test(s))
        .slice(1, 4);

      const key = `${name}-${amount}-${currency}`;
      if (seen.has(key)) return;
      seen.add(key);
      plans.push({ name, price: amount, currency, billingInterval: interval, features });
    });
    if (plans.length >= 5) break;
  }

  return plans.slice(0, 5);
}
