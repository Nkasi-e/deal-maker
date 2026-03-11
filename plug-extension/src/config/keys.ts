/**
 * Build-time API keys (set by extension owner when building).
 * Env vars: VITE_OPENAI_API_KEY, VITE_OPENROUTER_API_KEY, VITE_PRICE_API_KEY, VITE_OPENROUTER_MODEL
 * Use either OpenAI or OpenRouter (or both; OpenRouter is used first if set).
 * Example: VITE_OPENROUTER_API_KEY=sk-or-... pnpm run build
 */
export const BUILD_OPENAI_API_KEY =
  (import.meta.env.VITE_OPENAI_API_KEY ?? "").trim();

export const BUILD_OPENROUTER_API_KEY =
  (import.meta.env.VITE_OPENROUTER_API_KEY ?? "").trim();

export const BUILD_OPENROUTER_MODEL =
  (import.meta.env.VITE_OPENROUTER_MODEL ?? "openai/gpt-4o-mini").trim();

export const BUILD_PRICE_API_KEY =
  (import.meta.env.VITE_PRICE_API_KEY ?? "").trim();
