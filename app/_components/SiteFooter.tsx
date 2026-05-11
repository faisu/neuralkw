import Link from "next/link";
import { Wordmark } from "@/app/_components/Wordmark";

const clusterLinks = [
  { href: "/", label: "Electricity bills" },
  { href: "/power-bill", label: "Power bill" },
  { href: "/bijli-bill", label: "Bijli bill" },
  { href: "/light-bill", label: "Light bill" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 text-sm text-zinc-700">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Wordmark href="/" className="mb-3" />
            <p className="max-w-xs text-zinc-600">
              Bill explainer and savings signals for businesses across India.
            </p>
          </div>
          <div>
            <p className="mb-3 font-semibold text-zinc-900">Also available in</p>
            <ul className="space-y-2">
              {clusterLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-zinc-700 underline-offset-4 hover:text-[var(--color-accent-electricity)] hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-zinc-900">Legal</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-zinc-700 underline-offset-4 hover:underline"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/bill-explainer"
                  className="text-zinc-700 underline-offset-4 hover:underline"
                >
                  Bill decoder (direct link)
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-3xl border-t border-zinc-200 pt-8 text-xs leading-relaxed text-zinc-600">
          Neural Kilowatt — an electricity intelligence agent. Made in India ·
          Bill data stored in India under DPDP Act 2023.
        </p>
      </div>
    </footer>
  );
}
