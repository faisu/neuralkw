"use client";

import { useEffect, useId, useRef } from "react";
import { WaitlistForm } from "@/components/marketing/WaitlistForm";
import { Button } from "@/components/ui/Button";
import { studioCopy } from "@/content/copy/studio";

type WaitlistGateProps = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistGate({ open, onClose }: WaitlistGateProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-bg-ink/45"
        aria-label={studioCopy.gate.close}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg overflow-y-auto border border-border-subtle bg-bg-primary p-5 shadow-[0_24px_60px_rgba(8,9,11,0.16)] focus-visible:outline-none sm:p-8"
      >
        <h2 id={titleId} className="text-2xl font-normal tracking-[-0.04em]">
          {studioCopy.gate.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {studioCopy.gate.description}
        </p>
        <div className="mt-8">
          <WaitlistForm />
        </div>
        <Button variant="secondary" className="mt-6" onClick={onClose}>
          {studioCopy.gate.close}
        </Button>
      </div>
    </div>
  );
}
