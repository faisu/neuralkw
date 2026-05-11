import type { MetadataRoute } from "next";
import type { ClusterConfig } from "@/app/_data/clusters";
import { CLUSTERS } from "@/app/_data/clusters";
import { SITE_URL } from "@/app/_lib/json-ld";

function pageUrl(c: ClusterConfig) {
  if (c.path === "/") return SITE_URL;
  return `${SITE_URL}${c.path}`;
}

function alternates(c: ClusterConfig): MetadataRoute.Sitemap[0]["alternates"] {
  const languages: Record<string, string> = {};
  if (c.path === "/") {
    languages["x-default"] = pageUrl(c);
    languages["en-IN"] = pageUrl(c);
    languages["hi-IN"] = pageUrl(CLUSTERS["bijli-bill"]);
  } else if (c.path === "/bijli-bill") {
    languages["hi-IN"] = pageUrl(c);
    languages["en-IN"] = pageUrl(CLUSTERS["electricity-bills"]);
  } else {
    languages["en-IN"] = pageUrl(c);
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const clusters = Object.values(CLUSTERS);
  return clusters.map((c) => ({
    url: pageUrl(c),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: c.path === "/" ? 1 : 0.9,
    alternates: alternates(c),
  }));
}
