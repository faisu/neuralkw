"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "text";

type ClickRipple = {
  id: number;
  x: number;
  y: number;
};

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";

export function SiteCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const corePos = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");
  const visibleRef = useRef(false);
  const rippleId = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const on = finePointer.matches && !reduceMotion.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("has-site-cursor", on);
    };

    sync();
    finePointer.addEventListener("change", sync);
    reduceMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reduceMotion.removeEventListener("change", sync);
      document.documentElement.classList.remove("has-site-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const timeouts: number[] = [];
    let raf = 0;

    const isTextTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest("input, textarea, select, [contenteditable='true']"),
      );
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest(INTERACTIVE));
    };

    const onMove = (event: PointerEvent) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        ringPos.current.x = event.clientX;
        ringPos.current.y = event.clientY;
        corePos.current.x = event.clientX;
        corePos.current.y = event.clientY;
        setVisible(true);
      }

      const next: CursorMode = isTextTarget(event.target)
        ? "text"
        : isInteractive(event.target)
          ? "hover"
          : "default";

      if (modeRef.current !== next) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setPressed(true);
      const id = ++rippleId.current;
      setRipples((current) => [
        ...current.slice(-3),
        { id, x: event.clientX, y: event.clientY },
      ]);
      timeouts.push(
        window.setTimeout(() => {
          setRipples((current) => current.filter((ripple) => ripple.id !== id));
        }, 700),
      );
    };

    const onUp = () => setPressed(false);

    const tick = () => {
      const target = pos.current;
      ringPos.current.x += (target.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (target.y - ringPos.current.y) * 0.18;
      corePos.current.x += (target.x - corePos.current.x) * 0.52;
      corePos.current.y += (target.y - corePos.current.y) * 0.52;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${corePos.current.x}px, ${corePos.current.y}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`site-cursor-layer is-${mode} ${visible ? "is-visible" : ""} ${pressed ? "is-pressed" : ""}`}
      aria-hidden="true"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="site-cursor-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
      <div ref={ringRef} className="site-cursor-ring-wrap">
        <span className="site-cursor-ring" />
      </div>
      <div ref={coreRef} className="site-cursor-core">
        <span className="site-cursor-mark">
          <svg viewBox="0 0 22 22" width="22" height="22" fill="none">
            <rect x="2.5" y="2.5" width="17" height="17" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2.5 12.5h17M9.5 2.5v17" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
        <span className="site-cursor-beam" />
      </div>
    </div>
  );
}
