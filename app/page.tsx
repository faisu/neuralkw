import { Hero } from "@/components/marketing/Hero";
import { ProductWorkflow } from "@/components/marketing/ProductWorkflow";
import { Manifesto } from "@/components/marketing/Manifesto";
import { CapabilityStory } from "@/components/marketing/CapabilityStory";
import { UseCases } from "@/components/marketing/UseCases";
import { Showcase } from "@/components/marketing/Showcase";
import { WaitlistForm } from "@/components/marketing/WaitlistForm";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy/home";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Section id="product" className="border-t border-border-subtle pt-10 md:pt-12">
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
