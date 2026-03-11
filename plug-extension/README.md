# DealMaker Chrome Extension

The **DealMaker Chrome extension** brings DealMaker to the page you’re on: it detects prices, shows best price and potential savings, and offers negotiation tips and copy-paste messages on product pages, SaaS pricing pages, and “Make offer” / marketplace flows.

It works alongside the [DealMaker web app](../frontend/README.md), where you configure preferences and review negotiations. The extension gives you instant context while browsing—no need to leave the site to see comparable prices or get negotiation help.

---

## What the extension does

- **Price detection** — Finds prices on product and pricing pages and shows them in a compact panel.
- **Price comparison** — Displays **Current price** (from the page), **Best price found** (from API or demo data), and **Potential savings**.
- **Negotiation support** — On pages with “Make offer” or “Contact seller” signals, the panel shows **Negotiation tips** and a **Copy negotiation message** button.
- **Always available** — A DealMaker badge (e.g. bottom-right) opens the panel; the extension runs on all sites and activates when it detects relevant content.

End users don’t configure API keys; you (the extension owner) can ship with keys at build time or let users set them in **Options** so the extension works for everyone.

---

## Table of contents

- [Build and load the extension](#part-1-build-and-load-the-extension)
- [Test with local test pages](#part-2-test-with-local-test-pages)
- [Test with real sites](#part-3-test-with-real-sites)
- [API keys (optional)](#optional-api-keys-extension-owner-only)
- [After you change the code](#after-you-change-the-code)

---

## Part 1: Build and load the extension

### Step 1: Install dependencies and build

From the **repo root** (recommended):

```bash
pnpm install
pnpm run build:extension
```

Or from this folder:

```bash
cd plug-extension
pnpm install
pnpm run build
```

**With API keys (optional):** To enable AI negotiation and live price comparison, set env vars when building. You can use **OpenRouter** or **OpenAI** (OpenRouter is used first if set):

```bash
cd plug-extension
# Option A: OpenRouter (one key for many models)
VITE_OPENROUTER_API_KEY=sk-or-... pnpm run build
# Option B: OpenAI
VITE_OPENAI_API_KEY=sk-... pnpm run build
# Optional: default OpenRouter model
VITE_OPENROUTER_MODEL=openai/gpt-4o-mini pnpm run build
# Optional: price comparison API
VITE_PRICE_API_KEY=... pnpm run build
```

**Using a .env file:** Copy `.env.example` to `.env` (in `plug-extension/`), add your keys, and run `pnpm run build`. Vite will pick up the variables. `.env` is gitignored.

**Without keys:** The extension still works: negotiation uses built-in tips and price comparison uses sample data. Users can also set keys later in **Options**.

You should see a **`dist`** folder inside `plug-extension` after a successful build.

### Step 2: Load the extension in Chrome

1. Open **Google Chrome**.
2. Go to **chrome://extensions**.
3. Turn **Developer mode** ON (top-right).
4. Click **Load unpacked**.
5. Select the **`dist`** folder: `.../dealmaker/plug-extension/dist` (not the `plug-extension` folder itself).
6. Click **Select** (or **Open**).
7. The DealMaker extension appears on the Extensions page; pin the icon from the toolbar if needed.

The extension is now loaded and will run on every tab.

---

## Part 2: Test with local test pages

Use the HTML files in **`plug-extension/test-pages/`** to trigger the extension without visiting real sites.

### Option A: Local server (recommended)

Content scripts run reliably on `http://` URLs.

1. From **plug-extension**:
   ```bash
   cd plug-extension
   npx serve test-pages -p 3333
   ```
2. In Chrome, open:
   - **Product:** http://localhost:3333/product.html  
   - **SaaS pricing:** http://localhost:3333/saas-pricing.html  
   - **Negotiation:** http://localhost:3333/negotiation.html  

You should see the DealMaker badge and panel (Current price, Best price found, Potential savings; on the negotiation page, also Negotiation tips and Copy negotiation message). Stop the server with **Ctrl+C** when done.

### Option B: Open files directly

Open `plug-extension/test-pages/product.html` (and the others) by double-clicking or dragging into Chrome. The extension may or may not run on `file://` depending on the page; if the badge doesn’t appear, use Option A.

---

## Part 3: Test with real sites

The extension runs on all websites. Use real product, SaaS, or marketplace pages to verify behavior.

| Type | Examples |
|------|----------|
| **Product** | Any product page with price and “Add to cart” / “Buy now” (e.g. Amazon, Best Buy). |
| **SaaS pricing** | Pricing/Plans pages, e.g. [Notion](https://www.notion.so/pricing), [Linear](https://linear.app/pricing), [Vercel](https://vercel.com/pricing). |
| **Negotiation** | Listings with “Make offer” or “Contact seller” (e.g. eBay, Facebook Marketplace). |

1. Ensure the extension is loaded (Part 1).
2. Open a new tab and go to the URL.
3. Wait for the page to load.
4. On supported pages, the DealMaker badge appears (often bottom-right); click it to open the panel.
5. The panel shows Current price, Best price found, Potential savings, and on negotiation-style pages: Negotiation tips and Copy negotiation message.

If the badge doesn’t appear, refresh once or try another page; some sites use structure or wording the detector doesn’t match yet.

---

## Optional: API keys (extension owner only)

**End users do not add API keys.** You provide keys so the extension works for everyone.

- **At build time:** Set `VITE_OPENROUTER_API_KEY` and/or `VITE_OPENAI_API_KEY` (and optionally `VITE_OPENROUTER_MODEL`, `VITE_PRICE_API_KEY`) when running `pnpm run build`, or put them in `plug-extension/.env`.
- **After load:** Right‑click the DealMaker icon → **Options**. Set OpenRouter and/or OpenAI keys and choose an OpenRouter model. Options override build-time keys.

Keys are used only by the extension (Chrome storage or build); there is no separate backend.

---

## After you change the code

1. From **plug-extension**: `pnpm run build`
2. Open **chrome://extensions**
3. Find **DealMaker** and click the **reload** (circular arrow) icon on its card.

Then test again with the test pages or real sites above.
