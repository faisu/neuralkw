"use client";

import type { ClusterConfig } from "@/app/_data/clusters";

export function UseCaseStrip({ cluster }: { cluster: ClusterConfig }) {
  const strip = cluster.useCaseStrip;
  if (!strip?.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6" aria-label="Example shops">
      <p className="text-sm font-medium text-zinc-700">Try an example consumer number</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {strip.map((u) => (
          <button
            key={u.label}
            type="button"
            className="min-h-[44px] rounded-full border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-800 hover:border-[var(--color-accent)]"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("nkw:prefill", {
                  detail: { consumerNumber: u.sampleConsumerNumber },
                }),
              );
              document.getElementById("bill-explainer")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {u.label}
          </button>
        ))}
      </div>
    </section>
  );
}
