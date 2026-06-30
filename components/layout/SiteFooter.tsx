import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerLinks } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle/30 bg-bg-surface-deep">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="header" />
            <p className="mt-4 max-w-sm text-sm text-text-muted">
              {siteConfig.description}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-text-muted">
              {siteConfig.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border-subtle/20 pt-8 text-center text-sm text-text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
