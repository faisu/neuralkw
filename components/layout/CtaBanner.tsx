import Link from "next/link";

type CtaBannerProps = {
  headline: string;
  subcopy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBanner({
  headline,
  subcopy,
  primaryLabel = "Coming soon",
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-border-subtle px-2 py-16 text-left md:text-center">
          <h2 className="text-3xl font-normal tracking-[-0.04em] text-text-primary md:text-4xl">
            {headline}
          </h2>
          {subcopy && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted">
              {subcopy}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className="btn-primary inline-block rounded-lg px-8 py-3 text-base"
              >
                {primaryLabel}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="btn-primary inline-block cursor-not-allowed rounded-lg px-8 py-3 text-base opacity-60"
              >
                {primaryLabel}
              </span>
            )}
            {secondaryLabel &&
              (secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className="btn-secondary inline-block rounded-lg px-8 py-3 text-base"
                >
                  {secondaryLabel}
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="btn-secondary inline-block cursor-not-allowed rounded-lg px-8 py-3 text-base opacity-60"
                >
                  {secondaryLabel}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
