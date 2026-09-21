import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-[1360px] items-center justify-between px-4 sm:px-5 md:px-8">
        <Logo variant="header" priority />
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-text-primary transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/#waitlist" className="px-4 py-2 text-sm">
            Join waitlist
          </Button>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
