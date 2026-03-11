import { Cloud, Box, Users, Truck, Megaphone } from "lucide-react";

export const ONBOARDING_STEPS = [
  {
    id: "welcome",
    title: "Welcome to DealMaker",
    description:
      "Your AI agent will find and negotiate deals so you can focus on the business.",
    welcomeText:
      "In the next steps we'll configure what kinds of deals you want help with and how assertive the agent should be.",
  },
  {
    id: "deals",
    title: "What deals do you want help with?",
    description:
      "Select the categories where you'd like the agent to find and negotiate.",
  },
  {
    id: "preferences",
    title: "Agent setup preferences",
    description:
      "Set targets and approval rules so the agent stays within your comfort zone.",
  },
  {
    id: "preview",
    title: "You're all set",
    description:
      "Your dashboard is ready. You can change these settings anytime.",
  },
] as const;

export const ONBOARDING_DEAL_TYPES = [
  { id: "saas", label: "SaaS subscriptions", icon: Cloud },
  { id: "suppliers", label: "Suppliers", icon: Box },
  { id: "freelancers", label: "Freelancers", icon: Users },
  { id: "logistics", label: "Logistics vendors", icon: Truck },
  { id: "marketing", label: "Marketing tools", icon: Megaphone },
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
