import type { ClusterConfig } from "@/app/_data/clusters";

export function HowItWorks({
  cluster,
}: {
  cluster: ClusterConfig;
}) {
  return (
    <section
      id="how-it-works"
      className="border-y border-zinc-200 bg-zinc-50 py-14"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="how-heading" className="text-2xl font-bold text-zinc-900">
          How it works
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {cluster.howItWorks.map((step, i) => (
            <div key={step.title} className="flex gap-4 md:block md:text-center">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white md:mx-auto"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
