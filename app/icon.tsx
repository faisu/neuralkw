import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        }}
      >
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
          <rect
            x="2.5"
            y="2.5"
            width="17"
            height="17"
            stroke="#F8F9FB"
            strokeWidth="1.6"
          />
          <path d="M2.5 12.5h17M9.5 2.5v17" stroke="#F8F9FB" strokeWidth="1.4" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
