"use client";

import { useEffect, useState } from "react";
import { homeCopy } from "@/content/copy/home";

type Point3 = [number, number, number?];

const OX = 486;
const OY = 248;
const SX = 2.55;
const SY = 1.22;
const DURATION_MS = homeCopy.film.sceneDurationMs;

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
  index,
  stroke = "rgba(8,9,11,0.45)",
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  index: number;
  stroke?: string;
}) {
  return (
    <g className={`layout-film-box layout-film-box-${index}`}>
      <polygon
        points={poly([x, y, h], [x + w, y, h], [x + w, y + d, h], [x, y + d, h])}
        fill={top}
        stroke={stroke}
        strokeWidth="0.8"
      />
      <polygon
        points={poly([x, y, h], [x, y + d, h], [x, y + d, 0], [x, y, 0])}
        fill={left}
        stroke={stroke}
        strokeWidth="0.8"
      />
      <polygon
        points={poly([x, y + d, h], [x + w, y + d, h], [x + w, y + d, 0], [x, y + d, 0])}
        fill={right}
        stroke={stroke}
        strokeWidth="0.8"
      />
    </g>
  );
}

function statusFromProgress(progress: number) {
  if (progress < 0.24) return "reading layout";
  if (progress < 0.78) return "extruding model";
  return "model ready";
}

type LayoutToModelClipProps = {
  playing: boolean;
  onProgress: (progress: number) => void;
};

export function LayoutToModelClip({ playing, onProgress }: LayoutToModelClipProps) {
  const [status, setStatus] = useState("reading layout");

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = ((now - start) % DURATION_MS) / DURATION_MS;
      onProgress(progress);
      setStatus((current) => {
        const next = statusFromProgress(progress);
        return current === next ? current : next;
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, onProgress]);

  const label = playing ? status : "model ready";

  return (
    <div
      className={`layout-film ${playing ? "is-playing" : "is-still"}`}
      aria-hidden="true"
    >
      <div className="layout-film-grid" />
      <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" className="layout-film-svg">
        <defs>
          <linearGradient id="layoutFilmScan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7dd3c0" stopOpacity="0" />
            <stop offset="0.5" stopColor="#7dd3c0" stopOpacity="0.18" />
            <stop offset="1" stopColor="#7ec8f0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="layoutFilmSheet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4f6f8" />
            <stop offset="1" stopColor="#e7ebf0" />
          </linearGradient>
        </defs>

        <g className="layout-film-plan">
          <rect x="286" y="96" width="388" height="308" rx="4" fill="url(#layoutFilmSheet)" />
          <rect x="286" y="96" width="388" height="308" rx="4" fill="none" stroke="#08090b" strokeOpacity="0.16" />
          <rect
            x="308"
            y="128"
            width="168"
            height="122"
            fill="#e8eef5"
            className="layout-film-draw"
            pathLength={1}
            stroke="#08090b"
            strokeOpacity="0.55"
          />
          <rect
            x="476"
            y="128"
            width="128"
            height="122"
            fill="#dcebe3"
            className="layout-film-draw"
            pathLength={1}
            stroke="#08090b"
            strokeOpacity="0.42"
          />
          <rect
            x="308"
            y="250"
            width="128"
            height="108"
            fill="#efe6db"
            className="layout-film-draw"
            pathLength={1}
            stroke="#08090b"
            strokeOpacity="0.42"
          />
          <rect
            x="436"
            y="250"
            width="62"
            height="108"
            fill="#e8ecf1"
            className="layout-film-draw"
            pathLength={1}
            stroke="#08090b"
            strokeOpacity="0.32"
          />
          <rect
            x="498"
            y="250"
            width="106"
            height="108"
            fill="#cfe6d8"
            className="layout-film-draw"
            pathLength={1}
            stroke="#0f6e56"
            strokeOpacity="0.48"
          />
          <path
            d="M386 250c0-14 14-14 14-14"
            fill="none"
            className="layout-film-draw"
            pathLength={1}
            stroke="#1060c0"
            strokeOpacity="0.75"
          />
          <path d="M476 188h14M348 128v8M528 128v8" stroke="#08090b" strokeOpacity="0.28" />
          <text x="348" y="192" className="layout-film-plan-label">
            LIVING
          </text>
          <text x="508" y="192" className="layout-film-plan-label">
            KITCHEN
          </text>
          <text x="340" y="308" className="layout-film-plan-label">
            BED
          </text>
          <text x="516" y="308" className="layout-film-plan-label">
            TERRACE
          </text>
          <text x="308" y="118" className="layout-film-plan-meta">
            RESIDENCE 04 · 1:120
          </text>
          <text x="628" y="118" className="layout-film-plan-meta">
            N ↑
          </text>
        </g>

        <g className="layout-film-iso">
          <polygon
            className="layout-film-ground"
            points={poly([-8, -8, 0], [120, -8, 0], [120, 98, 0], [-8, 98, 0])}
            fill="#dfe6ee"
            fillOpacity="0.16"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
          />
          <polygon
            className="layout-film-scan"
            points={poly([0, 0, 0], [112, 0, 0], [112, 90, 0], [0, 90, 0])}
            fill="url(#layoutFilmScan)"
          />

          <IsoBox x={0} y={0} w={64} d={48} h={36} top="#e8eef4" left="#c9d3de" right="#a9b6c4" index={1} />
          <IsoBox x={64} y={0} w={48} d={48} h={36} top="#dceee4" left="#b7d0c3" right="#98b9aa" index={2} />
          <IsoBox x={0} y={48} w={48} d={42} h={36} top="#efe6db" left="#d7c6b4" right="#c0ad98" index={3} />
          <IsoBox x={48} y={48} w={24} d={42} h={36} top="#e6ebf1" left="#c5d0db" right="#a8b6c3" index={4} />
          <IsoBox x={72} y={48} w={40} d={42} h={10} top="#cfe8d8" left="#a9cdb8" right="#8fb89f" index={5} />

          <polygon
            className="layout-film-window"
            points={poly([18, 48, 28], [46, 48, 28], [46, 48, 10], [18, 48, 10])}
            fill="#7ec8f0"
            fillOpacity="0.38"
            stroke="rgba(126,200,240,0.55)"
            strokeWidth="0.6"
          />
          <polygon
            className="layout-film-window"
            points={poly([112, 10, 28], [112, 38, 28], [112, 38, 10], [112, 10, 10])}
            fill="#7dd3c0"
            fillOpacity="0.3"
            stroke="rgba(125,211,192,0.5)"
            strokeWidth="0.6"
          />

          <IsoBox x={10} y={8} w={26} d={9} h={8} top="#d5e0ea" left="#b7c6d2" right="#9aabba" index={6} />
          <IsoBox x={22} y={24} w={14} d={14} h={6} top="#f4f7fa" left="#d5dee6" right="#bcc8d2" index={7} />
          <IsoBox x={70} y={6} w={36} d={8} h={10} top="#d3e8dc" left="#b4d0c2" right="#9bbbaa" index={8} />
          <IsoBox x={8} y={58} w={24} d={16} h={7} top="#eadfce" left="#d0bda8" right="#bba68e" index={9} />
          <IsoBox
            x={84}
            y={62}
            w={8}
            d={8}
            h={14}
            top="#8fba9e"
            left="#6b947c"
            right="#587c68"
            index={10}
            stroke="rgba(125,211,192,0.35)"
          />
          <IsoBox
            x={98}
            y={70}
            w={6}
            d={6}
            h={11}
            top="#9dc6ad"
            left="#739880"
            right="#61856e"
            index={11}
            stroke="rgba(125,211,192,0.35)"
          />

          <path
            className="layout-film-path"
            d={`M ${iso(28, 18, 1).x} ${iso(28, 18, 1).y}
                L ${iso(58, 28, 1).x} ${iso(58, 28, 1).y}
                L ${iso(86, 58, 10).x} ${iso(86, 58, 10).y}
                L ${iso(98, 78, 10).x} ${iso(98, 78, 10).y}`}
            fill="none"
            stroke="#f8f9fb"
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />

          <text x={iso(18, 18, 42).x} y={iso(18, 18, 42).y} className="layout-film-iso-label">
            LIVING
          </text>
          <text x={iso(78, 16, 42).x} y={iso(78, 16, 42).y} className="layout-film-iso-label">
            KITCHEN
          </text>
          <text x={iso(12, 66, 42).x} y={iso(12, 66, 42).y} className="layout-film-iso-label">
            BED
          </text>
          <text x={iso(82, 62, 18).x} y={iso(82, 62, 18).y} className="layout-film-iso-label">
            TERRACE
          </text>
        </g>
      </svg>

      <div className="layout-film-hud">
        <p>Residence 04 · 1:120</p>
        <p className="layout-film-status">{label}</p>
      </div>
    </div>
  );
}
