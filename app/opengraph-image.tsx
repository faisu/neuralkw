import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#F8F9FB",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 22,
              height: 22,
              border: "1.5px solid #08090B",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 28, color: "#08090B", letterSpacing: -0.6 }}>neuralkw</span>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            lineHeight: 1.05,
            color: "#08090B",
            letterSpacing: -2,
            fontWeight: 400,
            maxWidth: 900,
          }}
        >
          From floor plan to a living 3D story.
        </div>
        <p
          style={{
            marginTop: 28,
            fontSize: 24,
            color: "#565A60",
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </p>
      </div>
    ),
    { ...size },
  );
}
