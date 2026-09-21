"use client";

import type { ComponentType } from "react";
import {
  StoryFrame,
  StoryProgressList,
  StoryResultList,
  type StoryProgressItem,
  type StoryStep,
} from "@/components/marketing/StoryFrame";
import { Button } from "@/components/ui/Button";
import { range, stageFromProgress, useStoryScroll } from "@/lib/story-scroll";

export type OutputStoryCopy = {
  label: string;
  heading: string;
  action: string;
  pending: string;
  ready: string;
  project: string;
  hint: string;
  steps: readonly StoryStep[];
  progress: readonly StoryProgressItem[];
  result: readonly { label: string; value: string }[];
};

export type OutputCanvasProps = {
  progress: number;
  converting: boolean;
  ready: boolean;
};

export function OutputStory({
  id,
  story,
  canvas: Canvas,
}: {
  id: string;
  story: OutputStoryCopy;
  canvas: ComponentType<OutputCanvasProps>;
}) {
  const { rootRef, progress, reduceMotion, jumpTo } = useStoryScroll();
  const stageIndex = stageFromProgress(progress);
  const converting = stageIndex === 1;
  const ready = stageIndex === 2;
  const convertPercent = Math.round(range(progress, 0.28, 0.64) * 100);

  return (
    <StoryFrame
      id={id}
      rootRef={rootRef}
      heading={story.heading}
      label={story.label}
      project={story.project}
      steps={story.steps}
      progress={progress}
      reduceMotion={reduceMotion}
      onJump={jumpTo}
      canvas={<Canvas progress={progress} converting={converting} ready={ready} />}
      rail={
        <>
          {!converting && !ready ? (
            <p className="mt-3 text-sm text-text-muted">{story.steps[0].detail}</p>
          ) : null}
          {converting ? <StoryProgressList items={story.progress} percent={convertPercent} /> : null}
          {ready ? (
            <StoryResultList heading={story.ready} items={story.result} hint={story.hint} />
          ) : null}
        </>
      }
      renderAction={
        ready
          ? undefined
          : () => (
              <Button className="w-full" busy={converting} onClick={() => jumpTo?.(1)}>
                {converting ? story.pending : story.action}
              </Button>
            )
      }
    />
  );
}
