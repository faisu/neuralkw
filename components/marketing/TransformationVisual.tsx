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
      <rect x="6" y="6" width="168" height="120" rx="2" fill="#f4f6f8" stroke="#08090b" strokeOpacity="0.22" />
      <path d="M6 54h168M90 6v120M6 90h84M132 54v72" fill="none" stroke="#08090b" strokeOpacity="0.18" />
      <rect x="18" y="18" width="54" height="24" fill="none" stroke="#1060c0" strokeOpacity="0.45" strokeDasharray="3 3" />
      <rect x="102" y="18" width="54" height="24" fill="none" stroke="#0f6e56" strokeOpacity="0.4" strokeDasharray="3 3" />
      <rect x="18" y="66" width="54" height="48" fill="none" stroke="#08090b" strokeOpacity="0.28" />
      <rect x="102" y="66" width="30" height="48" fill="none" stroke="#08090b" strokeOpacity="0.2" />
      <circle cx="90" cy="54" r="2.5" fill="#08090b" />
    </svg>
  );
}

export function Building3DMock({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 180 132"
      className={`block w-full ${className}`}
      aria-hidden="true"
    >
      <polygon points="90,18 150,46 90,74 30,46" fill="#e8ecef" stroke="#08090b" strokeOpacity="0.45" />
      <polygon points="30,46 90,74 90,118 30,90" fill="#f7f8fa" stroke="#08090b" strokeOpacity="0.35" />
      <polygon points="90,74 150,46 150,90 90,118" fill="#dfe4e9" stroke="#08090b" strokeOpacity="0.4" />
      <rect x="48" y="70" width="14" height="18" fill="#1060c0" fillOpacity="0.22" />
      <rect x="68" y="78" width="14" height="18" fill="#1060c0" fillOpacity="0.14" />
      <rect x="108" y="62" width="12" height="16" fill="#0f6e56" fillOpacity="0.2" />
      <rect x="124" y="54" width="12" height="16" fill="#0f6e56" fillOpacity="0.12" />
    </svg>
  );
}

export function VideoMock({ className = "" }: MockProps) {
  return (
    <svg
      viewBox="0 0 180 132"
      className={`block w-full ${className}`}
      aria-hidden="true"
    >
      <rect x="10" y="16" width="160" height="88" rx="4" fill="#eef1f4" stroke="#08090b" strokeOpacity="0.18" />
      <polygon points="78,46 112,60 78,74" fill="#08090b" fillOpacity="0.8" />
      <rect x="18" y="112" width="144" height="5" rx="2" fill="#d9dee4" />
      <rect x="18" y="112" width="64" height="5" rx="2" fill="#08090b" fillOpacity="0.55" />
    </svg>
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
      <polygon points="36,86 70,54 98,70 124,44 156,86" fill="#e4e9ee" stroke="#08090b" strokeOpacity="0.2" />
      <rect x="24" y="94" width="72" height="7" rx="2" fill="#d5dbe1" />
      <rect x="24" y="108" width="44" height="5" rx="2" fill="#08090b" fillOpacity="0.45" />
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
      <rect x="94" y="32" width="46" height="28" rx="1" fill="#dfe4e9" />
      <rect x="94" y="68" width="46" height="5" rx="1" fill="#c5ccd3" />
      <rect x="94" y="80" width="34" height="5" rx="1" fill="#d5dbe1" />
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
  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-[#e8edf2] shadow-[0_24px_60px_rgba(8,9,11,0.08)]">
      <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] bg-[#f8f9fb]">
        <aside className="border-r border-border-subtle p-3">
          <div className="h-2 w-16 rounded-full bg-bg-ink/70" />
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-12 rounded-full bg-black/10" />
            <div className="h-1.5 w-10 rounded-full bg-black/10" />
            <div className="h-6 rounded-sm bg-black/[0.04]" />
            <div className="h-1.5 w-14 rounded-full bg-black/10" />
            <div className="h-1.5 w-9 rounded-full bg-black/10" />
          </div>
        </aside>
        <div className="bg-[#eef2f6] p-4">
          <VisualMock kind={kind} />
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
