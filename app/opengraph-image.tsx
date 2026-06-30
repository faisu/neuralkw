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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1E293B 0%, #0B0F19 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "linear-gradient(135deg, #34D399, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#0B0F19"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: -1,
              }}
            >
              neural
              <span style={{ color: "#34D399" }}>kw</span>
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#94A3B8",
                letterSpacing: 4,
                marginTop: 4,
              }}
            >
              AGENTIC BILL RECONCILIATION
            </span>
          </div>
        </div>
        <p
          style={{
            marginTop: 40,
            fontSize: 24,
            color: "#94A3B8",
            maxWidth: 800,
            textAlign: "center",
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
