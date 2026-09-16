"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutToModelClip } from "@/components/marketing/LayoutToModelClip";
import { homeCopy } from "@/content/copy/home";

function isVideoClip(
  clip: (typeof homeCopy.film.clips)[number],
): clip is Extract<(typeof homeCopy.film.clips)[number], { kind: "video" }> {
  return clip.kind === "video";
}

export function FilmStage() {
  const { clips } = homeCopy.film;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.32 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const syncPlayback = useCallback(() => {
    videosRef.current.forEach((video, i) => {
      if (!video) return;
      const active = i === index && inView && !reduceMotion.current;
      if (active) {
        video.preload = "auto";
        void video.play();
      } else {
        video.pause();
        if (i !== index) video.currentTime = 0;
      }
    });
  }, [index, inView]);

  useEffect(() => {
    syncPlayback();
  }, [syncPlayback]);

  const reportSceneProgress = useCallback((value: number) => {
    setProgress(value);
  }, []);

  const select = (next: number) => {
    setProgress(0);
    setIndex(next);
  };

  const activeClip = clips[index];
  const scenePlaying = activeClip?.kind === "scene" && inView;

  return (
    <section
      id="film"
      ref={rootRef}
      className="scroll-mt-20 bg-bg-ink text-[#f8f9fb]"
      aria-label="Property films"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <div className="film-stage-frame relative overflow-hidden rounded-lg bg-black">
          {clips.map((clip, i) => {
            const active = i === index;
            const video = isVideoClip(clip);

            return (
              <figure
                key={clip.id}
                className={`film-stage-clip ${active ? "is-active" : ""}`}
                style={video ? { backgroundImage: `url(${clip.poster})` } : undefined}
                aria-label={active ? clip.label : undefined}
                aria-hidden={active ? undefined : true}
              >
                {clip.kind === "scene" ? (
                  <LayoutToModelClip
                    playing={scenePlaying && active}
                    onProgress={reportSceneProgress}
                  />
                ) : (
                  <video
                    ref={(node) => {
                      videosRef.current[i] = node;
                    }}
                    poster={clip.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={clip.label}
                    onTimeUpdate={() => {
                      const node = videosRef.current[i];
                      if (!node || i !== index || !node.duration) return;
                      setProgress(node.currentTime / node.duration);
                    }}
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                )}
                <figcaption className="film-stage-caption">
                  {"overline" in clip && clip.overline ? (
                    <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                      {clip.overline}
                    </span>
                  ) : null}
                  <strong className="mt-1 block text-lg font-medium tracking-[-0.03em] text-white md:text-xl">
                    {clip.title}
                  </strong>
                  <span className="mt-2 block max-w-md text-sm leading-relaxed text-white/70">
                    {clip.caption}
                  </span>
                </figcaption>
              </figure>
            );
          })}

          <nav className="film-stage-progress" aria-label="Film clips">
            {clips.map((clip, i) => {
              const selected = i === index;
              return (
                <button
                  key={clip.id}
                  type="button"
                  className={`film-stage-progress-item ${selected ? "is-active" : ""}`}
                  aria-current={selected ? "true" : undefined}
                  aria-label={`Show clip ${clip.number}, ${clip.title}`}
                  onClick={() => select(i)}
                >
                  <span className="film-stage-progress-track">
                    <span
                      className="film-stage-progress-fill"
                      style={{ transform: `scaleX(${selected ? progress : 0})` }}
                    />
                  </span>
                  <span className="mt-2 flex gap-2 text-left">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-white/45">
                      {clip.number}
                    </span>
                    <span className="text-sm font-medium text-white/80">{clip.title}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
