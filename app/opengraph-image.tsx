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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
            <rect
              x="2.5"
              y="2.5"
              width="17"
              height="17"
              stroke="#08090B"
              strokeWidth="1.5"
            />
            <path d="M2.5 12.5h17M9.5 2.5v17" stroke="#08090B" strokeWidth="1.3" />
          </svg>
          <span style={{ fontSize: 28, color: "#08090B", letterSpacing: -0.6 }}>
            {siteConfig.name}
          </span>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            lineHeight: 1.05,
            color: "#08090B",
            letterSpacing: -2,
            fontWeight: 400,
            maxWidth: 920,
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
