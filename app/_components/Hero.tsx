import type { ClusterConfig } from "@/app/_data/clusters";

const heroShell: Record<ClusterConfig["id"], string> = {
  "electricity-bills":
    "border-b border-zinc-200 bg-linear-to-b from-slate-50 via-white to-white",
  "power-bill":
    "border-b border-orange-200/80 bg-linear-to-b from-orange-50/90 via-white to-white",
  "bijli-bill":
    "border-b border-emerald-200/70 bg-linear-to-b from-emerald-50/80 via-white to-white",
  "light-bill":
    "border-b border-amber-200/80 bg-linear-to-b from-amber-50/90 via-orange-50/40 to-white",
};

export function Hero({ cluster }: { cluster: ClusterConfig }) {
  const shell = heroShell[cluster.id];

  return (
    <div id="hero" className={`relative ${shell}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:opacity-100">
        {cluster.id === "electricity-bills" && (
          <div
            className="absolute -right-8 top-0 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl motion-reduce:blur-none"
            aria-hidden
          />
        )}
        {cluster.id === "light-bill" && (
          <div
            className="absolute -left-4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-amber-200/30 blur-2xl motion-reduce:blur-none"
            aria-hidden
          />
        )}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-16">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            NeuralKW
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.25rem] lg:leading-tight">
            {cluster.h1}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-lg text-zinc-600">{cluster.sub}</p>
        </div>

        {cluster.id === "electricity-bills" && (
          <div
            className="relative mt-2 h-44 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-md ring-1 ring-blue-100/60 sm:h-48 lg:mt-0 lg:h-48"
            aria-hidden
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/90 to-white p-4">
              <p className="text-xs font-medium text-zinc-500">Sample decode</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between border-b border-zinc-100 py-1">
                  <span className="text-zinc-600">Energy charge</span>
                  <span className="font-semibold text-zinc-900">₹4,18,200</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 py-1">
                  <span className="text-zinc-600">Demand charge</span>
                  <span className="font-semibold text-zinc-900">₹1,02,400</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-600">FAC / FPPCA</span>
                  <span className="font-semibold text-amber-700">₹88,900</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {cluster.id === "power-bill" && (
          <div
            className="relative mt-2 h-44 overflow-hidden rounded-2xl border border-orange-200 bg-linear-to-br from-orange-50/80 to-white shadow-md sm:h-48 lg:mt-0 lg:h-48"
            aria-hidden
          >
            <div className="p-4 text-sm text-zinc-700">
              <p className="text-xs font-medium text-orange-800">Annotated bill</p>
              <div className="relative mt-3 h-29 rounded-lg border border-dashed border-orange-300 bg-white">
                <span className="absolute left-2 top-2 rounded bg-orange-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Total
                </span>
                <span className="absolute right-3 top-7 text-lg font-bold text-zinc-900">₹52,180</span>
                <span className="absolute bottom-2 left-2 max-w-[68%] text-xs text-zinc-500">
                  Each arrow ties a line on the bill to a plain-English note.
                </span>
                <span
                  className="absolute left-[42%] top-3 text-orange-600"
                  style={{ fontSize: "1.35rem", lineHeight: 1 }}
                >
                  ↘
                </span>
                <span
                  className="absolute left-[58%] top-10 text-orange-600"
                  style={{ fontSize: "1.2rem", lineHeight: 1 }}
                >
                  ↙
                </span>
                <span
                  className="absolute bottom-6 right-[18%] text-orange-500"
                  style={{ fontSize: "1.1rem", lineHeight: 1 }}
                >
                  ↑
                </span>
              </div>
            </div>
          </div>
        )}

        {cluster.id === "bijli-bill" && (
          <div
            className="relative mt-2 max-w-md overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg sm:mx-0 lg:mt-0 lg:max-w-none"
            aria-hidden
          >
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-3 py-2">
              <span className="text-xs font-semibold text-zinc-700">DISCOM update</span>
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                New
              </span>
            </div>
            <div className="bg-[#ece5dd] px-3 py-4">
              <div className="ml-6 max-w-[92%] rounded-2xl rounded-tr-sm bg-white p-2.5 text-xs text-zinc-700 shadow-sm ring-1 ring-black/5">
                <p className="font-medium text-zinc-800">Bill summary</p>
                <p className="mt-1 leading-snug text-zinc-600">
                  Unit consumption + FAC — short Hinglish note, easy forward on WhatsApp.
                </p>
              </div>
              <div className="ml-auto mt-2 max-w-[88%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-2.5 py-2 text-xs leading-snug text-zinc-800 shadow-sm">
                Consumer number paste kiya — breakdown mil gaya. Savings tip neeche.
              </div>
              <div className="mt-1 flex justify-end gap-0.5 pr-1 text-[10px] text-emerald-700">
                <span>✓✓</span>
                <span className="text-zinc-400">12:04</span>
              </div>
            </div>
          </div>
        )}

        {cluster.id === "light-bill" && (
          <div
            className="relative mt-2 overflow-hidden rounded-xl border-4 border-amber-900/90 bg-linear-to-b from-emerald-950 via-emerald-900 to-emerald-950 p-4 shadow-xl ring-2 ring-amber-600/30 sm:p-5 lg:mt-0"
            aria-hidden
          >
            <div className="absolute left-2 top-2 h-6 w-6 rounded-full border-2 border-amber-500/50 bg-amber-400/20" />
            <div className="absolute right-3 top-3 h-5 w-5 rounded-full border border-amber-400/40 bg-amber-300/15" />
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-200/90">
              Since tariff order
            </p>
            <p className="mt-1 text-center font-black uppercase tracking-tight text-amber-300 drop-shadow-sm sm:text-2xl">
              Light bill
            </p>
            <p className="mt-2 text-center text-xs font-medium text-amber-100/95">
              Kirana · clinic · workshop — units + duty, one glance
            </p>
            <div className="mx-auto mt-3 max-w-44 rounded border-2 border-dashed border-amber-400/50 bg-black/25 px-2 py-1.5 text-center">
              <span className="font-mono text-sm font-bold tabular-nums text-amber-200">₹ 3,842</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
