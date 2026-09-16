import Image from "next/image";
import Link from "next/link";

type LogoVariant = "full" | "header" | "icon";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="17" height="17" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 12.5h17M9.5 2.5v17" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ variant = "header", className = "", priority }: LogoProps) {
  if (variant === "full") {
    return (
      <Image
        src="/brand/logo-full.svg"
        alt="neuralkw — Transform 2D Layouts Into 3D Experiences"
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
    <Link href="/" aria-label="neuralkw home" className={`flex items-center gap-2 ${className}`}>
      <Mark />
      <span className="text-[17px] font-medium tracking-[-0.03em]">neuralkw</span>
    </Link>
  );
}
