import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  busy?: boolean;
  onClick?: () => void;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
  busy,
  onClick,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-[4px] px-5 py-2.5 text-sm font-medium transition-opacity focus-visible:outline-none";
  const styles = variant === "primary" ? "btn-primary" : "btn-secondary";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      onClick={onClick}
      className={`${base} ${styles} ${className} disabled:pointer-events-none disabled:opacity-50`}
      {...rest}
    >
      {children}
    </button>
  );
}
