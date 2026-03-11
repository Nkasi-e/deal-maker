import {
  BUILD_OPENAI_API_KEY,
  BUILD_OPENROUTER_API_KEY,
  BUILD_OPENROUTER_MODEL,
  BUILD_PRICE_API_KEY,
} from "../../config/keys";

export const OPENAI_MODEL = "gpt-4o-mini";

// ---------------------------------------------------------------------------
// Key resolution — build-time keys with optional runtime overrides
// ---------------------------------------------------------------------------

interface StoredKeys {
  openaiApiKey?: string;
  openrouterApiKey?: string;
  openrouterModel?: string;
  priceApiKey?: string;
}

function getStoredKeys(): Promise<StoredKeys> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      ["openaiApiKey", "openrouterApiKey", "openrouterModel", "priceApiKey"],
      (result: Record<string, string>) => resolve(result as StoredKeys),
    );
  });
}

export interface EffectiveKeys {
  openaiApiKey: string;
  openrouterApiKey: string;
  openrouterModel: string;
  priceApiKey: string;
}

export async function getEffectiveKeys(): Promise<EffectiveKeys> {
  const stored = await getStoredKeys();
  return {
    openaiApiKey: stored.openaiApiKey?.trim() || BUILD_OPENAI_API_KEY || "",
    openrouterApiKey: stored.openrouterApiKey?.trim() || BUILD_OPENROUTER_API_KEY || "",
    openrouterModel: stored.openrouterModel?.trim() || BUILD_OPENROUTER_MODEL || "openai/gpt-4o-mini",
    priceApiKey: stored.priceApiKey?.trim() || BUILD_PRICE_API_KEY || "",
  };
}

// ---------------------------------------------------------------------------
// Generic chat-completion call — returns parsed JSON or null
// ---------------------------------------------------------------------------

export async function callChatApiForJson<T>(
  url: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<T | null> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Helper — calls OpenRouter first, falls back to OpenAI
// ---------------------------------------------------------------------------

export async function callWithFallback<T>(
  openrouterKey: string,
  openrouterModel: string,
  openaiKey: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<T | null> {
  if (openrouterKey) {
    const result = await callChatApiForJson<T>(
      "https://openrouter.ai/api/v1/chat/completions",
      openrouterKey,
      openrouterModel,
      systemPrompt,
      userPrompt,
    );
    if (result) return result;
  }
  if (openaiKey) {
    return callChatApiForJson<T>(
      "https://api.openai.com/v1/chat/completions",
      openaiKey,
      OPENAI_MODEL,
      systemPrompt,
      userPrompt,
    );
  }
  return null;
}
