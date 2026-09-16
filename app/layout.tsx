import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  createMetadata,
  organizationJsonLd,
  websiteJsonLd,
  siteConfig,
} from "@/lib/seo";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createMetadata({
    title: "Home",
    description: siteConfig.description,
    path: "/",
    keywords: [
      "2D floor plan to 3D model",
      "property marketing assets",
    ],
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang="en"
      className={`${instrument.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="site-hatch flex min-h-full flex-col bg-bg-primary text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <div className="page-rail mx-auto w-full max-w-[1360px] flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
