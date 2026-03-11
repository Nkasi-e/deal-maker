"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface OnboardingPreferencesStepProps {
  targetSavings: number;
  setTargetSavings: (v: number) => void;
  aggressiveness: number;
  setAggressiveness: (v: number) => void;
  approvalThreshold: number;
  setApprovalThreshold: (v: number) => void;
}

export function OnboardingPreferencesStep({
  targetSavings,
  setTargetSavings,
  aggressiveness,
  setAggressiveness,
  approvalThreshold,
  setApprovalThreshold,
}: OnboardingPreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Target savings (%)</label>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <Slider
              value={[targetSavings]}
              onValueChange={([v]) => setTargetSavings(v)}
              min={5}
              max={40}
              step={1}
            />
          </div>
          <span className="w-10 text-sm font-medium">{targetSavings}%</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Negotiation aggressiveness</label>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <Slider
              value={[aggressiveness]}
              onValueChange={([v]) => setAggressiveness(v)}
              min={0}
              max={100}
              step={5}
            />
          </div>
          <span className="w-10 text-sm font-medium">{aggressiveness}%</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Auto-approve below ($)</label>
        <Input
          type="number"
          value={approvalThreshold}
          onChange={(e) => setApprovalThreshold(Number(e.target.value) || 0)}
          min={0}
        />
      </div>
    </div>
  );
}
