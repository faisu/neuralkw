"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ClusterConfig } from "@/app/_data/clusters";
import { DISCOMS, discomSearchText, type Discom } from "@/app/_data/discoms";
import {
  computeLeadTier,
  type ConnectionsBand,
  type SpendBand,
} from "@/app/_lib/lead-tier";
import { submitLead } from "@/app/_actions/submit-lead";
import { WhatsAppShareButton } from "@/app/_components/WhatsAppShareButton";

type Step = "entry" | "qualify" | "done";

function filterDiscoms(query: string): Discom[] {
  const q = query.trim().toLowerCase();
  if (!q) return DISCOMS.slice(0, 12);
  return DISCOMS.filter((d) => discomSearchText(d).includes(q)).slice(0, 20);
}

export function BillExplainer({ cluster }: { cluster: ClusterConfig }) {
  const [step, setStep] = useState<Step>("entry");
  const [tab, setTab] = useState<"autofetch" | "upload">(cluster.toolDefaultTab);
  const [discomQuery, setDiscomQuery] = useState("");
  const [selected, setSelected] = useState<Discom | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [consumerNumber, setConsumerNumber] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [hadUpload, setHadUpload] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [connections, setConnections] = useState<ConnectionsBand>("2-5");
  const [spend, setSpend] = useState<SpendBand>("50k-5L");
  const [contact, setContact] = useState("");
  const [preferWhatsapp, setPreferWhatsapp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [tier, setTier] = useState<ReturnType<typeof computeLeadTier> | null>(
    null,
  );

  const filtered = useMemo(() => filterDiscoms(discomQuery), [discomQuery]);

  useEffect(() => {
    function onPrefill(e: Event) {
      const ce = e as CustomEvent<{ consumerNumber?: string }>;
      if (ce.detail?.consumerNumber) {
        setConsumerNumber(ce.detail.consumerNumber);
        setTab("autofetch");
        setListOpen(true);
      }
    }
    window.addEventListener("nkw:prefill", onPrefill);
    return () => window.removeEventListener("nkw:prefill", onPrefill);
  }, []);

  const hint = selected?.consumerHint ?? "Format on your latest bill";

  const ctaPreview = useMemo(
    () => computeLeadTier(connections, spend),
    [connections, spend],
  );

  const ctaLabel =
    ctaPreview === "high"
      ? cluster.ctaLabels.high
      : ctaPreview === "low"
        ? cluster.ctaLabels.low
        : cluster.ctaLabels.mid;

  const goQualify = useCallback(() => {
    setFormError(null);
    if (tab === "autofetch") {
      if (!selected) {
        setFormError("Select your DISCOM.");
        return;
      }
      if (consumerNumber.trim().length < 5) {
        setFormError("Enter your consumer or account number.");
        return;
      }
      setHadUpload(false);
    } else {
      if (!hadUpload && !fileName) {
        setFormError("Upload a bill photo or PDF, or switch to auto-fetch.");
        return;
      }
    }
    setStep("qualify");
  }, [tab, selected, consumerNumber, hadUpload, fileName]);

  async function onSubmitLead(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const trimmed = contact.trim();
    if (preferWhatsapp) {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 10) {
        setFormError("Enter a valid 10-digit WhatsApp number.");
        return;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setFormError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    const res = await submitLead({
      clusterId: cluster.id,
      mode: tab,
      discomSlug: selected?.slug,
      consumerNumber: consumerNumber.trim() || undefined,
      hadUpload: tab === "upload" && (!!fileName || hadUpload),
      connections,
      monthlySpend: spend,
      email: preferWhatsapp ? undefined : trimmed,
      preferWhatsapp,
      whatsappNumber: preferWhatsapp ? trimmed : undefined,
    });
    setSubmitting(false);
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    setTier(res.tier);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div
        id="bill-explainer"
        className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-bold text-zinc-900">You&apos;re on the list</h2>
        <p className="mt-3 text-sm text-zinc-600">
          {tier === "high" && (
            <>
              Thanks — our team will reach out within one business day to book a
              short call.
            </>
          )}
          {tier === "mid" && (
            <>
              Thanks — we&apos;ll email your full report. Add a note in reply if
              you want a call too.
            </>
          )}
          {tier === "low" && (
            <>Thanks — we&apos;ll email your full report shortly.</>
          )}
        </p>
        {cluster.showWhatsAppShare && (
          <div className="mt-6">
            <WhatsAppShareButton clusterPath={cluster.path} />
          </div>
        )}
        <button
          type="button"
          className="mt-8 min-h-[44px] rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-800"
          onClick={() => {
            setStep("entry");
            setTier(null);
            setContact("");
            setPreferWhatsapp(false);
          }}
        >
          Decode another bill
        </button>
      </div>
    );
  }

  if (step === "qualify") {
    return (
      <div
        id="bill-explainer"
        className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-lg font-bold text-zinc-900">Almost there</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Used only to send your report. We don&apos;t sell, share, or subscribe
          you to anything.
        </p>
        <form className="mt-8 space-y-8" onSubmit={onSubmitLead}>
          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">
              How many electricity connections does your business have?
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ["1", "Just 1"],
                  ["2-5", "2–5"],
                  ["6-20", "6–20"],
                  ["20+", "20+"],
                ] as const
              ).map(([v, label]) => (
                <label
                  key={v}
                  className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2 has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-zinc-50"
                >
                  <input
                    type="radio"
                    name="connections"
                    value={v}
                    checked={connections === v}
                    onChange={() => setConnections(v)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">
              Total monthly electricity spend across all sites?
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ["<50k", "< ₹50k"],
                  ["50k-5L", "₹50k – 5L"],
                  ["5L-50L", "₹5L – 50L"],
                  ["50L+", "₹50L+"],
                ] as const
              ).map(([v, label]) => (
                <label
                  key={v}
                  className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2 has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-zinc-50"
                >
                  <input
                    type="radio"
                    name="spend"
                    value={v}
                    checked={spend === v}
                    onChange={() => setSpend(v)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-zinc-900"
            >
              Where should we send your detailed report?
            </label>
            <input
              id="contact"
              name="contact"
              type={preferWhatsapp ? "tel" : "email"}
              autoComplete={preferWhatsapp ? "tel" : "email"}
              inputMode={preferWhatsapp ? "numeric" : "email"}
              placeholder={preferWhatsapp ? "WhatsApp number" : "you@company.com"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-2 min-h-[48px] w-full rounded-xl border border-zinc-300 px-4 text-base outline-none focus:border-[var(--color-accent)]"
              required
            />
            <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={preferWhatsapp}
                onChange={(e) => {
                  setPreferWhatsapp(e.target.checked);
                  setContact("");
                }}
                className="h-4 w-4"
              />
              Send via WhatsApp instead
            </label>
          </div>

          {formError && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="min-h-[48px] w-full rounded-full bg-[var(--color-accent)] px-6 text-base font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Sending…" : ctaLabel}
          </button>
          <button
            type="button"
            className="min-h-[44px] w-full text-sm text-zinc-600 underline"
            onClick={() => setStep("entry")}
          >
            Back
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      id="bill-explainer"
      className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
        {cluster.toolHeading}
      </h2>

      <div
        className="mt-6 flex rounded-xl border border-zinc-200 p-1"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "autofetch"}
          className={`min-h-[44px] flex-1 rounded-lg px-3 text-sm font-medium ${
            tab === "autofetch"
              ? "bg-[var(--color-accent)] text-white"
              : "text-zinc-700"
          }`}
          onClick={() => setTab("autofetch")}
        >
          Auto-fetch (faster)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "upload"}
          className={`min-h-[44px] flex-1 rounded-lg px-3 text-sm font-medium ${
            tab === "upload"
              ? "bg-[var(--color-accent)] text-white"
              : "text-zinc-700"
          }`}
          onClick={() => setTab("upload")}
        >
          Upload bill copy
        </button>
      </div>

      {tab === "autofetch" ? (
        <div className="mt-6 space-y-4">
          <div className="relative">
            <label htmlFor="discom-search" className="text-sm font-medium text-zinc-800">
              DISCOM
            </label>
            <input
              id="discom-search"
              type="text"
              autoComplete="off"
              placeholder="Type state or acronym (e.g. MSEDCL, Karnataka)"
              value={discomQuery}
              onChange={(e) => {
                setSelected(null);
                setDiscomQuery(e.target.value);
                setListOpen(true);
              }}
              onFocus={() => setListOpen(true)}
              className="mt-1 min-h-[48px] w-full rounded-xl border border-zinc-300 px-4 text-base outline-none focus:border-[var(--color-accent)]"
            />
            {listOpen && filtered.length > 0 && (
              <ul
                className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
                role="listbox"
              >
                {filtered.map((d) => (
                  <li key={d.slug}>
                    <button
                      type="button"
                      className="flex min-h-[44px] w-full flex-col items-start px-4 py-2 text-left text-sm hover:bg-zinc-50"
                      onClick={() => {
                        setSelected(d);
                        setDiscomQuery(`${d.acronym} — ${d.state}`);
                        setListOpen(false);
                      }}
                    >
                      <span className="font-semibold text-zinc-900">
                        {d.acronym} — {d.name}
                      </span>
                      <span className="text-xs text-zinc-500">{d.state}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="consumer" className="text-sm font-medium text-zinc-800">
              Consumer number
            </label>
            <input
              id="consumer"
              name="consumer"
              inputMode="numeric"
              autoComplete="off"
              placeholder="From bill or SMS"
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              className="mt-1 min-h-[48px] w-full rounded-xl border border-zinc-300 px-4 text-base outline-none focus:border-[var(--color-accent)]"
            />
            <p className="mt-1 text-xs text-zinc-500">{hint}</p>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center">
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf,image/jpeg,image/png,image/webp,image/heic,.heic"
              capture="environment"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setFileName(f?.name ?? null);
                setHadUpload(!!f);
              }}
            />
            <span className="text-sm font-semibold text-zinc-800">
              Take photo / Choose file
            </span>
            <span className="mt-2 text-xs text-zinc-500">
              PDF, JPG, PNG, WEBP, HEIC · up to 10 MB
            </span>
            {fileName && (
              <span className="mt-3 text-sm text-[var(--color-accent)]">{fileName}</span>
            )}
          </label>
          <button
            type="button"
            className="text-sm text-zinc-600 underline"
            onClick={() => setTab("autofetch")}
          >
            Don&apos;t have your bill handy? Try auto-fetch
          </button>
        </div>
      )}

      {formError && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {formError}
        </p>
      )}

      <button
        type="button"
        className="mt-8 min-h-[48px] w-full rounded-full bg-[var(--color-accent)] px-6 text-base font-semibold text-white"
        onClick={goQualify}
      >
        Check my bill
      </button>

      {cluster.id === "bijli-bill" && (
        <p className="mt-3 text-center text-sm font-medium text-zinc-700">
          Bilkul free · Account banane ki zaroorat nahi · 10 second mein result
        </p>
      )}

      <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
        🔒 Your bill stays in India. We delete files in 90 days. No spam, ever.{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy policy
        </a>
      </p>
      <p className="mt-2 text-center text-[11px] text-zinc-400">
        Estimated savings on outputs are based on your bill and current tariff
        orders. Real savings depend on implementation.
      </p>
    </div>
  );
}
