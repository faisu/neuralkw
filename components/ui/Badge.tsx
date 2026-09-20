import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "ai" | "status";
};

export function Badge({ children, variant = "ai" }: BadgeProps) {
  const styles =
    variant === "ai"
      ? "border-border-subtle text-text-muted"
      : "border-accent-emerald text-accent-emerald";

  return (
    <span
      className={`inline-block rounded-[4px] border px-2 py-0.5 text-xs font-medium tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}
