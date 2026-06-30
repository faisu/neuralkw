export const productCopy = {
  hero: {
    headline: "Agreement-aware reconciliation, powered by AI agents",
    subcopy:
      "Generic OCR tools extract data. neuralkw understands your contracts — matching every bill line against the terms that govern it.",
  },
  features: [
    {
      title: "Agreement context engine",
      description:
        "Structured ingestion of rate schedules, volume tiers, SLAs, and renewal terms. Your agreements become the source of truth for every reconciliation run.",
      items: [
        "Rate schedule parsing",
        "Multi-vendor contract mapping",
        "Term versioning and effective dates",
      ],
    },
    {
      title: "Agent reconciliation loop",
      description:
        "An AI agent orchestrates the full workflow — not a static rules engine. It reasons over bill context, agreement terms, and historical patterns.",
      items: [
        "Ingest → match → reason → escalate",
        "Confidence-scored decisions",
        "Human-in-the-loop for edge cases",
      ],
    },
    {
      title: "Exception handling",
      description:
        "Every discrepancy is classified, prioritized, and routed. Your team reviews only what matters.",
      items: [
        "Rate mismatch",
        "Quantity variance",
        "Billing period errors",
        "Duplicate charges",
        "Unauthorized line items",
      ],
    },
  ],
  outputs: [
    { status: "Approved", color: "emerald", description: "Bill matches agreement terms" },
    { status: "Disputed", color: "cyan", description: "Exception flagged for vendor follow-up" },
    { status: "Needs review", color: "blue", description: "Low-confidence match routed to AP team" },
  ],
};
