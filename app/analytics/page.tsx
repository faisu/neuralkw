import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { MockDashboard } from "@/components/marketing/MockDashboard";
import { Card } from "@/components/ui/Card";
import { analyticsCopy } from "@/content/copy/analytics";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Analytics",
  description:
    "Accounts payable analytics for enterprise bill reconciliation. Track exception rates, spend by vendor, agreement compliance scores, and time-to-reconcile SLAs.",
  path: "/analytics",
  keywords: [
    "accounts payable analytics",
    "spend anomaly detection",
    "reconciliation reporting",
  ],
});

export default function AnalyticsPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Analytics", path: "/analytics" },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan">
            Analytics
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {analyticsCopy.hero.headline}
          </h1>
          <p className="mt-6 text-lg text-text-muted">{analyticsCopy.hero.subcopy}</p>
        </div>
      </Section>

      <Section title="Dashboard preview">
        <MockDashboard />
      </Section>

      <Section
        eyebrow="Key metrics"
        title="What finance leaders track"
        className="bg-bg-surface-deep/50"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {analyticsCopy.metrics.map((metric) => (
            <Card key={metric.title}>
              <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{metric.description}</p>
              <p className="mt-4 font-mono text-sm text-accent-cyan">{metric.sample}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBanner
        headline="See your reconciliation data in one place"
        subcopy="Sign up to connect your first bill batch and unlock analytics."
      />
    </main>
  );
}
