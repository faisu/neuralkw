import type { ReactNode } from "react";

type Point3 = [number, number, number?];

const OX = 268;
const OY = 168;
const SX = 2.15;
const SY = 1.05;

function iso(x: number, y: number, z = 0) {
  return {
    x: OX + (x - y) * SX,
    y: OY + (x + y) * SY - z,
  };
}

function poly(...points: Point3[]) {
  return points
    .map(([x, y, z = 0]) => {
      const point = iso(x, y, z);
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    })
    .join(" ");
}

function IsoBox({
  x,
  y,
  w,
  d,
  h,
  top,
  left,
  right,
  delay,
  stroke = "rgba(8,9,11,0.38)",
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  delay: number;
  stroke?: string;
}) {
  return (
    <g className="iso-rise" style={{ animationDelay: `${delay}ms` }}>
      <polygon points={poly([x, y, h], [x + w, y, h], [x + w, y + d, h], [x, y + d, h])} fill={top} stroke={stroke} strokeWidth="0.7" />
      <polygon points={poly([x, y, h], [x, y + d, h], [x, y + d, 0], [x, y, 0])} fill={left} stroke={stroke} strokeWidth="0.7" />
      <polygon points={poly([x, y + d, h], [x + w, y + d, h], [x + w, y + d, 0], [x, y + d, 0])} fill={right} stroke={stroke} strokeWidth="0.7" />
    </g>
  );
}

function IsoResidence() {
  const H = 36;

  return (
    <svg viewBox="0 0 520 340" className="h-full w-full iso-float" aria-hidden="true">
      <g className="scan-sweep" opacity="0.35">
        <polygon
          points={poly([0, 0, 0], [112, 0, 0], [112, 90, 0], [0, 90, 0])}
          fill="url(#scanFill)"
        />
      </g>
      <defs>
        <linearGradient id="scanFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1060c0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1060c0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0f6e56" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon
        className="ground-plate"
        points={poly([-6, -6, 0], [118, -6, 0], [118, 96, 0], [-6, 96, 0])}
        fill="#e6ebf0"
        stroke="rgba(8,9,11,0.12)"
        strokeWidth="0.8"
      />

      <IsoBox x={0} y={0} w={64} d={48} h={H} top="#e7edf3" left="#d3dbe3" right="#c2cad3" delay={1600} />
      <IsoBox x={64} y={0} w={48} d={48} h={H} top="#e4efe9" left="#cfe0d6" right="#bdd4c7" delay={1760} />
      <IsoBox x={0} y={48} w={48} d={42} h={H} top="#efe8df" left="#e0d4c6" right="#d2c4b4" delay={1920} />
      <IsoBox x={48} y={48} w={24} d={42} h={H} top="#eceff3" left="#d5dce4" right="#c5ced8" delay={2040} />
      <IsoBox x={72} y={48} w={40} d={42} h={9} top="#d5eadc" left="#b9d4c3" right="#a6c7b4" delay={2160} />

      <polygon
        className="iso-window"
        points={poly([18, 48, 28], [46, 48, 28], [46, 48, 10], [18, 48, 10])}
        fill="#1060c0"
        fillOpacity="0.28"
        stroke="rgba(16,96,192,0.45)"
        strokeWidth="0.6"
      />
      <polygon
        className="iso-window"
        points={poly([112, 10, 28], [112, 38, 28], [112, 38, 10], [112, 10, 10])}
        fill="#0f6e56"
        fillOpacity="0.22"
        stroke="rgba(15,110,86,0.4)"
        strokeWidth="0.6"
      />

      <IsoBox x={10} y={8} w={26} d={9} h={8} top="#d9e2ea" left="#c5d0da" right="#b4c0cb" delay={2400} />
      <IsoBox x={22} y={24} w={14} d={14} h={6} top="#f7f8fa" left="#e4e9ee" right="#d4dbe2" delay={2480} />
      <IsoBox x={70} y={6} w={36} d={8} h={10} top="#d7e6dd" left="#c0d4c8" right="#adc6b8" delay={2560} />
      <IsoBox x={8} y={58} w={24} d={16} h={7} top="#e8ddd0" left="#d4c4b2" right="#c4b39e" delay={2640} />
      <IsoBox x={84} y={62} w={8} d={8} h={14} top="#7aa58c" left="#5e8a72" right="#4f7a64" delay={2720} stroke="rgba(15,110,86,0.45)" />
      <IsoBox x={98} y={70} w={6} d={6} h={11} top="#8bb59a" left="#6b947c" right="#5c846d" delay={2800} stroke="rgba(15,110,86,0.45)" />

      <path
        className="walk-path"
        d={`M ${iso(28, 18, 1).x} ${iso(28, 18, 1).y}
            L ${iso(58, 28, 1).x} ${iso(58, 28, 1).y}
            L ${iso(86, 58, 10).x} ${iso(86, 58, 10).y}
            L ${iso(98, 78, 10).x} ${iso(98, 78, 10).y}`}
        fill="none"
        stroke="#08090b"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />

      <text x={iso(18, 18, 40).x} y={iso(18, 18, 40).y} className="iso-label">
        LIVING
      </text>
      <text x={iso(78, 16, 40).x} y={iso(78, 16, 40).y} className="iso-label">
        KITCHEN
      </text>
      <text x={iso(12, 66, 40).x} y={iso(12, 66, 40).y} className="iso-label">
        BED
      </text>
      <text x={iso(82, 62, 16).x} y={iso(82, 62, 16).y} className="iso-label">
        TERRACE
      </text>
    </svg>
  );
}

function PlanSheet() {
  return (
    <svg viewBox="0 0 220 176" className="h-full w-full" aria-hidden="true">
      <rect x="8" y="8" width="204" height="160" fill="#f7f8fa" stroke="#08090b" strokeOpacity="0.2" />
      <rect x="18" y="22" width="92" height="70" fill="#eef3f8" className="plan-draw" pathLength={1} stroke="#08090b" strokeOpacity="0.55" />
      <rect x="110" y="22" width="70" height="70" fill="#e7f1eb" className="plan-draw" pathLength={1} stroke="#08090b" strokeOpacity="0.45" />
      <rect x="18" y="92" width="70" height="60" fill="#f1ebe3" className="plan-draw" pathLength={1} stroke="#08090b" strokeOpacity="0.45" />
      <rect x="88" y="92" width="34" height="60" fill="#eef1f4" className="plan-draw" pathLength={1} stroke="#08090b" strokeOpacity="0.35" />
      <rect x="122" y="92" width="58" height="60" fill="#d8ecdf" className="plan-draw" pathLength={1} stroke="#0f6e56" strokeOpacity="0.45" />
      <path d="M18 22h162v130H18z" fill="none" className="plan-draw plan-draw-slow" pathLength={1} stroke="#08090b" strokeOpacity="0.22" />
      <path d="M62 92c0-8 8-8 8-8" fill="none" className="plan-draw" pathLength={1} stroke="#1060c0" strokeOpacity="0.7" />
      <path d="M110 56h8" fill="none" className="plan-draw" pathLength={1} stroke="#1060c0" strokeOpacity="0.7" />
      <path d="M40 22v4M70 22v4M140 22v4" stroke="#08090b" strokeOpacity="0.28" />
      <text x="34" y="58" className="plan-label">
        LIVING
      </text>
      <text x="124" y="58" className="plan-label">
        KITCHEN
      </text>
      <text x="34" y="124" className="plan-label">
        BED
      </text>
      <text x="132" y="124" className="plan-label">
        TERRACE
      </text>
      <text x="18" y="18" className="plan-meta">
        RESIDENCE 04 · 1:120
      </text>
    </svg>
  );
}

function OutputChip({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div className="output-chip" style={{ animationDelay: `${delay}ms` }}>
      <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.16em] text-text-faint">
        {label}
      </p>
      {children}
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="hero-scene relative mt-14 overflow-hidden rounded-lg border border-border-subtle bg-[#eef2f6]" aria-hidden="true">
      <div className="hero-scene-grid pointer-events-none absolute inset-0" />
      <div className="relative grid items-stretch gap-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="border-b border-border-subtle p-4 sm:p-6 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              2D layout
            </p>
            <span className="north-mark font-mono text-[10px] text-text-muted">N ↑</span>
          </div>
          <div className="mt-3 aspect-[11/9] overflow-hidden rounded-md bg-bg-surface shadow-[0_12px_32px_rgba(8,9,11,0.06)]">
            <PlanSheet />
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-text-faint">
            12.6 m — living to terrace
          </p>
        </div>
        <div className="relative min-h-[280px] p-4 sm:min-h-[340px] sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
            Generated 3D
          </p>
          <div className="absolute inset-x-2 top-8 bottom-2 sm:inset-x-4 sm:top-10">
            <IsoResidence />
          </div>
          <div className="pointer-events-none absolute top-8 right-3 hidden w-[7.2rem] flex-col gap-2 sm:flex">
            <OutputChip label="Video" delay={3000}>
              <div className="h-10 overflow-hidden rounded-sm bg-white/80">
                <div className="flex h-7 items-center justify-center">
                  <span className="block size-0 border-y-[5px] border-y-transparent border-l-8 border-l-bg-ink/80" />
                </div>
                <div className="mx-1 h-1 rounded-full bg-black/10">
                  <div className="playhead h-1 w-1/3 rounded-full bg-bg-ink/70" />
                </div>
              </div>
            </OutputChip>
            <OutputChip label="Website" delay={3180}>
              <div className="h-10 rounded-sm bg-white/80 p-1.5">
                <div className="h-1.5 w-10 rounded-full bg-black/15" />
                <div className="mt-1.5 h-4 rounded-sm bg-[#dfe6ec]" />
              </div>
            </OutputChip>
            <OutputChip label="Pamphlet" delay={3360}>
              <div className="flex h-10 gap-0.5">
                <div className="w-2/5 rounded-sm bg-white/90" />
                <div className="flex-1 rounded-sm bg-[#dfe6ec]" />
              </div>
            </OutputChip>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between border-t border-border-subtle px-4 py-2.5 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
          neuralkw study 04 · residence
        </p>
        <p className="hero-status font-mono text-[10px] tracking-[0.14em] text-text-muted">
          extruding model
        </p>
      </div>
    </div>
  );
}
