"use client";

import type { ReactNode, RefObject } from "react";
import { PropertyModel } from "@/components/studio/PropertyModel";
import { range, stageFromProgress, STORY_STAGE_AT } from "@/lib/story-scroll";

export type StoryStep = {
  id: string;
  number: string;
  label: string;
  title: string;
  detail: string;
};

export type StoryProgressItem = {
  id: string;
  at: number;
  label: string;
  detail: string;
};

type StoryFrameProps = {
  id: string;
  rootRef: RefObject<HTMLElement | null>;
  heading: string;
  label: string;
  project: string;
  steps: readonly StoryStep[];
  progress: number;
  reduceMotion: boolean;
  onJump?: (index: number) => void;
  canvas: ReactNode;
  rail?: ReactNode;
  renderAction?: () => ReactNode;
};

export function StoryFrame({
  id,
  rootRef,
  heading,
  label,
  project,
  steps,
  progress,
  reduceMotion,
  onJump,
  canvas,
  rail,
  renderAction,
}: StoryFrameProps) {
  const stageIndex = stageFromProgress(progress);
  const stage = steps[stageIndex];
  const mobileAction = renderAction?.();
  const railAction = renderAction?.();

  return (
    <section
      id={id}
      ref={rootRef}
      className={`scroll-mt-20 border-t border-border-subtle ${
        reduceMotion ? "" : "h-[220vh] md:h-[360vh]"
      }`}
      aria-label={heading}
      data-create-story="scroll"
    >
      <div
        className={
          reduceMotion
            ? "bg-bg-primary"
            : "sticky top-14 z-10 h-[calc(100svh-3.5rem)] overflow-hidden bg-bg-primary"
        }
      >
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col px-4 py-2 sm:px-6 md:px-10 md:py-4">
          <div className="create-story-frame flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-primary shadow-[0_24px_60px_rgba(8,9,11,0.08)] md:grid md:grid-cols-[13.5rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_16.5rem]">
            <aside className="flex shrink-0 flex-col border-b border-border-subtle md:border-r md:border-b-0">
              <div className="px-3 py-2.5 sm:px-5 md:border-b md:border-border-subtle md:px-5 md:py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                  neuralkw {label}
                </p>
                <h2 className="mt-1 text-base tracking-[-0.03em] text-text-primary md:mt-2 md:text-lg">
                  {stage.title}
                </h2>
                <p className="mt-1 hidden text-sm text-text-muted md:block">{stage.detail}</p>
              </div>
              <ol className="relative grid grid-cols-3 border-t border-border-subtle md:flex md:flex-1 md:grid-cols-none md:flex-col md:border-t-0 md:px-5 md:py-3">
                <span
                  className="absolute top-6 bottom-6 left-[1.9rem] hidden w-px bg-bg-surface-deep md:block"
                  aria-hidden="true"
                />
                {steps.map((step, index) => {
                  const current = stageIndex === index;
                  const done = stageIndex > index;
                  const fill = current
                    ? range(progress, STORY_STAGE_AT[index], STORY_STAGE_AT[index + 1] ?? 1)
                    : done
                      ? 1
                      : 0;
                  return (
                    <li key={step.id} className="relative">
                      <button
                        type="button"
                        aria-current={current ? "step" : undefined}
                        disabled={!onJump}
                        onClick={() => onJump?.(index)}
                        className="flex min-h-11 w-full flex-col items-center gap-1 px-1 py-2 text-center disabled:cursor-default md:min-h-12 md:flex-row md:items-start md:gap-3 md:py-2 md:text-left"
                      >
                        <span
                          className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] md:mt-0.5 md:size-7 md:text-[11px] ${
                            current || done
                              ? "border-bg-ink bg-bg-ink text-bg-primary"
                              : "border-border-subtle bg-bg-primary text-text-faint"
                          }`}
                        >
                          {step.number}
                        </span>
                        <span className="min-w-0 md:pt-1">
                          <span
                            className={`block text-[11px] md:text-sm ${
                              current ? "font-medium text-text-primary" : "text-text-muted"
                            }`}
                          >
                            {step.label}
                          </span>
                          <span className="mx-auto mt-1 block h-px w-10 overflow-hidden bg-bg-surface-deep md:mx-0 md:w-16">
                            <span
                              className="block h-px bg-bg-ink"
                              style={{ width: `${Math.round(fill * 100)}%` }}
                            />
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {mobileAction ? (
                <div className="mt-auto hidden border-t border-border-subtle px-4 py-3 md:block md:px-5 xl:hidden">
                  {mobileAction}
                </div>
              ) : null}
            </aside>

            <div
              className={`relative flex-1 overflow-hidden ${
                reduceMotion ? "min-h-[16rem] sm:min-h-[20rem] md:min-h-[28rem]" : "min-h-0"
              }`}
            >
              <p className="sr-only" aria-live="polite">
                {stage.title}. {stage.detail}
              </p>
              <div className="studio-canvas absolute inset-0" aria-hidden="true">
                {canvas}
              </div>
            </div>

            {mobileAction ? (
              <div className="shrink-0 border-t border-border-subtle px-3 py-2.5 md:hidden">
                {mobileAction}
              </div>
            ) : null}

            <aside className="hidden flex-col justify-between gap-5 overflow-y-auto border-l border-border-subtle px-5 py-5 xl:flex">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                  {project}
                </p>
                {rail}
              </div>
              {railAction}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StoryProgressList({
  items,
  percent,
}: {
  items: readonly StoryProgressItem[];
  percent: number;
}) {
  const reached = items.filter((item) => percent >= item.at);
  const current = reached[reached.length - 1] ?? items[0];

  return (
    <div className="mt-5">
      <div className="flex items-end justify-between gap-3">
        <p className="text-sm font-medium">{current.label}</p>
        <p className="font-mono text-xs text-text-muted">{percent}%</p>
      </div>
      <p className="mt-1 text-xs text-text-faint">{current.detail}</p>
      <div className="mt-3 h-[3px] overflow-hidden bg-bg-surface-deep">
        <div className="h-full bg-bg-ink" style={{ width: `${percent}%` }} />
      </div>
      <ol className="mt-4 grid gap-2">
        {items.map((item) => {
          const done = percent >= item.at;
          const active = current.id === item.id;
          return (
            <li
              key={item.id}
              className={`rounded-[4px] border px-3 py-2 text-sm ${
                done
                  ? "border-accent-emerald/35 bg-[#eef6f2] text-accent-emerald"
                  : active
                    ? "border-bg-ink text-text-primary"
                    : "border-border-subtle text-text-faint"
              }`}
            >
              {item.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function StoryResultList({
  heading,
  items,
  hint,
}: {
  heading: string;
  items: readonly { label: string; value: string }[];
  hint: string;
}) {
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">{heading}</p>
      <ul className="mt-2 divide-y divide-border-subtle border-y border-border-subtle">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-between py-2 text-sm">
            <span>{item.label}</span>
            <span className="text-text-muted">{item.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">{hint}</p>
    </div>
  );
}

export function StoryModel({
  rotation,
  tilt,
  scale = 1,
  height = 48,
}: {
  rotation: number;
  tilt: number;
  scale?: number;
  height?: number;
}) {
  return (
    <div className="studio-iso-stage">
      <div
        className="studio-iso"
        style={{
          transform: `rotateX(${tilt}deg) rotateZ(${rotation}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        <PropertyModel wallHeight={height} />
      </div>
    </div>
  );
}
