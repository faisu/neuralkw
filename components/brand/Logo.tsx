import Image from "next/image";
import Link from "next/link";

type LogoVariant = "full" | "header" | "icon";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "header", className = "", priority }: LogoProps) {
  if (variant === "full") {
    return (
      <Image
        src="/brand/logo-full.svg"
        alt="neuralkw — Agentic Bill Reconciliation"
        width={800}
        height={300}
        className={`h-auto w-full max-w-2xl ${className}`}
        priority={priority}
      />
    );
  }

  if (variant === "icon") {
    return (
      <Image
        src="/brand/logo-icon.svg"
        alt="neuralkw logo"
        width={40}
        height={40}
        className={`h-10 w-10 ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/logo-icon.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9"
        priority={priority}
      />
      <span className="text-xl font-extrabold tracking-tight text-white">
        neural<span className="text-gradient">kw</span>
      </span>
    </Link>
  );
}
