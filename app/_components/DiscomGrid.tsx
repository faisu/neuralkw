import { DISCOMS } from "@/app/_data/discoms";

export function DiscomGrid() {
  const sorted = [...DISCOMS].sort((a, b) =>
    a.state.localeCompare(b.state) || a.acronym.localeCompare(b.acronym),
  );

  return (
    <section className="border-t border-zinc-200 bg-white py-14" aria-labelledby="discom-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="discom-heading" className="text-2xl font-bold text-zinc-900">
          DISCOMs we decode
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Broad India coverage — search in the tool above. Per-DISCOM deep pages ship next.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sorted.map((d) => (
            <div
              key={d.slug}
              className="min-h-[44px] rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-left text-xs leading-snug text-zinc-800"
            >
              <span className="font-semibold text-zinc-900">{d.acronym.trim()}</span>
              <span className="mt-0.5 block text-[11px] text-zinc-500">{d.state}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
