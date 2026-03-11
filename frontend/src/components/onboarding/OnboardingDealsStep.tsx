"use client";

import { cn } from "@/lib/utils";
import { ONBOARDING_DEAL_TYPES } from "@/data/onboarding";

interface OnboardingDealsStepProps {
  selectedDeals: string[];
  toggleDeal: (id: string) => void;
}

export function OnboardingDealsStep({ selectedDeals, toggleDeal }: OnboardingDealsStepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ONBOARDING_DEAL_TYPES.map((deal) => {
        const Icon = deal.icon;
        const selected = selectedDeals.includes(deal.id);
        return (
          <button
            key={deal.id}
            type="button"
            onClick={() => toggleDeal(deal.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
              selected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border hover:bg-muted/50"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="font-medium">{deal.label}</span>
          </button>
        );
      })}
    </div>
  );
}
