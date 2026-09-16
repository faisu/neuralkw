import { VisualMock } from "@/components/marketing/TransformationVisual";
import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy/home";

export function ProductWorkflow() {
  return (
    <Reveal>
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border-subtle">
        {homeCopy.product.features.map((feature) => (
          <article key={feature.number} className="px-0 py-8 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#e8edf2]" aria-hidden="true">
              <VisualMock kind={feature.visual} className="h-full w-full" />
            </div>
            <h3 className="mt-5 text-[15px] font-medium text-text-primary">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
