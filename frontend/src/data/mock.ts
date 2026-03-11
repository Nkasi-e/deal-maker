/**
 * Mock data for DealMaker UI - replace with API/TanStack Query later.
 */

export type DealCategory = "saas" | "suppliers" | "freelancers" | "logistics" | "marketing";

export interface Opportunity {
  id: string;
  title: string;
  category: DealCategory;
  vendor: string;
  currentPrice: number;
  marketBenchmark: number;
  potentialSavings: number;
  status: "detected" | "negotiating" | "evaluating" | "closed";
  detectedAt: string;
}

export interface NegotiationMessage {
  id: string;
  type: "agent" | "vendor" | "system";
  content: string;
  timestamp: string;
  reasoning?: string;
  offer?: { amount: number; validUntil?: string };
}

export interface VendorProfile {
  id: string;
  name: string;
  category: DealCategory;
  avgDiscount: number;
  responseSpeedHours: number;
  reliabilityScore: number;
  dealsClosed: number;
  historicalOutcomes: { date: string; savings: number }[];
}

export interface ActivityItem {
  id: string;
  type: "opportunity_detected" | "message_sent" | "vendor_replied" | "offer_countered" | "deal_reached" | "deal_approved";
  title: string;
  description: string;
  timestamp: string;
  dealId?: string;
  metadata?: Record<string, unknown>;
}

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "SaaS renewal detected",
    category: "saas",
    vendor: "Acme Software Inc.",
    currentPrice: 2400,
    marketBenchmark: 1920,
    potentialSavings: 480,
    status: "negotiating",
    detectedAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "opp-2",
    title: "Supplier quote opportunity",
    category: "suppliers",
    vendor: "Global Supplies Co.",
    currentPrice: 15000,
    marketBenchmark: 12750,
    potentialSavings: 2250,
    status: "detected",
    detectedAt: "2025-03-05T14:30:00Z",
  },
  {
    id: "opp-3",
    title: "Freelancer rate optimization",
    category: "freelancers",
    vendor: "Design Studio Pro",
    currentPrice: 8500,
    marketBenchmark: 7200,
    potentialSavings: 1300,
    status: "evaluating",
    detectedAt: "2025-03-03T09:00:00Z",
  },
  {
    id: "opp-4",
    title: "Marketing tools bundle",
    category: "marketing",
    vendor: "Growth Labs",
    currentPrice: 1200,
    marketBenchmark: 960,
    potentialSavings: 240,
    status: "detected",
    detectedAt: "2025-03-06T11:00:00Z",
  },
];

export const MOCK_NEGOTIATION_MESSAGES: NegotiationMessage[] = [
  {
    id: "m1",
    type: "agent",
    content: "We've been a customer for 2 years and would like to discuss renewal terms. Market rates for similar plans are around $1,920/year. Can you match or improve on that?",
    timestamp: "2025-03-04T10:00:00Z",
    reasoning: "Opened with relationship and market data to establish credibility and anchor the conversation.",
  },
  {
    id: "m2",
    type: "vendor",
    content: "Thanks for reaching out. We can offer a 15% loyalty discount, bringing the annual price to $2,040.",
    timestamp: "2025-03-04T14:30:00Z",
    offer: { amount: 2040 },
  },
  {
    id: "m3",
    type: "agent",
    content: "We're targeting $1,920 to align with our budget. Would you consider $1,980 with a 2-year commitment?",
    timestamp: "2025-03-05T09:00:00Z",
    reasoning: "Countered with a small concession (2-year lock) to create win-win and stay near target.",
    offer: { amount: 1980, validUntil: "2025-03-12" },
  },
  {
    id: "m4",
    type: "vendor",
    content: "We can do $1,980/year for a 2-year commitment. I'll send the updated agreement.",
    timestamp: "2025-03-05T16:00:00Z",
    offer: { amount: 1980 },
  },
];

export const MOCK_VENDORS: VendorProfile[] = [
  { id: "v1", name: "Acme Software Inc.", category: "saas", avgDiscount: 18, responseSpeedHours: 4, reliabilityScore: 92, dealsClosed: 12, historicalOutcomes: [] },
  { id: "v2", name: "Global Supplies Co.", category: "suppliers", avgDiscount: 12, responseSpeedHours: 24, reliabilityScore: 88, dealsClosed: 8, historicalOutcomes: [] },
  { id: "v3", name: "Design Studio Pro", category: "freelancers", avgDiscount: 15, responseSpeedHours: 12, reliabilityScore: 95, dealsClosed: 5, historicalOutcomes: [] },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "a1", type: "opportunity_detected", title: "Opportunity detected", description: "SaaS renewal - Acme Software Inc.", timestamp: "2025-03-06T08:00:00Z", dealId: "opp-1" },
  { id: "a2", type: "message_sent", title: "Agent sent message", description: "Opening negotiation with Acme Software.", timestamp: "2025-03-06T08:05:00Z", dealId: "opp-1" },
  { id: "a3", type: "vendor_replied", title: "Vendor replied", description: "Acme offered 15% loyalty discount.", timestamp: "2025-03-06T12:30:00Z", dealId: "opp-1" },
  { id: "a4", type: "offer_countered", title: "Agent countered offer", description: "Proposed $1,980 with 2-year commitment.", timestamp: "2025-03-07T09:00:00Z", dealId: "opp-1" },
  { id: "a5", type: "deal_reached", title: "Deal reached", description: "Acme accepted $1,980/year.", timestamp: "2025-03-07T16:00:00Z", dealId: "opp-1" },
];

export const MOCK_SAVINGS = {
  monthlySavings: 2840,
  annualSavings: 34080,
  dealsClosed: 7,
  activeNegotiations: 3,
  savingsTrend: [
    { month: "Oct", value: 1200 },
    { month: "Nov", value: 2100 },
    { month: "Dec", value: 1800 },
    { month: "Jan", value: 2500 },
    { month: "Feb", value: 3100 },
    { month: "Mar", value: 2840 },
  ],
  successRate: 78,
};

export const VENDOR_COMPARISON = [
  { vendor: "Acme Software Inc.", price: 1980, reliability: 92, deliveryDays: 0, score: 94 },
  { vendor: "TechVendor Pro", price: 2100, reliability: 88, deliveryDays: 0, score: 87 },
  { vendor: "CloudSuite", price: 1850, reliability: 85, deliveryDays: 0, score: 86 },
];
