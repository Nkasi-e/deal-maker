import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/tailwind.css";

function Panel() {
  return (
    <div className="w-[320px] min-h-[220px] p-4 bg-slate-900 text-slate-100 font-sans text-sm">
      <h1 className="text-lg font-semibold text-white mb-2">DealMaker</h1>
      <p className="text-slate-400 mb-3">
        Price comparison and negotiation tips appear <strong className="text-slate-200">on the page</strong>, not here.
      </p>
      <p className="text-slate-400 text-xs mb-3">
        Open a product, SaaS pricing, or “Make offer” page in a new tab. The DealMaker panel will open automatically on that page with current price, best price, and (on negotiation pages) AI tips.
      </p>
      <p className="text-slate-500 text-xs">
        No insights in this popup — go to a shopping or pricing page to see them.
      </p>
    </div>
  );
}

const root = document.getElementById("panel-root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <Panel />
    </React.StrictMode>
  );
}
