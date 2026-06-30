import Link from "next/link";

type CtaBannerProps = {
  headline: string;
  subcopy?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function CtaBanner({
  headline,
  subcopy,
  primaryLabel = "Start free",
  primaryHref = "/signup",
}: CtaBannerProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="gradient-border rounded-2xl bg-bg-surface px-8 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {headline}
          </h2>
          {subcopy && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted">
              {subcopy}
            </p>
          )}
          <Link
            href={primaryHref}
            className="btn-primary mt-8 inline-block rounded-lg px-8 py-3 text-base"
          >
            {primaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
