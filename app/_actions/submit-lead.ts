"use server";

import { randomUUID } from "crypto";
import { appendFile, mkdir } from "fs/promises";
import { headers } from "next/headers";
import path from "path";
import type { ClusterId } from "@/app/_data/clusters";
import {
  computeLeadTier,
  type ConnectionsBand,
  type SpendBand,
} from "@/app/_lib/lead-tier";

export type { ConnectionsBand, SpendBand } from "@/app/_lib/lead-tier";
export type { LeadTier } from "@/app/_lib/lead-tier";

export type EntryMode = "autofetch" | "upload";

export type LeadPayload = {
  clusterId: ClusterId;
  mode: EntryMode;
  discomSlug?: string;
  consumerNumber?: string;
  hadUpload: boolean;
  connections: ConnectionsBand;
  monthlySpend: SpendBand;
  email?: string;
  preferWhatsapp: boolean;
  whatsappNumber?: string;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function normalizeWhatsapp(s: string) {
  return s.replace(/\D/g, "");
}

export async function submitLead(
  payload: LeadPayload,
): Promise<
  { ok: true; tier: ReturnType<typeof computeLeadTier> } | { ok: false; error: string }
> {
  if (payload.preferWhatsapp) {
    const w = normalizeWhatsapp(payload.whatsappNumber ?? "");
    if (w.length < 10) {
      return { ok: false, error: "Please enter a valid WhatsApp number." };
    }
  } else {
    const email = payload.email?.trim() ?? "";
    if (!isValidEmail(email)) {
      return { ok: false, error: "Please enter a valid email." };
    }
  }

  const allowedConn: ConnectionsBand[] = ["1", "2-5", "6-20", "20+"];
  const allowedSpend: SpendBand[] = ["<50k", "50k-5L", "5L-50L", "50L+"];

  if (!allowedConn.includes(payload.connections)) {
    return { ok: false, error: "Invalid connections selection." };
  }
  if (!allowedSpend.includes(payload.monthlySpend)) {
    return { ok: false, error: "Invalid spend selection." };
  }

  const tier = computeLeadTier(payload.connections, payload.monthlySpend);

  const h = await headers();
  const userAgent = h.get("user-agent") ?? "";

  const emailOut = payload.preferWhatsapp
    ? null
    : (payload.email?.trim() ?? null);
  const waOut = payload.preferWhatsapp
    ? normalizeWhatsapp(payload.whatsappNumber ?? "")
    : null;

  const line = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    cluster: payload.clusterId,
    mode: payload.mode,
    discomSlug: payload.discomSlug ?? null,
    consumerNumber: payload.consumerNumber ?? null,
    hadUpload: payload.hadUpload,
    connections: payload.connections,
    monthlySpend: payload.monthlySpend,
    email: emailOut,
    preferWhatsapp: payload.preferWhatsapp,
    whatsappNumber: waOut,
    tier,
    userAgent,
  };

  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "leads.jsonl");
  await mkdir(dir, { recursive: true });
  await appendFile(file, `${JSON.stringify(line)}\n`, "utf8");

  return { ok: true, tier };
}
