import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy/home";

export function WhyPlatform() {
  return (
    <Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeCopy.why.items.map((item) => (
          <Card
            key={item.title}
            className="h-full transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
          >
            <h3 className="text-lg font-medium text-text-primary">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.description}</p>
          </Card>
        ))}
      </div>
    </Reveal>
  );
}
