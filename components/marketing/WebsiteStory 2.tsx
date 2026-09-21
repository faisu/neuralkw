"use client";

import { LoopVideo } from "@/components/marketing/LoopVideo";
import { OutputStory, type OutputCanvasProps } from "@/components/marketing/OutputStory";
import { StoryModel } from "@/components/marketing/StoryFrame";
import { homeCopy } from "@/content/copy/home";
import { studioCopy } from "@/content/copy/studio";
import { easeOut, range } from "@/lib/story-scroll";

const PINS = [
  { label: "Living", x: "36%", y: "58%" },
  { label: "Court", x: "56%", y: "46%" },
  { label: "Kitchen", x: "68%", y: "64%" },
] as const;

export function WebsiteStory() {
  return <OutputStory id="website" story={homeCopy.website} canvas={WebsiteCanvas} />;
}

function WebsiteCanvas({ progress, converting, ready }: OutputCanvasProps) {
  const pinIn = easeOut(range(progress, 0.05, 0.22));
  const convertT = range(progress, 0.28, 0.64);
  const browserIn = easeOut(range(progress, 0.26, 0.46));
  const siteIn = easeOut(range(progress, 0.58, 0.82));
  const orbit = range(progress, 0, 0.5);
  const clip = homeCopy.film.clips.find((item) => item.kind === "video" && item.id === "living");
  const rooms = studioCopy.rooms.slice(0, 4);
  const visibleRooms = Math.max(1, Math.round(convertT * rooms.length));

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          opacity: Math.max(0.08, 1 - browserIn * 0.92),
          transform: `scale(${1 - browserIn * 0.1})`,
        }}
      >
        <StoryModel rotation={-22 + orbit * 28} tilt={60} scale={0.9} />
        {PINS.map((pin, index) => (
          <span
            key={pin.label}
            className="story-pin"
            style={{
              left: pin.x,
              top: pin.y,
              opacity: pinIn * (1 - siteIn),
              transform: `translate(-50%, -100%) scale(${0.86 + pinIn * 0.14})`,
              transitionDelay: `${index * 80}ms`,
            }}
          >
            {pin.label}
          </span>
        ))}
      </div>

      <div
        className="absolute inset-3 flex items-center justify-center sm:inset-6"
        style={{
          opacity: browserIn,
          transform: `translateY(${(1 - browserIn) * 28}px) scale(${0.94 + siteIn * 0.06})`,
        }}
      >
        <div className="story-browser flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-[6px] border border-border-subtle bg-bg-surface shadow-[0_24px_60px_rgba(8,9,11,0.12)]">
          <div className="flex shrink-0 items-center gap-2 border-b border-border-subtle bg-[#eef1f4] px-3 py-2">
            <span className="size-2 rounded-full bg-[#d0d5db]" />
            <span className="size-2 rounded-full bg-[#d0d5db]" />
            <span className="size-2 rounded-full bg-[#d0d5db]" />
            <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-text-faint">
              villa12.neuralkw.app
            </span>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#f6f7f9]">
            <div className="absolute inset-0 grid grid-rows-[minmax(0,1.15fr)_auto]">
              <div className="relative overflow-hidden bg-[#111318]">
                {clip && clip.kind === "video" ? (
                  ready || siteIn > 0.55 ? (
                    <LoopVideo
                      src={clip.src}
                      poster={clip.poster}
                      label={clip.label}
                      decorative
                      className="absolute inset-0 opacity-80"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-80"
                      style={{ backgroundImage: `url(${clip.poster})` }}
                    />
                  )
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    {homeCopy.website.project}
                  </p>
                  <p className="mt-1 text-xl tracking-[-0.04em] text-white sm:text-2xl">
                    A courtyard residence
                  </p>
                </div>
                <div
                  className="absolute top-3 right-3 hidden h-24 w-28 overflow-hidden rounded-[4px] border border-white/20 bg-[#eef2f6] sm:block"
                  style={{ opacity: siteIn }}
                >
                  <StoryModel rotation={-30} tilt={56} scale={0.42} height={36} />
                </div>
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_10rem] sm:p-4">
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {rooms.map((room, index) => (
                    <li
                      key={room.name}
                      className="rounded-[4px] border border-border-subtle bg-white px-2.5 py-2"
                      style={{
                        opacity: converting || ready ? (index < visibleRooms ? 1 : 0.28) : siteIn,
                      }}
                    >
                      <p className="text-xs text-text-muted">{room.name}</p>
                      <p className="mt-1 font-mono text-[10px] text-text-faint">{room.m}</p>
                    </li>
                  ))}
                </ul>
                <div
                  className="hidden items-end justify-end sm:flex"
                  style={{ opacity: 0.25 + convertT * 0.75 }}
                >
                  <span className="rounded-[4px] bg-bg-ink px-3 py-2 text-xs font-medium text-bg-primary">
                    Enquire
                  </span>
                </div>
              </div>
            </div>
            {converting ? (
              <span className="create-story-scan" style={{ top: `${12 + convertT * 76}%` }} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
