"use client";

import { LoopVideo } from "@/components/marketing/LoopVideo";
import { homeCopy } from "@/content/copy/home";

type MockProps = {
  className?: string;
};

export function FloorPlanMock({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 180 132"
      className={`block w-full ${className}`}
      aria-hidden="true"
    >
      <rect x="6" y="6" width="168" height="120" rx="1" fill="#f6f7f9" stroke="#08090b" strokeOpacity="0.2" />
      <rect x="16" y="18" width="78" height="56" fill="#eef3f8" stroke="#08090b" strokeOpacity="0.4" className="plan-draw" pathLength={1} />
      <rect x="94" y="18" width="60" height="56" fill="#e7f1eb" stroke="#08090b" strokeOpacity="0.32" className="plan-draw" pathLength={1} />
      <rect x="16" y="74" width="58" height="42" fill="#f1ebe3" stroke="#08090b" strokeOpacity="0.32" className="plan-draw" pathLength={1} />
      <rect x="74" y="74" width="28" height="42" fill="#eef1f4" stroke="#08090b" strokeOpacity="0.28" className="plan-draw" pathLength={1} />
      <rect x="102" y="74" width="52" height="42" fill="#d7eadc" stroke="#0f6e56" strokeOpacity="0.4" className="plan-draw" pathLength={1} />
      <path d="M54 74c0-7 8-7 8-7" fill="none" stroke="#1060c0" strokeOpacity="0.7" className="plan-draw" pathLength={1} />
      <path d="M94 46h8M40 18v5M120 18v5" stroke="#08090b" strokeOpacity="0.28" />
      <text x="28" y="48" fill="#565a60" fontSize="6" letterSpacing="1.2">LIVING</text>
      <text x="106" y="48" fill="#565a60" fontSize="6" letterSpacing="1.2">KITCHEN</text>
      <text x="26" y="98" fill="#565a60" fontSize="6" letterSpacing="1.2">BED</text>
      <text x="110" y="98" fill="#565a60" fontSize="6" letterSpacing="1.2">TERRACE</text>
    </svg>
  );
}

export function Building3DMock({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 180 132"
      className={`block w-full iso-float ${className}`}
      aria-hidden="true"
    >
      <polygon points="90,18 148,44 90,70 32,44" fill="#e8eef3" stroke="#08090b" strokeOpacity="0.4" />
      <polygon points="32,44 90,70 90,112 32,86" fill="#f6f8fa" stroke="#08090b" strokeOpacity="0.32" />
      <polygon points="90,70 148,44 148,86 90,112" fill="#d4dce4" stroke="#08090b" strokeOpacity="0.38" />
      <polygon points="90,70 124,55 124,86 90,101" fill="#d8ece0" stroke="#0f6e56" strokeOpacity="0.35" />
      <rect x="48" y="62" width="16" height="14" fill="#1060c0" fillOpacity="0.28" className="iso-window" />
      <rect x="112" y="52" width="12" height="12" fill="#0f6e56" fillOpacity="0.22" className="iso-window" />
      <polygon points="58,78 78,88 78,96 58,86" fill="#cfd8e1" />
      <polygon points="102,82 110,78 110,90 102,94" fill="#6f9a80" />
    </svg>
  );
}

export function VideoMock({ className = "" }: MockProps) {
  const clip = homeCopy.film.clips.find((item) => item.kind === "video" && item.id === "living");

  if (!clip || clip.kind !== "video") return null;

  return (
    <div className={`relative aspect-video overflow-hidden bg-[#111318] ${className}`}>
      <LoopVideo
        src={clip.src}
        poster={clip.poster}
        label={clip.label}
        decorative
        className="absolute inset-0"
      />
    </div>
  );
}

export function WebsiteMock({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 180 132"
      className={`block w-full ${className}`}
      aria-hidden="true"
    >
      <rect x="12" y="12" width="156" height="108" rx="4" fill="#f7f8fa" stroke="#08090b" strokeOpacity="0.16" />
      <rect x="12" y="12" width="156" height="16" fill="#e8ecef" />
      <circle cx="24" cy="20" r="2.4" fill="#c4c9cf" />
      <circle cx="34" cy="20" r="2.4" fill="#c4c9cf" />
      <circle cx="44" cy="20" r="2.4" fill="#c4c9cf" />
      <rect x="62" y="16" width="90" height="8" rx="4" fill="#ffffff" />
      <polygon points="28,92 62,52 92,70 118,40 156,92" fill="#dce5ec" stroke="#08090b" strokeOpacity="0.18" />
      <polygon points="92,70 118,40 118,92 92,92" fill="#c5d4c8" fillOpacity="0.7" />
      <rect x="24" y="98" width="72" height="7" rx="2" fill="#d5dbe1" />
      <rect x="24" y="110" width="44" height="5" rx="2" fill="#08090b" fillOpacity="0.45" />
    </svg>
  );
}

export function PamphletMock({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 180 132"
      className={`block w-full ${className}`}
      aria-hidden="true"
    >
      <rect x="28" y="18" width="54" height="96" rx="2" fill="#f7f8fa" stroke="#08090b" strokeOpacity="0.16" />
      <rect x="82" y="18" width="70" height="96" rx="2" fill="#eef1f4" stroke="#08090b" strokeOpacity="0.28" />
      <polygon points="116,36 148,50 116,64 84,50" fill="#e4edf3" stroke="#08090b" strokeOpacity="0.2" />
      <polygon points="84,50 116,64 116,78 84,64" fill="#f6f8fa" />
      <polygon points="116,64 148,50 148,64 116,78" fill="#cfd9e2" />
      <rect x="94" y="84" width="46" height="5" rx="1" fill="#c5ccd3" />
      <rect x="94" y="94" width="34" height="5" rx="1" fill="#d5dbe1" />
      <rect x="38" y="32" width="34" height="5" rx="1" fill="#08090b" fillOpacity="0.35" />
      <rect x="38" y="46" width="34" height="48" rx="1" fill="#e8ecef" />
    </svg>
  );
}

export function FlowArrow({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 48 24"
      className={`h-6 w-10 text-text-faint ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 12h38M32 4l12 8-12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="plan-draw"
        pathLength={1}
      />
    </svg>
  );
}

export type VisualKind = "model" | "video" | "website" | "pamphlet" | "plan";

export function VisualMock({ kind, className = "" }: { kind: VisualKind; className?: string }) {
  if (kind === "plan") return <FloorPlanMock className={className} />;
  if (kind === "model") return <Building3DMock className={className} />;
  if (kind === "video") return <VideoMock className={className} />;
  if (kind === "website") return <WebsiteMock className={className} />;
  return <PamphletMock className={className} />;
}

export function WorkspaceMock({ kind = "plan" }: { kind?: VisualKind }) {
  const video = kind === "video";

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-[#e8edf2] shadow-[0_24px_60px_rgba(8,9,11,0.08)]">
      <div className="grid grid-cols-1 bg-[#f8f9fb] sm:grid-cols-[7.5rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-border-subtle p-3 sm:block">
          <div className="h-2 w-16 rounded-full bg-bg-ink/70" />
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-12 rounded-full bg-black/10" />
            <div className="h-1.5 w-10 rounded-full bg-black/10" />
            <div className="h-6 rounded-sm bg-black/[0.04]" />
            <div className="h-1.5 w-14 rounded-full bg-black/10" />
            <div className="h-1.5 w-9 rounded-full bg-black/10" />
          </div>
        </aside>
        <div className={`relative bg-[#eef2f6] ${video ? "p-0" : "p-4"}`}>
          {!video && (
            <div className="hero-scene-grid pointer-events-none absolute inset-0 opacity-70" />
          )}
          <div className={video ? "aspect-video overflow-hidden bg-black" : "relative"}>
            <VisualMock kind={kind} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TransformationVisual() {
  return (
    <div
      className="mock-frame mx-auto mt-16 w-full max-w-5xl overflow-hidden rounded-lg p-4 sm:p-8"
      aria-hidden="true"
    >
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1.2fr]">
        <div className="rounded-md bg-bg-surface p-3">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-text-faint">
            2D Layout
          </p>
          <FloorPlanMock />
        </div>
        <div className="hidden justify-center sm:flex">
          <FlowArrow />
        </div>
        <div className="rounded-md bg-bg-surface p-3">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-text-faint">
            3D Model
          </p>
          <Building3DMock />
        </div>
        <div className="hidden justify-center sm:flex">
          <FlowArrow />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md bg-bg-surface p-2">
            <p className="mb-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-text-faint">
              Video
            </p>
            <VideoMock />
          </div>
          <div className="rounded-md bg-bg-surface p-2">
            <p className="mb-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-text-faint">
              Website
            </p>
            <WebsiteMock />
          </div>
          <div className="rounded-md bg-bg-surface p-2">
            <p className="mb-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-text-faint">
              Pamphlet
            </p>
            <PamphletMock />
          </div>
        </div>
      </div>
    </div>
  );
}
