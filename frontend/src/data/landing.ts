import { Sparkles, BarChart3, Shield, Zap, MessageSquare, FileCheck } from "lucide-react";

export const LANDING_FEATURES = [
  { icon: Sparkles, title: "Deal discovery", desc: "AI detects renewals, quotes, and market gaps so you don't have to." },
  { icon: BarChart3, title: "Savings visibility", desc: "See monthly and annual savings, and why each deal was chosen." },
  { icon: Shield, title: "You stay in control", desc: "Approve deals, override terms, or request renegotiation anytime." },
  { icon: Zap, title: "Faster outcomes", desc: "Negotiations run in the background while you focus on the business." },
] as const;

export const LANDING_STEPS = [
  { num: 1, label: "Deal discovery", icon: Sparkles },
  { num: 2, label: "Negotiation messaging", icon: MessageSquare },
  { num: 3, label: "Offer evaluation", icon: FileCheck },
  { num: 4, label: "Deal recommendation", icon: BarChart3 },
  { num: 5, label: "Contract prep", icon: Shield },
] as const;

export const LANDING_STATS = [
  { value: "2.4x", label: "Average savings vs. manual" },
  { value: "70%", label: "Less time on renewals" },
  { value: "50+", label: "Deal types supported" },
] as const;

export const LANDING_FAQ = [
  {
    q: "What is DealMaker?",
    a: "DealMaker is an AI deal agent that finds, negotiates, and helps you close better commercial agreements. It watches renewals, quotes, and new opportunities across your tools, drafts the right messages, and recommends concrete offers you can approve in a few clicks.",
  },
  {
    q: "Who is DealMaker for?",
    a: "DealMaker is built for teams that juggle a lot of recurring spend but don’t have time to negotiate every contract: revenue and operations leaders, finance and procurement teams, and founders who wear all of those hats. If you manage a growing stack of SaaS, suppliers, or service contracts and care about savings and control, DealMaker is for you.",
  },
  {
    q: "Why choose DealMaker?",
    a: "DealMaker is not just a reporting tool or another inbox. It is an end-to-end agent that actually drives negotiations, with clear guardrails so you stay in control. You get measurable savings, time back on renewals, and a single place to review what changed in each deal and why—without rebuilding your stack or changing how your team works today.",
  },
  {
    q: "What kinds of deals can it handle?",
    a: "DealMaker supports SaaS subscriptions, suppliers, freelancers, logistics vendors, and marketing tools. During onboarding or in settings you choose which categories you want the agent to focus on. The agent then monitors renewals, quotes, and market gaps in those areas and negotiates on your behalf.",
  },
  {
    q: "How does the agent negotiate?",
    a: "The agent uses your preferences: target savings, negotiation style (conservative to aggressive), and auto-approve thresholds. It communicates with vendors, counters offers, and recommends deals. You see each step in the activity feed and can approve a deal, request renegotiation, or override terms at any time.",
  },
  {
    q: "Do I stay in control?",
    a: "Yes. You set rules for auto-approval (e.g. deals under a certain amount). Deals above that need your approval before closing. You can also reject a recommendation, ask the agent to push back, or change your preferences in settings whenever you want.",
  },
  {
    q: "Is my data secure?",
    a: "We treat vendor and deal data with strict security practices. You control what information the agent can access, and all recommendations are visible and auditable in your dashboard. Sign-in and account security follow industry standards.",
  },
  {
    q: "How do I get started?",
    a: "Sign up, complete the short onboarding (choose deal types, set savings targets and approval rules), then connect your tools or add deals. The agent starts discovering opportunities and negotiating. You can tweak preferences anytime in Settings.",
  },
] as const;

export type LandingFeature = (typeof LANDING_FEATURES)[number];
export type LandingStep = (typeof LANDING_STEPS)[number];
export type LandingStat = (typeof LANDING_STATS)[number];
export type LandingFaqItem = (typeof LANDING_FAQ)[number];
