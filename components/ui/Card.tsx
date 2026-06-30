import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`gradient-border rounded-2xl bg-bg-surface p-6 ${className}`}>
      {children}
    </div>
  );
}
