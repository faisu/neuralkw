type StepFlowProps = {
  steps: { step: string; title: string; description: string }[];
};

export function StepFlow({ steps }: StepFlowProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((item) => (
        <div key={item.step} className="relative">
          <span className="font-mono text-4xl font-bold text-accent-cyan/30">
            {item.step}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
