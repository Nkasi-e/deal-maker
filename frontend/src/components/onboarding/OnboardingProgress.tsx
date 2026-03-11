"use client";

import { motion } from "framer-motion";

interface OnboardingProgressProps {
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  return (
    <div className="mb-8 h-2 overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full bg-primary"
        initial={false}
        animate={{ width: `${(currentStep / 4) * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
