import { Reveal } from "@/components/ui/Reveal";
import { UseCaseIcon } from "@/components/marketing/UseCaseIcon";
import { homeCopy } from "@/content/copy/home";

export function UseCases() {
  return (
    <Reveal className="stagger-grid grid sm:grid-cols-2 lg:grid-cols-3">
      {homeCopy.useCases.items.map((item) => (
        <article
          key={item.title}
            className="use-case-card border-t border-border-subtle py-7 pr-4 sm:pr-8 sm:odd:pr-10 lg:[&:nth-child(3n)]:pr-0"
        >
          <UseCaseIcon name={item.icon} />
          <h3 className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-text-primary">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
        </article>
      ))}
    </Reveal>
  );
}
