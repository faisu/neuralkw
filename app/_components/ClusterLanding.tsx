import type { ClusterId } from "@/app/_data/clusters";
import { CLUSTERS } from "@/app/_data/clusters";
import { BillExplainer } from "@/app/_components/BillExplainer";
import { BeforeAfterSlider } from "@/app/_components/BeforeAfterSlider";
import { ContentBody } from "@/app/_components/ContentBody";
import { DiscomGrid } from "@/app/_components/DiscomGrid";
import { FaqAccordion } from "@/app/_components/FaqAccordion";
import { Hero } from "@/app/_components/Hero";
import { HowItWorks } from "@/app/_components/HowItWorks";
import { JsonLd } from "@/app/_components/JsonLd";
import { StickyMobileCTA } from "@/app/_components/StickyMobileCTA";
import { ThreeUpCards } from "@/app/_components/ThreeUpCards";
import { TrustStrip } from "@/app/_components/TrustStrip";
import { UseCaseStrip } from "@/app/_components/UseCaseStrip";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
  webSiteJsonLd,
} from "@/app/_lib/json-ld";

export function ClusterLanding({ clusterId }: { clusterId: ClusterId }) {
  const cluster = CLUSTERS[clusterId];
  const isBijli = clusterId === "bijli-bill";

  const inner = (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={webPageJsonLd(cluster)} />
      <JsonLd data={breadcrumbJsonLd(cluster)} />

      <Hero cluster={cluster} />
      <TrustStrip />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-10">
        <aside className="lg:col-span-5 lg:sticky lg:top-20 lg:self-start">
          <BillExplainer cluster={cluster} />
        </aside>
        <div className="mt-10 space-y-0 lg:col-span-7 lg:mt-0">
          <UseCaseStrip cluster={cluster} />
          <ThreeUpCards cluster={cluster} />
          {cluster.showBeforeAfter && <BeforeAfterSlider />}
        </div>
      </div>

      <HowItWorks cluster={cluster} />
      <ContentBody cluster={cluster} />
      <DiscomGrid />
      <FaqAccordion cluster={cluster} />
      <StickyMobileCTA />
    </>
  );

  return (
    <main
      className={`min-h-0 flex-1 ${cluster.clusterClass}`}
      lang={isBijli ? "hi" : undefined}
    >
      {isBijli ? (
        <div className="cluster-bijli font-devanagari">{inner}</div>
      ) : (
        inner
      )}
    </main>
  );
}
