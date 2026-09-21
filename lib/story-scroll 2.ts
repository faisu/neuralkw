"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const STORY_HEADER_OFFSET = 56;
export const STORY_STAGE_AT = [0.04, 0.28, 0.66] as const;

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function range(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export function easeOut(value: number) {
  return 1 - (1 - value) ** 3;
}

export function stageFromProgress(progress: number) {
  if (progress < 0.28) return 0;
  if (progress < 0.66) return 1;
  return 2;
}

export function useStoryScroll() {
  const rootRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduceMotion) return;

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight + STORY_HEADER_OFFSET;
      const scrolled = STORY_HEADER_OFFSET - rect.top;
      setProgress(clamp(scrolled / Math.max(total, 1)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  const jumpTo = useCallback(
    (index: number) => {
      const el = rootRef.current;
      if (!el || reduceMotion) return;
      const total = el.offsetHeight - window.innerHeight + STORY_HEADER_OFFSET;
      const top = el.getBoundingClientRect().top + window.scrollY + STORY_STAGE_AT[index] * total;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [reduceMotion],
  );

  return {
    rootRef,
    progress: reduceMotion ? 1 : progress,
    reduceMotion,
    jumpTo: reduceMotion ? undefined : jumpTo,
  };
}
