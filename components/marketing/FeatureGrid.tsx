import { Card } from "@/components/ui/Card";

type FeatureGridProps = {
  items: { title: string; description: string }[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title}>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {item.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
