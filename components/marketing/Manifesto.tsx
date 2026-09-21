import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy/home";

export function Manifesto() {
  const { manifesto } = homeCopy;

  return (
    <section className="border-y border-border-subtle">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="manifesto-rule mb-8 h-px w-24 bg-bg-ink" />
          <p className="max-w-md text-[17px] leading-relaxed text-text-muted">
            {manifesto.statement}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-[1.75rem] font-normal tracking-[-0.045em] text-text-primary sm:text-3xl md:text-[2.6rem] md:leading-[1.15]">
            {manifesto.headlineLead}{" "}
            <span className="text-text-faint">{manifesto.headlineMuted}</span>{" "}
            {manifesto.headlineEnd}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
