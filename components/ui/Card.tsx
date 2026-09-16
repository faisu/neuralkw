import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`border-t border-border-subtle py-6 ${className}`}>
      {children}
    </div>
  );
}
