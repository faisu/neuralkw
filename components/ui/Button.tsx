import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity";
  const styles =
    variant === "primary"
      ? "btn-primary"
      : "btn-secondary";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${styles} ${className} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
