import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles/tailwind.css";

const OPENROUTER_MODELS = [
  "openai/gpt-4o-mini",
  "openai/gpt-4o",
  "anthropic/claude-3.5-sonnet",
  "anthropic/claude-3-haiku",
  "google/gemini-2.0-flash-001"
];

function Options() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [openrouterKey, setOpenrouterKey] = useState("");
  const [openrouterModel, setOpenrouterModel] = useState(OPENROUTER_MODELS[0]);
  const [priceKey, setPriceKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(
      ["openaiApiKey", "openrouterApiKey", "openrouterModel", "priceApiKey"],
      (result) => {
        setOpenaiKey(result.openaiApiKey ?? "");
        setOpenrouterKey(result.openrouterApiKey ?? "");
        setOpenrouterModel(
          result.openrouterModel ?? OPENROUTER_MODELS[0]
        );
        setPriceKey(result.priceApiKey ?? "");
      }
    );
  }, []);

  const save = () => {
    chrome.storage.sync.set(
      {
        openaiApiKey: openaiKey.trim() || undefined,
        openrouterApiKey: openrouterKey.trim() || undefined,
        openrouterModel: openrouterModel.trim() || undefined,
        priceApiKey: priceKey.trim() || undefined
      },
      () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-white">DealMaker Options</h1>
        <p className="text-slate-400 text-sm">
          Extension owner only: set API keys so the extension works for all users. Use
          either <strong>OpenAI</strong> or <strong>OpenRouter</strong> (or both; OpenRouter
          is used first if set). End users do not need to open this.
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            OpenRouter API key (optional)
          </label>
          <input
            type="password"
            value={openrouterKey}
            onChange={(e) => setOpenrouterKey(e.target.value)}
            placeholder="sk-or-..."
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-dm-accent focus:outline-none focus:ring-1 focus:ring-dm-accent"
          />
          <p className="text-xs text-slate-500">
            From openrouter.ai – one key for many models (OpenAI, Claude, Gemini, etc.).
          </p>
          <label className="block text-xs font-medium text-slate-400 mt-2">
            OpenRouter model
          </label>
          <select
            value={openrouterModel}
            onChange={(e) => setOpenrouterModel(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-dm-accent focus:outline-none focus:ring-1 focus:ring-dm-accent"
          >
            {OPENROUTER_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            OpenAI API key (optional)
          </label>
          <input
            type="password"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-dm-accent focus:outline-none focus:ring-1 focus:ring-dm-accent"
          />
          <p className="text-xs text-slate-500">
            Direct OpenAI key. Ignored if OpenRouter key is set.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Price comparison API key (optional)
          </label>
          <input
            type="password"
            value={priceKey}
            onChange={(e) => setPriceKey(e.target.value)}
            placeholder="Your API key"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-dm-accent focus:outline-none focus:ring-1 focus:ring-dm-accent"
          />
          <p className="text-xs text-slate-500">
            For real price comparison APIs; leave blank for demo mode.
          </p>
        </div>

        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-dm-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

const root = document.getElementById("options-root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>
  );
}
