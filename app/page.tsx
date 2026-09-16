import { Hero } from "@/components/marketing/Hero";
import { ProductWorkflow } from "@/components/marketing/ProductWorkflow";
import { Manifesto } from "@/components/marketing/Manifesto";
import { CapabilityStory } from "@/components/marketing/CapabilityStory";
import { UseCases } from "@/components/marketing/UseCases";
import { Showcase } from "@/components/marketing/Showcase";
import { FilmStage } from "@/components/marketing/FilmStage";
import { WaitlistForm } from "@/components/marketing/WaitlistForm";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeCopy } from "@/content/copy/home";
import { homeTitle, siteConfig, webPageJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          name: homeTitle,
          description: siteConfig.description,
          path: "/",
        })}
      />
      <Hero />

      <Section
        id="product"
        title={homeCopy.product.heading}
        description={homeCopy.product.subheading}
        className="border-t border-border-subtle pt-10 md:pt-12"
      >
        <ProductWorkflow />
      </Section>

      <Manifesto />

      <CapabilityStory />

      <Section id="use-cases" title={homeCopy.useCases.heading}>
        <UseCases />
      </Section>

      <Section title={homeCopy.showcase.heading} className="border-t border-border-subtle">
        <Showcase />
      </Section>

      <FilmStage />

      <Section
        id="waitlist"
        eyebrow={homeCopy.waitlist.eyebrow}
        title={homeCopy.waitlist.headline}
        description={homeCopy.waitlist.description}
        className="border-t border-border-subtle"
      >
        <Reveal>
          <WaitlistForm />
        </Reveal>
      </Section>
    </main>
  );
}
