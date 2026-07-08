import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/30 bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo variant="header" priority />
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span
            aria-disabled="true"
            className="btn-primary inline-block cursor-not-allowed rounded-lg px-4 py-2 text-sm opacity-60"
          >
            Coming soon
          </span>
        </div>
      </div>
    </header>
  );
}
