import { Hero } from "@/components/marketing/Hero";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { StepFlow } from "@/components/marketing/StepFlow";
import { StatGrid } from "@/components/marketing/StatCard";
import { MockReconciliation } from "@/components/marketing/MockReconciliation";
import { Section } from "@/components/layout/Section";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Card } from "@/components/ui/Card";
import { homeCopy } from "@/content/copy/home";

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
        eyebrow="How it works"
        title="Three steps to agentic reconciliation"
        className="bg-bg-surface-deep/50"
      >
        <StepFlow steps={homeCopy.steps} />
      </Section>

      <Section
        eyebrow="Product preview"
        title="See agreement-aware matching in action"
        description="Every line item validated against your prefilled contract terms — exceptions surfaced instantly."
      >
        <MockReconciliation />
      </Section>

      <Section
        eyebrow="Analytics"
        title="Metrics that matter to finance ops"
        description="Track reconciliation quality and spend health across your entire vendor portfolio."
        className="bg-bg-surface-deep/50"
      >
        <StatGrid
          stats={homeCopy.analyticsTeaser.map((s) => ({
            ...s,
            href: "/analytics",
          }))}
        />
      </Section>

      <Section eyebrow="Enterprise ready" title="Built for teams that need trust">
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
      />
    </main>
  );
}
