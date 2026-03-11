import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Sparkles,
  FileCheck,
  MessageSquare,
  BarChart3,
  Building2,
  Activity,
  Settings,
  Scale,
} from "lucide-react";

/**
 * Central route definitions – single source of truth for the app.
 * Use these constants instead of hardcoding paths for links and redirects.
 */
export const ROUTES = {
  // Marketing (public)
  home: "/",
  auth: "/auth",
  authSignin: "/auth/signin",
  authSignup: "/auth/signup",
  onboarding: "/onboarding",

  // Dashboard (app)
  dashboard: "/dashboard",
  opportunities: "/opportunities",
  opportunity: (id: string) => `/opportunities/${id}`,
  negotiations: "/negotiations",
  negotiation: (id: string) => `/negotiations/${id}`,
  evaluate: "/evaluate",
  evaluateDeal: (id: string) => `/evaluate/${id}`,
  vendors: "/vendors",
  analytics: "/analytics",
  vendorIntelligence: "/vendor-intelligence",
  activity: "/activity",
  settings: "/settings",
} as const;

export type RoutePath =
  | typeof ROUTES.home
  | typeof ROUTES.auth
  | typeof ROUTES.authSignin
  | typeof ROUTES.authSignup
  | typeof ROUTES.onboarding
  | typeof ROUTES.dashboard
  | typeof ROUTES.opportunities
  | typeof ROUTES.negotiations
  | typeof ROUTES.evaluate
  | typeof ROUTES.vendors
  | typeof ROUTES.analytics
  | typeof ROUTES.vendorIntelligence
  | typeof ROUTES.activity
  | typeof ROUTES.settings;

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/**
 * Sidebar navigation – all dashboard nav links in one place.
 * Add/remove/reorder here to update the sidebar.
 */
export const DASHBOARD_NAV: NavItem[] = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.opportunities, label: "Opportunities", icon: Sparkles },
  { href: ROUTES.negotiations, label: "Negotiations", icon: MessageSquare },
  { href: ROUTES.evaluate, label: "Deal evaluation", icon: FileCheck },
  { href: ROUTES.vendors, label: "Vendor comparison", icon: Scale },
  { href: ROUTES.analytics, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.vendorIntelligence, label: "Vendor intelligence", icon: Building2 },
  { href: ROUTES.activity, label: "Agent activity", icon: Activity },
  { href: ROUTES.settings, label: "Settings", icon: Settings },
];

/**
 * Check if a pathname matches a nav href (including nested routes).
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(href + "/")) return true;
  return false;
}
