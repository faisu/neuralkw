export const productCopy = {
  hero: {
    headline: "Three agent components — one reconciliation pipeline",
    subcopy:
      "Onboarding, operations, and analytics work together under a single agent. Access it by email at agent@neuralkw.com or through the neuralkw portal — same context, same audit trail, either channel.",
  },
  agentComponents: [
    {
      title: "Onboarding",
      description:
        "Before the first bill is matched, the agent catalogs your infrastructure, services, agreements, and consumption baselines.",
      items: [
        "Infrastructure listing (sites, locations, and facilities)",
        "Service type cataloguing",
        "Agreement and rate schedule listings",
        "Consumption and utilization baselines",
      ],
    },
    {
      title: "Operations",
      description:
        "The agent runs the full bill lifecycle — discovery, digitization, cash flow planning, and payment reconciliation against your agreements.",
      items: [
        "Bill discovery",
        "Bill digitization",
        "Cash flow planning",
        "Payment and reconciliations",
      ],
    },
    {
      title: "Analytics",
      description:
        "Every operations run feeds analytics — consumption trends, infrastructure efficiency, payment performance, and emissions reporting.",
      items: [
        "Consumption analytics",
        "Infrastructure optimization",
        "Payment performance",
        "Greenhouse gas (GHG) emissions",
      ],
    },
  ],
  access: {
    title: "Work via email or portal",
    description:
      "Send bills and onboarding documents to agent@neuralkw.com, or manage the full workflow in the portal. The agent maintains shared state across both channels.",
  },
  outputs: [
    { status: "Approved", color: "emerald", description: "Bill matches agreement terms" },
    { status: "Disputed", color: "cyan", description: "Exception flagged for vendor follow-up" },
    { status: "Needs review", color: "blue", description: "Low-confidence match routed to AP team" },
  ],
};
