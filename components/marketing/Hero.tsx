import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/copy/home";

export function Hero() {
  const { hero } = homeCopy;

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 md:pt-24 md:pb-10">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.7fr)] lg:gap-16">
          <h1 className="max-w-[12ch] text-[2.7rem] font-normal leading-[1.05] tracking-[-0.055em] text-text-primary sm:text-6xl md:text-[4.5rem] md:leading-[1.02]">
            <span className="hero-enter hero-enter-1 block">{hero.headline}</span>
            <span className="hero-enter hero-enter-2 mt-1 block">
              <span className="text-text-faint">{hero.headlineMuted}</span> {hero.headlineEnd}
            </span>
          </h1>
          <div className="hero-enter hero-enter-3 max-w-sm lg:justify-self-end">
            <p className="text-[17px] leading-relaxed text-text-muted">{hero.subcopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={hero.primaryHref}>{hero.primaryCta}</Button>
            </div>
            <p className="mt-4 text-xs text-text-faint">{hero.trust}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
