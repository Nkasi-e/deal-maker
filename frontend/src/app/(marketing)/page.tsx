"use client";

import {
  LandingHeader,
  HeroSection,
  StatsStrip,
  FeaturesSection,
  HowItWorksSection,
  TestimonialSection,
  SavingsPreviewSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "@/components/marketing";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialSection />
        <SavingsPreviewSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
