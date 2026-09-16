import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function ProductPage() {
  permanentRedirect("/#product");
}
