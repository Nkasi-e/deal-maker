import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { detectPageContext, shouldShowDealMaker } from "./detection";
import { OverlayPanel } from "./ui/Overlay";
import { Badge } from "./ui/Badge";
import type { DealInsights, DetectedContext } from "../types/pricing";
import "../styles/tailwind.css";

// ---------------------------------------------------------------------------
// Content app — orchestrates detection, badge, and overlay
// ---------------------------------------------------------------------------

function ContentApp() {
  const [insights, setInsights] = useState<DealInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [lastContext, setLastContext] = useState<DetectedContext | null>(null);
  const [urlKey, setUrlKey] = useState(() => window.location.href);

  const requestInsights = useCallback((payload: DetectedContext) => {
    setLoading(true);
    setError(null);
    chrome.runtime.sendMessage({ type: "PRICE_DETECTED", payload }, (response) => {
      setLoading(false);
      if (chrome.runtime.lastError) {
        setError(chrome.runtime.lastError.message ?? "Extension error");
        return;
      }
      if (response?.type === "INSIGHTS_READY") setInsights(response.payload);
      else if (response?.type === "INSIGHTS_ERROR") setError(response.error ?? "Unknown error");
    });
  }, []);

  // Re-run detection whenever the URL meaningfully changes (SPA navigation)
  useEffect(() => {
    let fired = false;

    const tryDetect = (attempt: number): boolean => {
      const context = detectPageContext();
      if (!shouldShowDealMaker(context)) return false;

      // On SPAs, prices may not be loaded yet — keep retrying (last attempt proceeds anyway)
      if (context.prices.length === 0 && attempt < 4) return false;

      if (!fired) {
        fired = true;
        setLastContext(context);
        setShowBadge(true);
        setOverlayOpen(true);
        requestInsights(context);
      }
      return true;
    };

    if (tryDetect(0)) return;

    // Retry at 800 ms, 1.8 s, 3 s, 5 s — covers SPAs that render content late
    const delays = [800, 1800, 3000, 5000];
    const timers = delays.map((ms, i) =>
      setTimeout(() => { if (!fired) tryDetect(i + 1); }, ms),
    );

    return () => timers.forEach(clearTimeout);
  }, [requestInsights, urlKey]);

  // Watch for URL changes on single-page apps (ChatGPT, Notion, etc.)
  useEffect(() => {
    let last = window.location.href;

    const handleMaybeUrlChange = () => {
      const href = window.location.href;
      if (href === last) return;
      last = href;
      // Reset state so detection can run fresh for the new page
      setInsights(null);
      setError(null);
      setOverlayOpen(false);
      setShowBadge(false);
      setLastContext(null);
      setUrlKey(href);
    };

    window.addEventListener("popstate", handleMaybeUrlChange);
    window.addEventListener("hashchange", handleMaybeUrlChange);
    const interval = setInterval(handleMaybeUrlChange, 1000);

    return () => {
      window.removeEventListener("popstate", handleMaybeUrlChange);
      window.removeEventListener("hashchange", handleMaybeUrlChange);
      clearInterval(interval);
    };
  }, []);

  const handleCopyMessage = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  }, []);

  return (
    <>
      <Badge
        visible={showBadge}
        onClick={() => {
          setOverlayOpen(true);
          if (!insights && !loading && lastContext) requestInsights(lastContext);
        }}
      />
      {overlayOpen && (
        <OverlayPanel
          insights={insights}
          loading={loading}
          error={error}
          onClose={() => setOverlayOpen(false)}
          onCopyMessage={handleCopyMessage}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

function init() {
  const rootId = "dealmaker-content-root";
  if (document.getElementById(rootId)) return;
  const root = document.createElement("div");
  root.id = rootId;
  document.body.appendChild(root);
  createRoot(root).render(
    <React.StrictMode>
      <ContentApp />
    </React.StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
