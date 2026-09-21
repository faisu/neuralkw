"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  StoryFrame,
  StoryProgressList,
  StoryResultList,
} from "@/components/marketing/StoryFrame";
import { PropertyModel, StudioFloorPlan } from "@/components/studio/PropertyModel";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/copy/home";
import { studioCopy } from "@/content/copy/studio";
import { easeOut, range, stageFromProgress, useStoryScroll } from "@/lib/story-scroll";

export function CreateStory() {
  const { create } = homeCopy;
  const { rootRef, progress, reduceMotion, jumpTo } = useStoryScroll();
  const stageIndex = stageFromProgress(progress);
  const fileIn = easeOut(range(progress, 0.05, 0.16));
  const planIn = easeOut(range(progress, 0.12, 0.24));
  const convertT = range(progress, 0.28, 0.64);
  const convertPercent = Math.round(convertT * 100);
  const extrude = easeOut(range(progress, 0.58, 0.74));
  const orbit = range(progress, 0.72, 1);
  const converting = stageIndex === 1;
  const modelReady = stageIndex === 2;

  return (
    <StoryFrame
      id="create"
      rootRef={rootRef}
      heading={create.heading}
      label={create.label}
      project={create.project}
      steps={create.steps}
      progress={progress}
      reduceMotion={reduceMotion}
      onJump={jumpTo}
      canvas={
        <>
          <UploadConvertCanvas
            progress={progress}
            fileIn={fileIn}
            planIn={planIn}
            convertT={convertT}
            converting={converting}
          />
          {progress >= 0.54 ? (
            <ModelCanvas
              extrude={extrude}
              orbit={orbit}
              interactive={modelReady && progress >= 0.86}
            />
          ) : null}
        </>
      }
      rail={
        <>
          {progress < 0.08 ? (
            <p className="mt-3 text-sm text-text-muted">{create.dropHint}</p>
          ) : (
            <div className="mt-3">
              <FileChip visible={fileIn} />
            </div>
          )}
          {converting ? <StoryProgressList items={studioCopy.progress} percent={convertPercent} /> : null}
          {modelReady ? (
            <StoryResultList
              heading={studioCopy.result.rooms}
              items={studioCopy.rooms.slice(0, 4).map((room) => ({ label: room.name, value: room.m }))}
              hint={`${create.ready} · ${create.hint}`}
            />
          ) : null}
        </>
      }
      renderAction={
        modelReady
          ? undefined
          : () => (
              <Button
                className="w-full"
                busy={converting}
                disabled={fileIn < 0.85}
                onClick={() => jumpTo?.(1)}
              >
                {converting ? create.converting : create.convert}
              </Button>
            )
      }
    />
  );
}

function UploadConvertCanvas({
  progress,
  fileIn,
  planIn,
  convertT,
  converting,
}: {
  progress: number;
  fileIn: number;
  planIn: number;
  convertT: number;
  converting: boolean;
}) {
  const { create } = homeCopy;
  const lift = range(progress, 0.48, 0.68);
  const planOut = range(progress, 0.56, 0.7);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-5 sm:p-10"
      style={{ opacity: 1 - planOut }}
    >
      <div
        className="relative flex h-full w-full max-w-2xl flex-col items-center justify-center border border-dashed border-border-subtle bg-bg-surface/70"
        style={{
          transform: `perspective(1100px) rotateX(${lift * 62}deg) scale(${1 - planOut * 0.06})`,
          transformOrigin: "50% 80%",
        }}
      >
        <span
          className="flex size-12 items-center justify-center border border-border-subtle bg-bg-primary text-lg"
          style={{ opacity: 1 - planIn }}
        >
          ↑
        </span>
        <span className="mt-4 block text-lg tracking-[-0.03em]" style={{ opacity: 1 - planIn }}>
          {create.dropTitle}
        </span>
        <span className="mt-1 block text-sm text-text-muted" style={{ opacity: 1 - planIn }}>
          {create.dropHint}
        </span>
        <span
          className="mt-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint"
          style={{ opacity: 1 - planIn }}
        >
          {create.formats}
        </span>

        <div
          className="create-story-file pointer-events-none absolute top-5 left-1/2 w-[min(18rem,86%)]"
          style={{
            opacity: fileIn * (1 - planIn),
            transform: `translate(-50%, ${(1 - fileIn) * -36}px)`,
          }}
        >
          <FileChip visible={1} />
        </div>

        <div
          className="absolute inset-4 overflow-hidden rounded-[4px] bg-bg-surface shadow-[0_18px_40px_rgba(8,9,11,0.08)] sm:inset-7"
          style={{ opacity: planIn }}
        >
          <StudioFloorPlan className="h-full w-full" />
          {converting ? (
            <span className="create-story-scan" style={{ top: `${12 + convertT * 76}%` }} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ModelCanvas({
  extrude,
  orbit,
  interactive,
}: {
  extrude: number;
  orbit: number;
  interactive: boolean;
}) {
  const [pose, setPose] = useState<{ rotation: number; tilt: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; rotation: number; tilt: number } | null>(null);
  const scrollRotation = -32 + orbit * 42;
  const scrollTilt = 78 - easeOut(extrude) * 22;
  const liveRotation = interactive && pose ? pose.rotation : scrollRotation;
  const liveTilt = interactive && pose ? pose.tilt : scrollTilt;

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!interactive) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rotation: liveRotation, tilt: liveTilt };
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setPose({
      rotation: drag.current.rotation + (event.clientX - drag.current.x) * 0.42,
      tilt: Math.min(78, Math.max(28, drag.current.tilt - (event.clientY - drag.current.y) * 0.28)),
    });
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(false);
  }

  return (
    <div
      className={`absolute inset-0 ${interactive ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
      style={{ opacity: Math.max(0.04, extrude) }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="studio-iso-stage">
        <div
          className={`studio-iso ${dragging ? "is-dragging" : ""}`}
          style={{
            transform: `rotateX(${liveTilt}deg) rotateZ(${liveRotation}deg) scale3d(${0.86 + extrude * 0.16}, ${0.86 + extrude * 0.16}, ${Math.max(0.08, extrude)})`,
            transformStyle: "preserve-3d",
          }}
        >
          <PropertyModel wallHeight={48} />
        </div>
      </div>
    </div>
  );
}

function FileChip({ visible }: { visible: number }) {
  const { create } = homeCopy;

  return (
    <div
      className="flex items-center gap-3 rounded-[4px] border border-border-subtle bg-bg-surface px-3 py-2.5"
      style={{ opacity: visible }}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-bg-surface-deep font-mono text-[10px] font-medium tracking-[0.08em]">
        PNG
      </span>
      <div className="min-w-0 text-left">
        <p className="truncate text-sm font-medium">{create.fileName}</p>
        <p className="mt-0.5 text-xs text-text-faint">{create.fileMeta}</p>
      </div>
    </div>
  );
}
