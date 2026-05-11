import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { SiteHeader } from "@/app/_components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://neuralkw.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NeuralKW — Electricity bills, decoded",
  description:
    "Decode your electricity bill across India. Consumer number or upload — plain-English charges and savings signals for businesses.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "NeuralKW",
    title: "NeuralKW — Electricity bills, decoded",
    description:
      "Decode your electricity bill across India. Consumer number or upload — plain-English charges and savings signals for businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuralKW — Electricity bills, decoded",
    description:
      "Decode your electricity bill across India. Consumer number or upload — plain-English charges and savings signals for businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
