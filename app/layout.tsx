import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteCursor } from "@/components/ui/SiteCursor";
import {
  createMetadata,
  homeTitle,
  siteConfig,
  siteJsonLd,
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

const homeMetadata = createMetadata({
  title: siteConfig.tagline,
  description: siteConfig.description,
  path: "/",
  keywords: [
    "property visualization platform",
    "real estate 3D walkthrough",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...homeMetadata,
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F9FB",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="site-hatch flex min-h-full flex-col bg-bg-primary text-text-primary">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <JsonLd data={siteJsonLd()} />
        <SiteCursor />
        {children}
      </body>
    </html>
  );
}
