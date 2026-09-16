import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy/home";

export function UseCases() {
  return (
    <Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {homeCopy.useCases.items.map((item) => (
          <article
            key={item.title}
            className="border-t border-border-subtle py-7 pr-8 sm:odd:pr-10 lg:[&:nth-child(3n)]:pr-0"
          >
            <h3 className="text-[17px] font-medium tracking-[-0.02em] text-text-primary">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
