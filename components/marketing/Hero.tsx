import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/copy/home";

export function Hero() {
  const { hero } = homeCopy;

  return (
    <section className="relative min-h-[72vh] overflow-hidden">
      <div className="mx-auto flex min-h-[72vh] max-w-[1200px] flex-col justify-center px-6 py-20 md:px-10 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.7fr)] lg:gap-16">
          <h1 className="max-w-[12ch] text-[2.7rem] font-normal leading-[1.05] tracking-[-0.055em] text-text-primary sm:text-6xl md:text-[4.5rem] md:leading-[1.02]">
            {hero.headline}
            <br />
            <span className="text-text-faint">{hero.headlineMuted}</span> {hero.headlineEnd}
          </h1>
          <div className="max-w-sm lg:justify-self-end">
            <p className="text-[17px] leading-relaxed text-text-muted">{hero.subcopy}</p>
            <div className="mt-8">
              <Button href={hero.primaryHref}>{hero.primaryCta}</Button>
            </div>
            <p className="mt-4 text-xs text-text-faint">{hero.trust}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
