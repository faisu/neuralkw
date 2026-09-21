import type { Metadata } from "next";
import { StudioApp } from "@/components/studio/StudioApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { studioCopy } from "@/content/copy/studio";
import {
  breadcrumbJsonLd,
  brandedTitle,
  createMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const description = studioCopy.metaDescription;

export const metadata: Metadata = createMetadata({
  title: studioCopy.metaTitle,
  description,
  path: "/studio",
  keywords: [
    "floor plan to 3D studio",
    "property visualization workspace",
  ],
});

export default function StudioPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: brandedTitle(studioCopy.metaTitle),
          description,
          path: "/studio",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Studio", path: "/studio" },
        ])}
      />
      <StudioApp />
    </>
  );
}
