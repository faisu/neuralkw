import type { Metadata } from "next";

export const siteConfig = {
  name: "neuralkw",
  tagline: "Transform 2D Layouts Into 3D Experiences",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://neuralkw.com",
  description:
    "An end-to-end visualization platform for property marketing. Transform 2D floor plans into 3D models, walkthrough videos, websites, and pamphlets.",
  contactEmail: "privacy@neuralkw.com",
  agentEmail: "agent@neuralkw.com",
  locale: "en_US",
};

export const defaultKeywords = [
  "2D to 3D property visualization",
  "real estate marketing platform",
  "3D property model",
  "property walkthrough video",
  "2D floor plan to 3D model",
  "property marketing assets",
];

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  index?: boolean;
};

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return siteConfig.url;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function brandedTitle(title: string) {
  return `${title} | ${siteConfig.name}`;
}

export const homeTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  index = true,
}: PageMeta): Metadata {
  const isHome = path === "/";
  const canonical = absoluteUrl(path);
  const ogTitle = isHome ? homeTitle : brandedTitle(title);

  return {
    title: isHome ? { absolute: homeTitle } : title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    keywords: [...defaultKeywords, ...keywords],
    referrer: "origin-when-cross-origin",
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const softwareId = `${siteConfig.url}/#software`;

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        email: siteConfig.contactEmail,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/brand/logo-icon.svg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteConfig.description,
        url: siteConfig.url,
        publisher: { "@id": organizationId },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
      },
    ],
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    about: { "@id": softwareId },
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
