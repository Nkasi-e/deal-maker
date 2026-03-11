# DealMaker Chrome Extension

Detect prices, compare deals, and get negotiation insights on product and SaaS pricing pages.

---

## Part 1: Build and load the extension (do this first)

### Step 1: Install dependencies and build

**Extension owner (you):** To ship with your API key so users get AI negotiation without configuring anything, set env vars when building. You can use **OpenAI** or **OpenRouter** (or both; OpenRouter is used first if set):

```bash
cd plug-extension
pnpm install
# Option A: OpenRouter (one key for many models)
VITE_OPENROUTER_API_KEY=sk-or-... pnpm run build
# Option B: OpenAI
VITE_OPENAI_API_KEY=sk-... pnpm run build
# Optional: default OpenRouter model (e.g. anthropic/claude-3.5-sonnet)
VITE_OPENROUTER_MODEL=openai/gpt-4o-mini pnpm run build
# Optional: price comparison API
VITE_PRICE_API_KEY=... pnpm run build
```

If you omit the env vars, the extension still works: negotiation uses built-in tips and price comparison uses sample data. You can also set keys later in **Options** (see below).

**Using a .env file:** A **`.env`** file is in the project (gitignored). Add your keys there and run `pnpm run build`; Vite will pick them up. Copy **`.env.example`** to **`.env`** if you need a template.

**Build without keys (e.g. for development):**

```bash
pnpm run build
```

You should see `✓ built in ...` and a **`dist`** folder inside `plug-extension`.

### Step 2: Load the extension in Chrome

1. Open **Google Chrome**.
2. In the address bar, type: **`chrome://extensions`** and press Enter.
3. On the **Extensions** page, find **Developer mode** (top-right) and turn it **ON**.
4. Click **Load unpacked**.
5. In the file picker, go to your project and select the **`dist`** folder:
   - Path should be: **`.../dealmaker/plug-extension/dist`**
   - Do **not** select `plug-extension`; select the **`dist`** folder inside it.
6. Click **Select** (or **Open**).
7. The **DealMaker** card should appear on the Extensions page, and the DealMaker icon should appear in the Chrome toolbar (you may need to click the puzzle piece and pin it).

The extension is now loaded and will run on every tab you open.

---

## Part 2: Test with local test pages

Use the HTML files in **`plug-extension/test-pages/`** to trigger the extension without visiting real sites.

### Option A: Using a local server (recommended)

Content scripts run reliably on `http://` URLs. Use a local server for the test pages.

**Step 1:** Start a local server. In a terminal, from the **plug-extension** folder:

```bash
cd plug-extension
npx serve test-pages -p 3333
```

Leave this terminal running. You should see something like: **Local: http://localhost:3333**

**Step 2:** In Chrome, open a new tab and go to:

- **Product page:**  
  **http://localhost:3333/product.html**

**Step 3:** On that page you should see:
- A **DealMaker** badge (e.g. bottom-right of the page) with a green dot and “DealMaker”.
- The overlay panel opens automatically; the badge reopens it if you close it. Panel shows **Current price**, **Best price found**, **Potential savings**, and a **View alternatives** link.

**Step 4:** Try the other test pages in the same way:

- **SaaS pricing:**  
  **http://localhost:3333/saas-pricing.html**
- **Negotiation (make offer):**  
  **http://localhost:3333/negotiation.html**

On the negotiation page, the panel should also show **Negotiation tips** and a **Copy negotiation message** button.

**Step 5:** When finished, stop the server in the terminal with **Ctrl+C**.

### Option B: Opening test pages as files

You can open the HTML files directly (double-click or drag into Chrome). The extension may or may not run on `file://` depending on Chrome and the page; if the badge does not appear, use **Option A** (local server) instead.

1. In Finder (or your file manager), go to **`dealmaker/plug-extension/test-pages/`**.
2. Double-click **`product.html`** (or drag it into a Chrome window).
3. Check for the DealMaker badge on the page; if you see it, click it to open the panel.
4. Repeat with **`saas-pricing.html`** and **`negotiation.html`** if you like.

---

## Part 3: Test with real sites

The extension runs on all websites. Use real product, SaaS, or marketplace pages to test it.

### Step 1: Pick a real page

Examples:

| Type            | Example URLs (use any similar page you prefer) |
|-----------------|-------------------------------------------------|
| **Product**     | Any product page with “Add to cart” / “Buy now” and a price (e.g. Amazon, Best Buy, manufacturer store). |
| **SaaS pricing** | A “Pricing” or “Plans” page, e.g. [Notion Pricing](https://www.notion.so/pricing), [Linear Pricing](https://linear.app/pricing), [Vercel Pricing](https://vercel.com/pricing). |
| **Negotiation** | A listing with “Make offer” or “Contact seller”, e.g. [eBay](https://www.ebay.com) (item with “Make offer”), [Facebook Marketplace](https://www.facebook.com/marketplace). |

### Step 2: Open the page in Chrome

- Make sure the DealMaker extension is loaded (see Part 1).
- Open a **new tab** and go to the URL (e.g. paste a product or pricing URL and press Enter).

### Step 3: Wait for the page to load

- Let the page fully load (prices and buttons visible).
- If the site is slow, wait a few seconds.

### Step 4: Overlay opens automatically

- On pages where DealMaker detects prices or negotiation signals, a **DealMaker** badge appears (usually bottom-right), with a green dot and the text “DealMaker”.
- If you don’t see it:
  - Refresh the page once.
  - Try a different product or pricing page (some sites use wording or structure the detector doesn’t match yet).

### Step 5: What you see in the overlay

- The side panel shows:
  - **Current price** (from the page).
  - **Best price found** (from API or demo data).
  - **Potential savings** (if a better price is found).
  - **Negotiation tips** and **Copy negotiation message** (only on pages with “Make offer” / “Contact seller” type signals).

### Step 6: Try a few different real pages

- One **product** page (e.g. Amazon or similar).
- One **SaaS pricing** page (e.g. Notion, Linear, Vercel).
- One **marketplace** page with “Make offer” or “Contact seller” (e.g. eBay, Facebook Marketplace).

This confirms the extension works on real sites as well as on the test pages.

---

## Optional: API keys (extension owner only)

**End users do not add API keys.** You (the extension owner) provide keys so the extension works for everyone.

- **At build time:**  
  Use **OpenAI** and/or **OpenRouter** (OpenRouter is tried first if set):  
  `VITE_OPENROUTER_API_KEY=sk-or-... pnpm run build` or  
  `VITE_OPENAI_API_KEY=sk-... pnpm run build`  
  Optional: `VITE_OPENROUTER_MODEL=openai/gpt-4o-mini` (or e.g. `anthropic/claude-3.5-sonnet`).

- **Or via Options after load:**  
  Right‑click the DealMaker icon → **Options**. Set OpenRouter and/or OpenAI keys and pick an OpenRouter model. Options override build-time keys.

Keys are used only by the extension (Chrome storage or build); no backend.

---

## After you change the code

1. From **`plug-extension`** run: **`pnpm run build`**
2. Open **chrome://extensions**.
3. Find **DealMaker** and click the **reload** (circular arrow) icon on its card.

Then test again with the test pages or real sites as above.
