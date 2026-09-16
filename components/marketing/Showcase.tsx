import { Reveal } from "@/components/ui/Reveal";
import { FloorPlanMock, VisualMock } from "@/components/marketing/TransformationVisual";
import { homeCopy } from "@/content/copy/home";

export function Showcase() {
  const { fromLabel, fromTitle, toLabel, outputs } = homeCopy.showcase;

  return (
    <Reveal>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <article>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-faint">
            {fromLabel}
          </p>
          <h3 className="mt-3 text-2xl font-normal tracking-[-0.03em] text-text-primary">
            {fromTitle}
          </h3>
          <div className="creative-tile mt-6 overflow-hidden rounded-lg bg-[#e8edf2]" aria-hidden="true">
            <FloorPlanMock className="max-h-64" />
          </div>
        </article>
        <div className="grid gap-8 sm:grid-cols-2">
          {outputs.map((output) => (
            <article key={output.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-faint">
                {toLabel}
              </p>
              <h3 className="mt-2 text-lg font-medium tracking-[-0.02em] text-text-primary">
                {output.title}
              </h3>
              <div className="creative-tile mt-4 overflow-hidden rounded-lg bg-[#e8edf2]" aria-hidden="true">
                <VisualMock kind={output.visual} className="max-h-32" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
