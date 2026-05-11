export type ConnectionsBand = "1" | "2-5" | "6-20" | "20+";
export type SpendBand = "<50k" | "50k-5L" | "5L-50L" | "50L+";
export type LeadTier = "high" | "mid" | "low";

export function computeLeadTier(
  connections: ConnectionsBand,
  spend: SpendBand,
): LeadTier {
  const highConn = connections === "6-20" || connections === "20+";
  const highSpend = spend === "5L-50L" || spend === "50L+";
  if (highConn || highSpend) return "high";
  if (connections === "1" && spend === "<50k") return "low";
  return "mid";
}
