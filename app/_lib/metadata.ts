import type { Metadata } from "next";
import type { ClusterId } from "@/app/_data/clusters";
import { CLUSTERS } from "@/app/_data/clusters";
import { SITE_URL } from "@/app/_lib/json-ld";

function pageUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function clusterMetadata(id: ClusterId): Metadata {
  const c = CLUSTERS[id];
  const canonical = pageUrl(c.path);

  const languages: Record<string, string> = {};

  if (c.path === "/") {
    languages["x-default"] = pageUrl("/");
    languages["en-IN"] = pageUrl("/");
    languages["hi-IN"] = pageUrl("/bijli-bill");
  } else if (c.path === "/bijli-bill") {
    languages["hi-IN"] = pageUrl("/bijli-bill");
    languages["en-IN"] = pageUrl("/");
  } else {
    languages["en-IN"] = canonical;
  }

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonical,
      locale: c.lang === "hi-IN" ? "hi_IN" : "en_IN",
      siteName: "NeuralKW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
    },
  };
}
