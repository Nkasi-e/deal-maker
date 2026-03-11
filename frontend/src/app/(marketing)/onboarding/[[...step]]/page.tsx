"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ROUTES } from "@/config/routes";
import { ONBOARDING_STEPS } from "@/data/onboarding";
import {
  OnboardingHeader,
  OnboardingProgress,
  OnboardingStepCard,
  getSlideVariants,
  slideTransition,
} from "@/components/onboarding";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const stepParam = searchParams.get("step");
  const currentStep = stepParam ? Math.min(parseInt(stepParam, 10), 4) : 1;
  const [prevStep, setPrevStep] = useState(currentStep);
  const direction = currentStep > prevStep ? 1 : currentStep < prevStep ? -1 : 0;
  useEffect(() => {
    setPrevStep(currentStep);
  }, [currentStep]);

  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [targetSavings, setTargetSavings] = useState(15);
  const [aggressiveness, setAggressiveness] = useState(50);
  const [approvalThreshold, setApprovalThreshold] = useState(500);

  const toggleDeal = (id: string) => {
    setSelectedDeals((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const goNext = () => {
    if (currentStep >= 4) {
      toast.success("You're all set! Welcome to DealMaker.");
      router.push(ROUTES.dashboard);
      return;
    }
    router.push(`${ROUTES.onboarding}?step=${currentStep + 1}`);
  };

  const stepConfig = ONBOARDING_STEPS[currentStep - 1];
  const backHref =
    currentStep > 1 ? `${ROUTES.onboarding}?step=${currentStep - 1}` : ROUTES.home;
  const slideVariants = getSlideVariants(direction);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <OnboardingHeader currentStep={currentStep} backHref={backHref} />
        <OnboardingProgress currentStep={currentStep} />

        <div className="relative min-h-[340px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-x-0 top-0 w-full"
            >
              <OnboardingStepCard
                stepConfig={stepConfig}
                selectedDeals={selectedDeals}
                toggleDeal={toggleDeal}
                targetSavings={targetSavings}
                setTargetSavings={setTargetSavings}
                aggressiveness={aggressiveness}
                setAggressiveness={setAggressiveness}
                approvalThreshold={approvalThreshold}
                setApprovalThreshold={setApprovalThreshold}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={goNext}>
            {currentStep >= 4 ? "Go to dashboard" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
