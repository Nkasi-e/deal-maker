"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OnboardingStep } from "@/data/onboarding";
import { OnboardingDealsStep } from "./OnboardingDealsStep";
import { OnboardingPreferencesStep } from "./OnboardingPreferencesStep";
import { OnboardingPreviewStep } from "./OnboardingPreviewStep";

interface OnboardingStepCardProps {
  stepConfig: OnboardingStep;
  selectedDeals: string[];
  toggleDeal: (id: string) => void;
  targetSavings: number;
  setTargetSavings: (v: number) => void;
  aggressiveness: number;
  setAggressiveness: (v: number) => void;
  approvalThreshold: number;
  setApprovalThreshold: (v: number) => void;
}

export function OnboardingStepCard({
  stepConfig,
  selectedDeals,
  toggleDeal,
  targetSavings,
  setTargetSavings,
  aggressiveness,
  setAggressiveness,
  approvalThreshold,
  setApprovalThreshold,
}: OnboardingStepCardProps) {
  const isDeals = stepConfig.id === "deals";
  const isPrefs = stepConfig.id === "preferences";
  const isPreview = stepConfig.id === "preview";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{stepConfig.title}</CardTitle>
        <CardDescription>{stepConfig.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {"welcomeText" in stepConfig && stepConfig.welcomeText && (
          <p className="text-muted-foreground">{stepConfig.welcomeText}</p>
        )}
        {isDeals && <OnboardingDealsStep selectedDeals={selectedDeals} toggleDeal={toggleDeal} />}
        {isPrefs && (
          <OnboardingPreferencesStep
            targetSavings={targetSavings}
            setTargetSavings={setTargetSavings}
            aggressiveness={aggressiveness}
            setAggressiveness={setAggressiveness}
            approvalThreshold={approvalThreshold}
            setApprovalThreshold={setApprovalThreshold}
          />
        )}
        {isPreview && <OnboardingPreviewStep selectedDeals={selectedDeals} />}
      </CardContent>
    </Card>
  );
}
