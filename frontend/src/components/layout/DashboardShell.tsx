"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./AppSidebar";

const TOOLTIP_DELAY_MS = 800;
const TOOLTIP_SKIP_DELAY_MS = 300;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS} skipDelayDuration={TOOLTIP_SKIP_DELAY_MS}>
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
      <main
        className={cn(
          "transition-[padding] duration-200",
          collapsed ? "pl-[4.5rem]" : "pl-56"
        )}
      >
        {children}
      </main>
    </div>
    </TooltipProvider>
  );
}
