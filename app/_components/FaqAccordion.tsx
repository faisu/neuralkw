import type { ClusterConfig } from "@/app/_data/clusters";
import { JsonLd } from "@/app/_components/JsonLd";
import { faqPageJsonLd } from "@/app/_lib/json-ld";

export function FaqAccordion({ cluster }: { cluster: ClusterConfig }) {
  const jsonLd = faqPageJsonLd(cluster.faqs);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14 sm:px-6" aria-labelledby="faq-heading">
      <JsonLd data={jsonLd} />
      <h2 id="faq-heading" className="text-2xl font-bold text-zinc-900">
        FAQ
      </h2>
      <div className="mt-8 space-y-2">
        {cluster.faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-zinc-200 bg-white px-4 py-3"
          >
            <summary className="cursor-pointer list-none font-medium text-zinc-900 [&::-webkit-details-marker]:hidden">
              <span className="flex min-h-[44px] items-center justify-between gap-2">
                {item.q}
                <span className="text-zinc-400 group-open:rotate-180">▼</span>
              </span>
            </summary>
            <p className="mt-2 pb-2 text-sm leading-relaxed text-zinc-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
