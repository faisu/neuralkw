import { Hero } from "@/components/marketing/Hero";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { StatGrid } from "@/components/marketing/StatCard";
import { MockReconciliation } from "@/components/marketing/MockReconciliation";
import { Section } from "@/components/layout/Section";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Card } from "@/components/ui/Card";
import { homeCopy } from "@/content/copy/home";
import { siteConfig } from "@/lib/seo";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Section
        eyebrow="The problem"
        title="Enterprise bill volume breaks manual workflows"
      >
        <FeatureGrid items={homeCopy.problems} />
      </Section>

      <Section
        eyebrow="Agent components"
        title="Onboarding, operations, and analytics"
        description="Three integrated components — one agent accessible by email or portal."
        className="bg-bg-surface-deep/50"
      >
        <div className="grid gap-8">
          {homeCopy.agentComponents.map((component) => (
            <Card key={component.title}>
              <h3 className="text-xl font-semibold text-white">{component.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{component.description}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {component.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="mt-0.5 text-accent-emerald">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Access"
        title={homeCopy.access.title}
        description={homeCopy.access.description}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-white">Email</h3>
            <p className="mt-2 text-sm text-text-muted">
              Forward bills, agreements, and onboarding documents directly to the agent.
            </p>
            <a
              href={`mailto:${siteConfig.agentEmail}`}
              className="mt-4 inline-block text-sm font-medium text-accent-cyan hover:underline"
            >
              {siteConfig.agentEmail}
            </a>
          </Card>
          <Card>
            <h3 className="font-semibold text-white">Portal</h3>
            <p className="mt-2 text-sm text-text-muted">
              Upload files, review reconciliations, and explore analytics in your workspace.
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
        eyebrow="Product preview"
        title="See agreement-aware matching in action"
        description="Every line item validated against your prefilled contract terms — exceptions surfaced instantly."
        className="bg-bg-surface-deep/50"
      >
        <MockReconciliation />
      </Section>

      <Section
        eyebrow="Analytics"
        title="Metrics that matter to finance ops"
        description="Track reconciliation quality and spend health across your entire vendor portfolio."
      >
        <StatGrid
          stats={homeCopy.analyticsTeaser.map((s) => ({
            ...s,
            href: "/analytics",
          }))}
        />
      </Section>

      <Section eyebrow="Enterprise ready" title="Built for teams that need trust" className="bg-bg-surface-deep/50">
        <div className="grid gap-6 md:grid-cols-3">
          {homeCopy.trust.map((item) => (
            <Card key={item.title}>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBanner
        headline={homeCopy.finalCta.headline}
        subcopy={homeCopy.finalCta.subcopy}
        primaryLabel={homeCopy.finalCta.primaryLabel}
      />
    </main>
  );
}
