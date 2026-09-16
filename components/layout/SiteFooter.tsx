import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerLinks } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-bg-ink text-[#f8f9fb]">
      <div className="mx-auto max-w-[1360px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="header" className="text-[#f8f9fb]" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-sm text-white/55">
              <a href={`mailto:${siteConfig.agentEmail}`} className="hover:text-white">
                {siteConfig.agentEmail}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">Product</h2>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">Legal</h2>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 text-sm text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
