type VolumePalette = {
  top: string;
  front: string;
  side: string;
};

function Volume({
  x,
  y,
  w,
  d,
  h,
  palette,
  label,
  glass,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  palette: VolumePalette;
  label?: string;
  glass?: boolean;
}) {
  const front = glass
    ? "linear-gradient(180deg, rgba(16,96,192,0.38), rgba(214,228,236,0.92))"
    : palette.front;

  return (
    <div
      className="studio-vol"
      style={{
        width: w,
        height: d,
        transform: `translate3d(${x}px, ${y}px, 0px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="studio-vol-face"
        style={{
          width: w,
          height: d,
          background: palette.top,
          border: "1px solid rgba(8,9,11,0.18)",
          transform: `translateZ(${h}px)`,
        }}
      >
        {label ? <span className="studio-vol-label">{label}</span> : null}
      </div>
      <div
        className="studio-vol-face"
        style={{
          width: w,
          height: h,
          background: front,
          border: "1px solid rgba(8,9,11,0.2)",
          transform: `translate3d(0, ${d}px, 0) rotateX(90deg)`,
          transformOrigin: "top left",
        }}
      />
      <div
        className="studio-vol-face"
        style={{
          width: w,
          height: h,
          background: palette.side,
          border: "1px solid rgba(8,9,11,0.16)",
          transform: "rotateX(90deg)",
          transformOrigin: "top left",
        }}
      />
      <div
        className="studio-vol-face"
        style={{
          width: h,
          height: d,
          background: palette.side,
          border: "1px solid rgba(8,9,11,0.16)",
          transform: "rotateY(-90deg)",
          transformOrigin: "top left",
        }}
      />
      <div
        className="studio-vol-face"
        style={{
          width: h,
          height: d,
          background: palette.front,
          border: "1px solid rgba(8,9,11,0.18)",
          transform: `translate3d(${w}px, 0, 0) rotateY(-90deg)`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

const stone: VolumePalette = {
  top: "#e8eef3",
  front: "#c5d0da",
  side: "#aeb9c4",
};

const plaster: VolumePalette = {
  top: "#efe6db",
  front: "#d4c4b2",
  side: "#c0ad98",
};

const sage: VolumePalette = {
  top: "#dceee4",
  front: "#b7d0c3",
  side: "#9bb9aa",
};

const slate: VolumePalette = {
  top: "#d7e0ea",
  front: "#b4c2d0",
  side: "#96a7b8",
};

const garden: VolumePalette = {
  top: "#cfe8d8",
  front: "#8fb89f",
  side: "#6f9a80",
};

type PropertyModelProps = {
  wallHeight: number;
  className?: string;
};

export function PropertyModel({ wallHeight, className = "" }: PropertyModelProps) {
  const h = Math.round(wallHeight * 2.15);

  return (
    <div className={`studio-model ${className}`} style={{ transformStyle: "preserve-3d" }} aria-hidden="true">
      <div className="studio-model-ground" />
      <Volume x={0} y={88} w={214} d={168} h={h} palette={stone} label="LIVING" glass />
      <Volume x={0} y={0} w={148} d={88} h={Math.round(h * 1.62)} palette={plaster} label="MASTER" />
      <Volume x={148} y={0} w={66} d={88} h={h} palette={slate} label="STUDY" />
      <Volume x={214} y={168} w={156} d={88} h={Math.round(h * 0.9)} palette={sage} label="KITCHEN" />
      <Volume x={214} y={88} w={156} d={80} h={12} palette={garden} label="COURT" />
      <Volume x={248} y={108} w={88} d={40} h={6} palette={{ top: "#8ec4d8", front: "#5a92a8", side: "#4d7f94" }} />
    </div>
  );
}

export function StudioFloorPlan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 250" className={`block w-full ${className}`} aria-hidden="true">
      <rect x="8" y="8" width="344" height="234" fill="#f7f8fa" stroke="#08090b" strokeOpacity="0.16" />
      <rect x="20" y="20" width="132" height="70" fill="#efe6db" stroke="#08090b" strokeOpacity="0.4" />
      <rect x="152" y="20" width="58" height="70" fill="#d7e0ea" stroke="#08090b" strokeOpacity="0.32" />
      <rect x="20" y="90" width="190" height="140" fill="#e8eef3" stroke="#08090b" strokeOpacity="0.45" />
      <rect x="210" y="90" width="130" height="68" fill="#d8ecdf" stroke="#0f6e56" strokeOpacity="0.4" />
      <rect x="210" y="158" width="130" height="72" fill="#dceee4" stroke="#08090b" strokeOpacity="0.35" />
      <rect x="236" y="106" width="78" height="36" fill="#b7d7e4" stroke="#1060c0" strokeOpacity="0.35" />
      <text x="48" y="60" className="studio-plan-label">
        MASTER
      </text>
      <text x="160" y="60" className="studio-plan-label">
        STUDY
      </text>
      <text x="78" y="164" className="studio-plan-label">
        LIVING
      </text>
      <text x="242" y="128" className="studio-plan-label">
        COURT
      </text>
      <text x="238" y="198" className="studio-plan-label">
        KITCHEN
      </text>
      <text x="20" y="18" className="studio-plan-meta">
        VILLA 12 · 1:150
      </text>
    </svg>
  );
}
