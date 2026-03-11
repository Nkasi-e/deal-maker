import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ensureRoot, BADGE_ID } from "./atoms";

interface BadgeProps {
  visible: boolean;
  onClick: () => void;
}

export function Badge({ visible, onClick }: BadgeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !visible) return null;

  const badge = (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[2147483645] flex items-center gap-2 rounded-full bg-[#0f172a] border border-slate-600/60 px-4 py-2 shadow-lg text-white text-sm font-semibold hover:border-dm-accent/60 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-dm-accent animate-scale-in"
      aria-label="Open DealMaker"
      title="DealMaker detected a deal"
    >
      <span className="w-2 h-2 rounded-full bg-dm-accent animate-pulse" />
      DealMaker
    </button>
  );

  return createPortal(badge, ensureRoot(BADGE_ID));
}
