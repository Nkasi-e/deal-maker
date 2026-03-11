import React, { useState } from "react";

// ---------------------------------------------------------------------------
// Portal root helpers
// ---------------------------------------------------------------------------

export const ROOT_ID = "dealmaker-root";
export const BADGE_ID = "dealmaker-badge";

export function ensureRoot(id: string): HTMLElement {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}

// ---------------------------------------------------------------------------
// Shimmer skeleton
// ---------------------------------------------------------------------------

export function Shimmer({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block rounded-md ${className}`}
      style={{
        background: "linear-gradient(90deg, #1e293b 25%, #273449 50%, #1e293b 75%)",
        backgroundSize: "800px 100%",
        animation: "shimmer 1.6s infinite linear",
      }}
    />
  );
}

export function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="rounded-xl border border-slate-800/80 p-4 space-y-3"
      style={{ animationDelay: `${delay}ms`, animation: "fadeUp 0.35s ease-out both" }}
    >
      <Shimmer className="h-3 w-24" />
      <Shimmer className="h-6 w-40" />
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-3/4" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated card wrapper
// ---------------------------------------------------------------------------

export function Card({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`dm-card p-4 ${className}`}
      style={{ animationDelay: `${delay}ms`, animation: "fadeUp 0.35s ease-out both", opacity: 0 }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section label
// ---------------------------------------------------------------------------

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Copy button with micro-feedback
// ---------------------------------------------------------------------------

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="dm-pill-button w-full transition-all active:scale-95"
      style={{ transition: "background 0.15s, transform 0.1s" }}
    >
      {copied ? (
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </span>
      ) : label}
    </button>
  );
}
