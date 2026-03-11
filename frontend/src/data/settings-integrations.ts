export type IntegrationState = "connectable" | "connected" | "comingSoon";

export type IntegrationCategory =
  | "prospecting"
  | "communication"
  | "scheduling"
  | "documents"
  | "collaboration"
  | "crm";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  initialState: IntegrationState;
}

export const INTEGRATION_SECTIONS: { id: IntegrationCategory; title: string; description: string }[] = [
  {
    id: "prospecting",
    title: "Prospecting",
    description: "Let the agent discover and qualify prospects directly where your buyers live.",
  },
  {
    id: "communication",
    title: "Communication",
    description: "Give the agent access to the conversations it needs to respond, follow up, and close loops.",
  },
  {
    id: "scheduling",
    title: "Scheduling",
    description: "Allow the agent to propose and confirm times that work for you and your buyers.",
  },
  {
    id: "documents",
    title: "Documents & signing",
    description: "Connect the contracts, term sheets, and knowledge the agent needs to draft and finalize deals.",
  },
  {
    id: "collaboration",
    title: "Team collaboration",
    description: "Keep your team in the loop on what the agent is doing and when your input is needed.",
  },
  {
    id: "crm",
    title: "CRM (coming soon)",
    description: "Sync deals back to your system of record once we ship native CRM integrations.",
  },
];

export const INTEGRATIONS: Integration[] = [
  // Prospecting
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Prospect, research, and personalize outreach on the channels your buyers actually watch.",
    category: "prospecting",
    initialState: "connectable",
  },

  // Communication
  {
    id: "gmail",
    name: "Gmail",
    description: "Let the agent draft, send, and triage deal-related email from your existing inbox.",
    category: "communication",
    initialState: "connectable",
  },

  // Scheduling
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Allow the agent to propose and book meetings that respect your real availability.",
    category: "scheduling",
    initialState: "connectable",
  },

  // Documents & signing
  {
    id: "docusign",
    name: "DocuSign",
    description: "Connect the signing layer so the agent can push deals all the way to signature.",
    category: "documents",
    initialState: "connectable",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Future hub for deal playbooks, approvals, and internal knowledge.",
    category: "documents",
    initialState: "comingSoon",
  },

  // Team collaboration
  {
    id: "slack",
    name: "Slack",
    description: "Notify your team when the agent needs input or has moved a deal forward.",
    category: "collaboration",
    initialState: "connectable",
  },

  // CRM (coming soon)
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Coming soon - sync deals and activity into your primary CRM.",
    category: "crm",
    initialState: "comingSoon",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Coming soon - connect to your HubSpot CRM and marketing workflows.",
    category: "crm",
    initialState: "comingSoon",
  },
];

