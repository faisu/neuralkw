import { Hero } from "@/components/marketing/Hero";
import { CreateStory } from "@/components/marketing/CreateStory";
import { VideoStory } from "@/components/marketing/VideoStory";
import { WebsiteStory } from "@/components/marketing/WebsiteStory";
import { PamphletStory } from "@/components/marketing/PamphletStory";
import { Manifesto } from "@/components/marketing/Manifesto";
import { CapabilityStory } from "@/components/marketing/CapabilityStory";
import { UseCases } from "@/components/marketing/UseCases";
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
      <CreateStory />

      <section id="product" className="scroll-mt-20 border-t border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16">
          <h2 className="max-w-3xl text-[1.85rem] font-normal tracking-[-0.04em] text-text-primary sm:text-3xl md:text-[2.45rem] md:leading-[1.15]">
            {homeCopy.product.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted md:text-[17px]">
            {homeCopy.product.subheading}
          </p>
        </div>
      </section>

      <VideoStory />
      <WebsiteStory />
      <PamphletStory />

      <Manifesto />

      <CapabilityStory />

      <Section id="use-cases" title={homeCopy.useCases.heading}>
        <UseCases />
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
