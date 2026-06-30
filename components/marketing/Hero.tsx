import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/copy/home";

export function Hero() {
  const { hero } = homeCopy;

  return (
    <section className="grid-bg relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <Badge>AI</Badge>
          <div className="mt-8 w-full max-w-3xl">
            <Logo variant="full" priority className="mx-auto" />
          </div>
          <h1 className="mt-10 max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-muted">{hero.subcopy}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/signup">{hero.primaryCta}</Button>
            <Button href="/product" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
