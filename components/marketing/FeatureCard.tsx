import { Card } from "@/components/ui/Card";
import { FlowArrow, VisualMock, type VisualKind } from "@/components/marketing/TransformationVisual";

type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
  input: string;
  output: string;
  visual: VisualKind;
};

export function FeatureCard({
  number,
  title,
  description,
  input,
  output,
  visual,
}: FeatureCardProps) {
  return (
    <Card className="flex h-full flex-col transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none">
      <p className="font-mono text-xs font-bold tracking-[0.2em] text-accent-cyan/70">
        {number}
      </p>
      <h3 className="mt-3 text-lg font-medium text-text-primary">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{description}</p>
      <div className="mt-6 overflow-hidden rounded-xl bg-bg-primary/70 p-3" aria-hidden="true">
        <VisualMock kind={visual === "model" ? "plan" : "model"} className="max-h-24" />
        <div className="mt-2 flex justify-center">
          <FlowArrow className="h-4 w-8 rotate-90" />
        </div>
        <VisualMock kind={visual} className="max-h-24" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-full border border-border-subtle/50 px-3 py-1 text-text-muted">
          {input}
        </span>
        <span className="text-accent-cyan" aria-hidden="true">
          →
        </span>
        <span className="rounded-full border border-accent-emerald/40 px-3 py-1 text-accent-emerald">
          {output}
        </span>
      </div>
    </Card>
  );
}
