"use client";

import Link from "next/link";

interface OnboardingHeaderProps {
  currentStep: number;
  backHref: string;
}

export function OnboardingHeader({ currentStep, backHref }: OnboardingHeaderProps) {
  return (
    <div className="mb-8 flex justify-between">
      <Link
        href={backHref}
        className="inline-block rounded-md px-2 py-1 -mx-2 -my-1 text-sm font-medium text-primary transition-colors duration-200 hover:bg-muted hover:text-foreground"
      >
        ← Back
      </Link>
      <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
    </div>
  );
}
