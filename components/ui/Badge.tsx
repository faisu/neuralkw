import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "ai" | "status";
};

export function Badge({ children, variant = "ai" }: BadgeProps) {
  const styles =
    variant === "ai"
      ? "border-accent-cyan text-accent-cyan"
      : "border-accent-emerald text-accent-emerald";

  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${styles}`}
    >
      {children}
    </span>
  );
}
