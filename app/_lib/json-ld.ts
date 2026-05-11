import type { ClusterConfig } from "@/app/_data/clusters";

export const SITE_URL = "https://neuralkw.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Neural Kilowatt",
    alternateName: "NeuralKW",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NeuralKW",
    url: SITE_URL,
    publisher: { "@type": "Organization", name: "Neural Kilowatt" },
  };
}

function pageUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function webPageJsonLd(cluster: ClusterConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cluster.title.replace(/\s*\|\s*NeuralKW\s*$/, ""),
    description: cluster.description,
    url: pageUrl(cluster.path),
    inLanguage: cluster.lang,
    isPartOf: { "@type": "WebSite", name: "NeuralKW", url: SITE_URL },
  };
}

export function breadcrumbJsonLd(cluster: ClusterConfig) {
  const items = [
    { name: "Home", path: "/" },
    { name: cluster.title.replace(/\s*\|\s*NeuralKW\s*$/, "").slice(0, 48), path: cluster.path },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  };
}

export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
