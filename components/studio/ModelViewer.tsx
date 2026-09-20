"use client";

import { useRef, useState, type PointerEvent } from "react";
import { PropertyModel } from "@/components/studio/PropertyModel";
import { studioCopy } from "@/content/copy/studio";
import { wallHeightFromFloor, type MeasurementUnit } from "@/lib/studio";

type ModelViewerProps = {
  projectName: string;
  floorHeight: number;
  unit: MeasurementUnit;
};

export function ModelViewer({ projectName, floorHeight, unit }: ModelViewerProps) {
  const [rotation, setRotation] = useState(-32);
  const [tilt, setTilt] = useState(56);
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; rotation: number; tilt: number } | null>(null);
  const wallHeight = wallHeightFromFloor(floorHeight, unit);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rotation, tilt };
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const nextRotation = drag.current.rotation + (event.clientX - drag.current.x) * 0.42;
    const nextTilt = Math.min(78, Math.max(28, drag.current.tilt - (event.clientY - drag.current.y) * 0.28));
    setRotation(nextRotation);
    setTilt(nextTilt);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(false);
  }

  function reset() {
    setRotation(-32);
    setTilt(56);
    setScale(1);
  }

  return (
    <div className="flex h-full min-h-[28rem] flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
            {studioCopy.result.view}
          </p>
          <p className="mt-1 text-sm font-medium tracking-[-0.02em]">{projectName}</p>
        </div>
        <div className="flex items-center gap-1">
          <ViewerButton
            label={studioCopy.viewer.rotateLeft}
            onClick={() => setRotation((value) => value - 18)}
          >
            ↶
          </ViewerButton>
          <ViewerButton
            label={studioCopy.viewer.rotateRight}
            onClick={() => setRotation((value) => value + 18)}
          >
            ↷
          </ViewerButton>
          <ViewerButton
            label={studioCopy.viewer.zoomOut}
            onClick={() => setScale((value) => Math.max(0.72, value - 0.12))}
          >
            −
          </ViewerButton>
          <ViewerButton
            label={studioCopy.viewer.zoomIn}
            onClick={() => setScale((value) => Math.min(1.45, value + 0.12))}
          >
            +
          </ViewerButton>
          <ViewerButton label={studioCopy.viewer.reset} onClick={reset}>
            ⌂
          </ViewerButton>
        </div>
      </div>

      <div className="relative min-h-[24rem] flex-1 overflow-hidden">
        <div
          className="studio-canvas absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="studio-iso-stage" style={{ transformStyle: "preserve-3d" }}>
            <div
              className={`studio-iso ${dragging ? "is-dragging" : ""}`}
              style={{
                transform: `rotateX(${tilt}deg) rotateZ(${rotation}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
              }}
            >
              <PropertyModel wallHeight={wallHeight} />
            </div>
          </div>
          <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
            {studioCopy.viewer.hint}
          </p>
        </div>
      </div>
    </div>
  );
}

function ViewerButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-[4px] border border-border-subtle bg-bg-surface text-sm text-text-primary transition-colors hover:bg-bg-surface-deep"
    >
      {children}
    </button>
  );
}
