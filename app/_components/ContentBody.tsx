import type { ClusterConfig } from "@/app/_data/clusters";

export function ContentBody({ cluster }: { cluster: ClusterConfig }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6" aria-labelledby="read-your-bill">
        <h2 id="read-your-bill" className="text-2xl font-bold text-zinc-900">
          Read your bill
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Deep content for this topic cluster — scannable on mobile, expanded on desktop.
        </p>
        <div className="mt-10 space-y-6">
          {cluster.contentBody.map((section) => (
            <div key={section.h2}>
              <details className="group border-b border-zinc-200 pb-4 md:hidden">
                <summary className="cursor-pointer list-none py-2 text-lg font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {section.h2}
                    <span className="text-zinc-400 group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <div className="mt-2 space-y-3 text-base leading-relaxed text-zinc-700">
                  {section.paragraphs.map((p, i) => (
                    <p key={`m-${section.h2}-${i}`}>{p}</p>
                  ))}
                </div>
              </details>
              <div className="hidden md:block">
                <h3 className="text-xl font-semibold text-zinc-900">{section.h2}</h3>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-zinc-700">
                  {section.paragraphs.map((p, i) => (
                    <p key={`d-${section.h2}-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}
