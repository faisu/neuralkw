import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { MockDashboard } from "@/components/marketing/MockDashboard";
import { Card } from "@/components/ui/Card";
import { analyticsCopy } from "@/content/copy/analytics";
import { breadcrumbJsonLd, createMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Analytics",
  description:
    "Consumption analytics, infrastructure optimization, payment performance, and GHG emissions reporting. View in the portal or request via agent@neuralkw.com.",
  path: "/analytics",
  keywords: [
    "accounts payable analytics",
    "spend anomaly detection",
    "reconciliation reporting",
    "GHG emissions reporting",
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

      <Section title="Dashboard preview">
        <MockDashboard />
      </Section>

      <Section
        eyebrow="Analytics component"
        title="What finance and sustainability teams track"
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

      <Section
        eyebrow="Access"
        title={analyticsCopy.access.title}
        description={analyticsCopy.access.description}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-white">Portal dashboards</h3>
            <p className="mt-2 text-sm text-text-muted">
              Explore live consumption, payment, and emissions metrics in your workspace.
            </p>
            <span
              aria-disabled="true"
              className="mt-4 inline-block cursor-not-allowed text-sm font-medium text-text-muted"
            >
              Coming soon
            </span>
          </Card>
          <Card>
            <h3 className="font-semibold text-white">Email reports</h3>
            <p className="mt-2 text-sm text-text-muted">
              Request custom analytics digests and scheduled reports from the agent.
            </p>
            <a
              href={`mailto:${siteConfig.agentEmail}`}
              className="mt-4 inline-block font-mono text-sm text-accent-cyan hover:underline"
            >
              {siteConfig.agentEmail}
            </a>
          </Card>
        </div>
      </Section>

      <CtaBanner
        headline="See your analytics in the portal"
        subcopy={`Email ${siteConfig.agentEmail} for agent-delivered reports — portal access is coming soon.`}
        primaryLabel="Coming soon"
      />
    </main>
  );
}
