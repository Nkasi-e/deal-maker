import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

/** Map opportunity status to Badge variant for consistent UI. */
export function getOpportunityBadgeVariant(
  status: "detected" | "negotiating" | "evaluating" | "closed"
): "default" | "secondary" | "success" {
  if (status === "closed") return "success";
  if (status === "negotiating" || status === "evaluating") return "default";
  return "secondary";
}
