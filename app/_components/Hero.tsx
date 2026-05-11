import type { ClusterConfig } from "@/app/_data/clusters";

export function Hero({ cluster }: { cluster: ClusterConfig }) {
  return (
    <div
      id="hero"
      className="relative border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-16">
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
            className="relative hidden h-48 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white p-4">
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
            className="relative hidden h-48 overflow-hidden rounded-2xl border border-orange-200 bg-orange-50/50 shadow-sm lg:block"
            aria-hidden
          >
            <div className="p-4 text-sm text-zinc-700">
              <p className="text-xs font-medium text-orange-800">Annotated bill</p>
              <div className="relative mt-4 h-28 rounded-lg border border-dashed border-orange-300 bg-white">
                <span className="absolute left-2 top-2 rounded bg-orange-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Total
                </span>
                <span className="absolute right-3 top-8 text-lg font-bold text-zinc-900">
                  ₹52,180
                </span>
                <span className="absolute bottom-2 left-2 max-w-[70%] text-xs text-zinc-500">
                  Arrows map to charges below in the real tool.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
