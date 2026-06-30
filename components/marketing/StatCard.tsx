import Link from "next/link";
import { Card } from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  href?: string;
};

export function StatCard({ label, value, detail, href }: StatCardProps) {
  const content = (
    <Card className="text-center transition-colors hover:bg-bg-surface-deep">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-gradient">{value}</p>
      {detail && (
        <p className="mt-1 text-sm text-text-muted">{detail}</p>
      )}
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

type StatGridProps = {
  stats: StatCardProps[];
};

export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
