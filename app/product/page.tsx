import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Card } from "@/components/ui/Card";
import { productCopy } from "@/content/copy/product";
import {
  breadcrumbJsonLd,
  createMetadata,
  softwareApplicationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Product",
  description:
    "Automated bill reconciliation software that matches vendor invoices against prefilled agreements. AI agents detect rate mismatches, duplicates, and unauthorized charges.",
  path: "/product",
  keywords: [
    "automated bill reconciliation software",
    "vendor bill matching",
    "contract-based invoice audit",
  ],
});

export default function ProductPage() {
  const jsonLd = [
    softwareApplicationJsonLd(),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Product", path: "/product" },
    ]),
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan">
            Product
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {productCopy.hero.headline}
          </h1>
          <p className="mt-6 text-lg text-text-muted">{productCopy.hero.subcopy}</p>
        </div>
      </Section>

      {productCopy.features.map((feature, i) => (
        <Section
          key={feature.title}
          eyebrow={`Feature ${i + 1}`}
          title={feature.title}
          description={feature.description}
          className={i % 2 === 1 ? "bg-bg-surface-deep/50" : ""}
        >
          <ul className="grid gap-3 sm:grid-cols-3">
            {feature.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-xl bg-bg-surface px-4 py-3 text-sm text-text-muted"
              >
                <span className="mt-0.5 text-accent-emerald">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section
        eyebrow="Workflow outputs"
        title="Every bill gets a clear disposition"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {productCopy.outputs.map((output) => (
            <Card key={output.status}>
              <span
                className={`text-sm font-bold uppercase tracking-wider ${
                  output.color === "emerald"
                    ? "text-accent-emerald"
                    : output.color === "cyan"
                      ? "text-accent-cyan"
                      : "text-accent-blue"
                }`}
              >
                {output.status}
              </span>
              <p className="mt-2 text-sm text-text-muted">{output.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBanner
        headline="Start reconciling with agreement context"
        subcopy="Self-serve signup — upload your first agreement and bill batch today."
      />
    </main>
  );
}
