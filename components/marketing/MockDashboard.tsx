import { analyticsCopy } from "@/content/copy/analytics";

export function MockDashboard() {
  const { dashboardStats } = analyticsCopy;

  return (
    <div className="gradient-border rounded-2xl bg-bg-surface-deep p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">
            Analytics dashboard
          </p>
          <p className="mt-1 text-sm text-text-muted">Last 30 days</p>
        </div>
        <span className="rounded-md bg-accent-emerald/10 px-2 py-1 text-xs font-semibold text-accent-emerald">
          Live
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-bg-surface p-4"
          >
            <p className="text-xs text-text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-accent-emerald">{stat.change}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-32 items-end gap-2">
        {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 48, 90].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-accent-emerald/20 to-accent-cyan/60"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-text-muted">
        Exception rate over time
      </p>
    </div>
  );
}
