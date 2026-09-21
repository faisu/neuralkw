"use client";

import { LoopVideo } from "@/components/marketing/LoopVideo";
import { OutputStory, type OutputCanvasProps } from "@/components/marketing/OutputStory";
import { StoryModel } from "@/components/marketing/StoryFrame";
import { homeCopy } from "@/content/copy/home";
import { easeOut, range } from "@/lib/story-scroll";

const PATH = [
  [18, 68],
  [34, 50],
  [52, 56],
  [70, 42],
  [86, 30],
] as const;

function pointOnPath(t: number) {
  const segs = PATH.length - 1;
  const scaled = t * segs;
  const index = Math.min(segs - 1, Math.floor(scaled));
  const local = scaled - index;
  const a = PATH[index];
  const b = PATH[index + 1];
  return [a[0] + (b[0] - a[0]) * local, a[1] + (b[1] - a[1]) * local] as const;
}

export function VideoStory() {
  return <OutputStory id="walkthrough" story={homeCopy.video} canvas={VideoCanvas} />;
}

function VideoCanvas({ progress, converting, ready }: OutputCanvasProps) {
  const clip = homeCopy.film.clips.find((item) => item.kind === "video" && item.id === "living");
  const pathIn = easeOut(range(progress, 0.05, 0.24));
  const convertT = range(progress, 0.28, 0.64);
  const filmIn = easeOut(range(progress, 0.3, 0.5));
  const playIn = easeOut(range(progress, 0.66, 0.88));
  const orbit = range(progress, 0, 0.62);
  const cam = pointOnPath(pathIn);
  const showFilm = filmIn > 0.08 || ready;

  if (!clip || clip.kind !== "video") return null;

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          opacity: Math.max(0, 1 - playIn),
          transform: `scale(${1 - filmIn * 0.06})`,
        }}
      >
        <StoryModel rotation={-28 + orbit * 38} tilt={64 - convertT * 10} scale={0.94} />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d="M18 68 C34 50 44 52 52 56 S70 42 86 30"
            fill="none"
            stroke="#1060c0"
            strokeWidth="0.7"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - pathIn}
            className="story-camera-stroke"
          />
          <circle cx={cam[0]} cy={cam[1]} r="1.6" fill="#08090b" stroke="#fff" strokeWidth="0.45" />
        </svg>
        <div
          className="absolute top-3 left-3 rounded-[4px] border border-border-subtle bg-bg-surface/90 px-2.5 py-1.5 sm:top-4 sm:left-4 sm:px-3 sm:py-2"
          style={{ opacity: pathIn * (1 - filmIn) }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">Cam 01</p>
          <p className="mt-1 text-xs text-text-primary sm:text-sm">Living → Court → Kitchen</p>
        </div>
      </div>

      {showFilm ? (
        <div
          className="absolute inset-0 flex items-center justify-center p-3 sm:p-8"
          style={{ opacity: filmIn }}
        >
          <div className="story-film relative w-full max-w-3xl overflow-hidden rounded-[4px] bg-[#111318] shadow-[0_24px_60px_rgba(8,9,11,0.28)]">
            <div className="relative aspect-video overflow-hidden">
              {playIn < 0.72 ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${clip.poster})` }}
                />
              ) : null}
              {ready || playIn > 0.35 ? (
                <LoopVideo
                  src={clip.src}
                  poster={clip.poster}
                  label={clip.label}
                  decorative
                  className="absolute inset-0"
                />
              ) : null}
              {converting ? (
                <span className="create-story-scan" style={{ top: `${10 + convertT * 80}%` }} />
              ) : null}
              <div
                className="absolute inset-x-0 bottom-0 h-1 bg-white/15"
                style={{ opacity: 0.4 + playIn * 0.6 }}
              >
                <span className="block h-full bg-white" style={{ width: `${8 + playIn * 74}%` }} />
              </div>
            </div>
            <div
              className="grid grid-cols-4 gap-px bg-black/40"
              style={{
                opacity: converting ? 1 : Math.max(0, 1 - playIn * 1.4),
                maxHeight: converting || playIn < 0.85 ? 96 : 0,
                overflow: "hidden",
              }}
            >
              {[clip.poster, "/videos/inhabited.jpg", clip.poster, "/videos/inhabited.jpg"].map(
                (src, index) => (
                  <div key={`${src}-${index}`} className="relative aspect-video overflow-hidden bg-[#1b1e24]">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        opacity: convertT > index * 0.22 ? 1 : 0.22,
                        transform: `scale(${convertT > index * 0.22 ? 1 : 1.06})`,
                        backgroundImage: `url(${src})`,
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
