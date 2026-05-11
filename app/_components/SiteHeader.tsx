"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/app/_components/Wordmark";

const CLUSTER_PATHS = new Set(["/", "/power-bill", "/bijli-bill", "/light-bill"]);

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const base = CLUSTER_PATHS.has(pathname) ? pathname : "/";

  const nav = [
    { href: `${base}#bill-explainer`, label: "Decoder" },
    { href: `${base}#how-it-works`, label: "How it works" },
    { href: `${base}#faq`, label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark href="/" />
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-[44px] min-w-[44px] content-center hover:text-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={`${base}#bill-explainer`}
          className="rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white sm:hidden"
        >
          Check bill
        </Link>
      </div>
    </header>
  );
}
