import type { ClusterConfig } from "@/app/_data/clusters";

export function ThreeUpCards({ cluster }: { cluster: ClusterConfig }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="three-up-heading">
      <h2 id="three-up-heading" className="sr-only">
        What you will see
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {cluster.threeUp.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-zinc-900">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
