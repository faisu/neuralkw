import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090B",
          borderRadius: 36,
        }}
      >
        <svg width="92" height="92" viewBox="0 0 22 22" fill="none">
          <rect
            x="2.5"
            y="2.5"
            width="17"
            height="17"
            stroke="#F8F9FB"
            strokeWidth="1.5"
          />
          <path d="M2.5 12.5h17M9.5 2.5v17" stroke="#F8F9FB" strokeWidth="1.3" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
