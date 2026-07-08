import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Card } from "@/components/ui/Card";
import { productCopy } from "@/content/copy/product";
import {
  breadcrumbJsonLd,
  createMetadata,
  siteConfig,
  softwareApplicationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Product",
  description:
    "AI agent for bill reconciliation with onboarding, operations, and analytics. Access via email at agent@neuralkw.com or the neuralkw portal.",
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
          <p className="mt-4 text-sm text-text-muted">
            <span aria-disabled="true" className="cursor-not-allowed text-text-muted/70">
              Portal — coming soon
            </span>
            {" · "}
            <a
              href={`mailto:${siteConfig.agentEmail}`}
              className="text-accent-cyan hover:underline"
            >
              {siteConfig.agentEmail}
            </a>
          </p>
        </div>
      </Section>

      {productCopy.agentComponents.map((component, i) => (
        <Section
          key={component.title}
          eyebrow={component.title}
          title={component.title}
          description={component.description}
          className={i % 2 === 1 ? "bg-bg-surface-deep/50" : ""}
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {component.items.map((item) => (
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
        eyebrow="Access"
        title={productCopy.access.title}
        description={productCopy.access.description}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-white">Email the agent</h3>
            <p className="mt-2 text-sm text-text-muted">
              Send bills and onboarding materials to the shared agent inbox.
            </p>
            <a
              href={`mailto:${siteConfig.agentEmail}`}
              className="mt-4 inline-block font-mono text-sm text-accent-cyan hover:underline"
            >
              {siteConfig.agentEmail}
            </a>
          </Card>
          <Card>
            <h3 className="font-semibold text-white">Use the portal</h3>
            <p className="mt-2 text-sm text-text-muted">
              Manage onboarding, operations, and analytics in one workspace.
            </p>
            <span
              aria-disabled="true"
              className="mt-4 inline-block cursor-not-allowed text-sm font-medium text-text-muted"
            >
              Coming soon
            </span>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Workflow outputs"
        title="Every bill gets a clear disposition"
        className="bg-bg-surface-deep/50"
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
        headline="Access the agent by email or portal"
        subcopy={`Email ${siteConfig.agentEmail} to start onboarding your first site and agreement — portal access is coming soon.`}
        primaryLabel="Coming soon"
      />
    </main>
  );
}
