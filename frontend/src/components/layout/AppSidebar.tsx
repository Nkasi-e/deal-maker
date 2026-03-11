"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ROUTES, DASHBOARD_NAV, isActivePath } from "@/config/routes";

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AppSidebar({ collapsed, onToggleCollapse }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card flex flex-col transition-[width] duration-200 overflow-visible",
        collapsed ? "w-[4.5rem]" : "w-56"
      )}
    >
      {/* Icon on the divider line (right edge) */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="absolute right-0 top-1/2 z-50 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4 shrink-0" />
        ) : (
          <PanelLeftClose className="h-4 w-4 shrink-0" />
        )}
      </button>
      <div className={cn("flex h-16 shrink-0 items-center border-b border-border", collapsed ? "justify-center px-0" : "px-4")}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={ROUTES.dashboard}
                className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-primary hover:bg-muted"
              >
                <span className="text-lg">D</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">DealMaker</TooltipContent>
          </Tooltip>
        ) : (
          <Link href={ROUTES.dashboard} className="flex items-center gap-2 font-semibold whitespace-nowrap">
            <span className="text-primary">Deal</span>Maker
          </Link>
        )}
      </div>
      <nav className="flex-1 space-y-3 overflow-hidden p-3">
        {DASHBOARD_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(pathname, item.href);
          const linkEl = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg py-3 text-sm font-medium transition-colors",
                collapsed ? "justify-center px-0" : "px-4 whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
          return collapsed ? (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ) : (
            linkEl
          );
        })}
      </nav>
      <div className="shrink-0 border-t border-border p-3">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onToggleCollapse}
                className="flex w-full justify-center rounded-lg py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors px-0"
              >
                <PanelLeftOpen className="h-4 w-4 shrink-0" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          </Tooltip>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              "flex items-center gap-3 rounded-lg py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full px-4 whitespace-nowrap"
            )}
          >
            <PanelLeftClose className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Collapse</span>
          </button>
        )}
      </div>
    </aside>
  );
}
