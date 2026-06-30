export function MockReconciliation() {
  const rows = [
    { line: "Data transfer — Tier 2", agreed: "$0.08/GB", billed: "$0.12/GB", status: "Exception" },
    { line: "Monthly platform fee", agreed: "$4,200", billed: "$4,200", status: "Approved" },
    { line: "Support hours (10 hrs)", agreed: "$150/hr", billed: "$175/hr", status: "Exception" },
    { line: "Storage — 2TB included", agreed: "Included", billed: "$890", status: "Exception" },
  ];

  return (
    <div className="gradient-border overflow-hidden rounded-2xl bg-bg-surface-deep">
      <div className="border-b border-border-subtle/20 px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">
          Live reconciliation preview
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Vendor: Acme Telecom · Agreement: MSA-2024-0892
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle/20 text-xs uppercase tracking-wider text-text-muted">
              <th className="px-6 py-3 font-semibold">Line item</th>
              <th className="px-6 py-3 font-semibold">Agreement</th>
              <th className="px-6 py-3 font-semibold">Billed</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.line}
                className="border-b border-border-subtle/10 last:border-0"
              >
                <td className="px-6 py-4 text-white">{row.line}</td>
                <td className="px-6 py-4 font-mono text-text-muted">{row.agreed}</td>
                <td className="px-6 py-4 font-mono text-text-muted">{row.billed}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      row.status === "Approved"
                        ? "text-accent-emerald"
                        : "text-accent-cyan"
                    }
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
