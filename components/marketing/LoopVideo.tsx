"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  poster: string;
  label?: string;
  className?: string;
  decorative?: boolean;
};

export function LoopVideo({
  src,
  poster,
  label,
  className = "",
  decorative = false,
}: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = "auto";
          void el.play();
        } else {
          el.pause();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={`block h-full w-full object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
