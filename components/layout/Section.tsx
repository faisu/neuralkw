import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || description) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-text-muted">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
