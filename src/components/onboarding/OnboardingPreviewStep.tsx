"use client";

import { LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ONBOARDING_DEAL_TYPES } from "@/data/onboarding";

interface OnboardingPreviewStepProps {
  selectedDeals: string[];
}

export function OnboardingPreviewStep({ selectedDeals }: OnboardingPreviewStepProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <LayoutDashboard className="h-4 w-4" />
        Dashboard preview
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        You&apos;ll see savings summary, active negotiations, detected opportunities, and vendor
        monitoring. You can start by exploring the demo dashboard.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedDeals.map((id) => (
          <Badge key={id} variant="secondary">
            {ONBOARDING_DEAL_TYPES.find((d) => d.id === id)?.label ?? id}
          </Badge>
        ))}
      </div>
    </div>
  );
}
