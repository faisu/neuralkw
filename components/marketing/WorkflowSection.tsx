import { Reveal } from "@/components/ui/Reveal";
import {
  Building3DMock,
  FloorPlanMock,
  PamphletMock,
  VideoMock,
  WebsiteMock,
} from "@/components/marketing/TransformationVisual";
import { homeCopy } from "@/content/copy/home";

const stepVisuals = [
  <FloorPlanMock key="plan" />,
  <Building3DMock key="model" />,
  <div key="assets" className="grid grid-cols-3 gap-1">
    <VideoMock />
    <WebsiteMock />
    <PamphletMock />
  </div>,
];

export function WorkflowSection() {
  const { steps, statement } = homeCopy.workflow;

  return (
    <Reveal>
      <ol className="relative grid gap-8 lg:grid-cols-3">
        <span
          className="workflow-line pointer-events-none absolute top-16 right-[16%] left-[16%] z-0 hidden h-px lg:block"
          aria-hidden="true"
        />
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            {index < steps.length - 1 ? (
              <span
                className="workflow-line-vertical absolute top-full left-6 h-8 w-px lg:hidden"
                aria-hidden="true"
              />
            ) : null}
            <article className="relative z-10 border border-border-subtle bg-bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle font-mono text-sm font-medium text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-text-primary">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{step.description}</p>
              <div className="mt-5 min-h-40 overflow-hidden rounded-xl bg-bg-primary/70 p-3" aria-hidden="true">
                {stepVisuals[index]}
              </div>
            </article>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center text-lg font-medium text-text-primary">{statement}</p>
    </Reveal>
  );
}
