"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { StudioFloorPlan } from "@/components/studio/PropertyModel";
import { AssetPanel } from "@/components/studio/AssetPanel";
import { ModelViewer } from "@/components/studio/ModelViewer";
import { WaitlistGate } from "@/components/studio/WaitlistGate";
import { Button } from "@/components/ui/Button";
import { studioCopy, type StudioAssetId, type StudioStepId } from "@/content/copy/studio";
import {
  convertFloorHeight,
  defaultFloorHeight,
  fileBadge,
  formatFileSize,
  heightBounds,
  isAcceptedLayout,
  MAX_LAYOUT_BYTES,
  type MeasurementUnit,
  type StudioFile,
} from "@/lib/studio";

type Phase = "idle" | "converting" | "ready";
type AssetStatus = "idle" | "pending" | "ready";

const SAMPLE_FILE: StudioFile = {
  name: studioCopy.upload.sampleName,
  size: 0,
  type: "image/png",
  isSample: true,
};

const emptyAssets: Record<StudioAssetId, AssetStatus> = {
  video: "idle",
  website: "idle",
  pamphlet: "idle",
};

export function StudioApp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState<StudioStepId>("layout");
  const [file, setFile] = useState<StudioFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [unit, setUnit] = useState<MeasurementUnit>("ft");
  const [floorHeight, setFloorHeight] = useState(defaultFloorHeight("ft"));
  const [progress, setProgress] = useState(0);
  const [assets, setAssets] = useState(emptyAssets);
  const [gateOpen, setGateOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file?.previewUrl;

  const displayName = projectName.trim() || studioCopy.config.namePlaceholder;
  const bounds = heightBounds(unit);
  const modelReady = phase === "ready";
  const converting = phase === "converting";
  const canConvert = Boolean(file) && !converting;
  const currentStep = converting ? "model" : step;

  const currentProgress = useMemo(() => {
    const reached = studioCopy.progress.filter((item) => progress >= item.at);
    return reached[reached.length - 1] ?? studioCopy.progress[0];
  }, [progress]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const applyFile = useCallback(
    (next: File) => {
      if (!isAcceptedLayout(next)) {
        setError(studioCopy.errors.type);
        return;
      }

      if (next.size > MAX_LAYOUT_BYTES) {
        setError(studioCopy.errors.size);
        return;
      }

      setError(null);
      setPhase("idle");
      setStep("layout");
      setProgress(0);
      setAssets(emptyAssets);

      const preview = next.type.startsWith("image/") ? URL.createObjectURL(next) : undefined;
      setFile((current) => {
        if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
        return {
          name: next.name,
          size: next.size,
          type: next.type,
          previewUrl: preview,
        };
      });

      setProjectName((name) =>
        name.trim()
          ? name
          : next.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      );
    },
    [],
  );

  function loadSample() {
    setError(null);
    setPhase("idle");
    setStep("layout");
    setProgress(0);
    setAssets(emptyAssets);
    setFile((current) => {
      if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
      return { ...SAMPLE_FILE };
    });
    setProjectName((name) => name.trim() || studioCopy.config.namePlaceholder);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeFile() {
    setFile((current) => {
      if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
      return null;
    });
    setPhase("idle");
    setStep("layout");
    setProgress(0);
    setAssets(emptyAssets);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function changeUnit(next: MeasurementUnit) {
    setFloorHeight((height) => convertFloorHeight(height, unit, next));
    setUnit(next);
  }

  function startConversion() {
    if (!file || converting) return;
    setPhase("converting");
    setStep("model");
    setProgress(0);
    setAssets(emptyAssets);
  }

  useEffect(() => {
    if (phase !== "converting") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timeout = window.setTimeout(() => {
        setProgress(100);
        setPhase("ready");
        setStep("model");
      }, 280);
      return () => window.clearTimeout(timeout);
    }

    const duration = 4200;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(100, ((now - started) / duration) * 100);
      setProgress(next);
      if (next >= 100) {
        setPhase("ready");
        setStep("model");
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  function generateAsset(id: StudioAssetId) {
    setAssets((current) => ({ ...current, [id]: "pending" }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setAssets((current) => ({ ...current, [id]: "ready" }));
      },
      reduced ? 200 : 1600,
    );
  }

  function goTo(next: StudioStepId) {
    if (next === "layout") {
      setStep(next);
      return;
    }
    if (next === "model" && (modelReady || converting)) {
      setStep(next);
      return;
    }
    if (next === "assets" && modelReady) setStep(next);
  }

  return (
    <div className="studio-shell flex min-h-dvh flex-col bg-bg-primary">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-primary/90 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Logo variant="header" />
            <span className="hidden h-4 w-px bg-border-subtle sm:block" />
            <p className="hidden text-sm text-text-muted sm:block">{studioCopy.title}</p>
            <span className="rounded-[4px] border border-border-subtle px-2 py-0.5 text-[11px] font-medium text-text-muted">
              {studioCopy.eyebrow}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden min-h-11 items-center px-2 text-sm text-text-muted transition-opacity hover:opacity-70 sm:inline-flex"
            >
              {studioCopy.back}
            </Link>
            <Button href="/#waitlist" className="px-4 py-2 text-sm">
              {studioCopy.waitlist}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)_20.5rem] lg:overflow-hidden">
        <aside className="border-b border-border-subtle lg:max-h-[calc(100dvh-3.5rem)] lg:overflow-y-auto lg:border-r lg:border-b-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
              {studioCopy.pipeline.heading}
            </p>
            <nav aria-label={studioCopy.pipeline.heading} className="mt-3">
              <ol className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-0">
                {studioCopy.pipeline.steps.map((item) => {
                  const enabled =
                    item.id === "layout" ||
                    (item.id === "model" && (modelReady || converting)) ||
                    (item.id === "assets" && modelReady);
                  const current = currentStep === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        disabled={!enabled}
                        aria-current={current ? "step" : undefined}
                        onClick={() => goTo(item.id)}
                        className="flex min-h-11 w-full items-center gap-3 rounded-[4px] px-2 py-2 text-left disabled:opacity-40"
                      >
                        <span className="font-mono text-[11px] text-text-faint">{item.number}</span>
                        <span
                          className={`text-sm ${current ? "font-medium text-text-primary" : "text-text-muted"}`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          <div className="hidden border-t border-border-subtle px-5 py-5 lg:block">
            <ProjectFields
              idPrefix="studio-desktop"
              projectName={projectName}
              unit={unit}
              floorHeight={floorHeight}
              bounds={bounds}
              disabled={converting}
              onNameChange={setProjectName}
              onUnitChange={changeUnit}
              onHeightChange={setFloorHeight}
            />
          </div>
        </aside>

        <main className="flex min-h-[28rem] flex-1 flex-col">
          <section
            className={`min-h-[28rem] flex-1 flex-col border-b border-border-subtle lg:border-b-0 ${
              step === "assets" ? "hidden lg:flex" : "flex"
            }`}
          >
            {converting ? (
              <ConversionStage progress={progress} current={currentProgress} />
            ) : (step === "model" || step === "assets") && modelReady ? (
              <ModelViewer projectName={displayName} floorHeight={floorHeight} unit={unit} />
            ) : file ? (
              <LayoutPreview
                file={file}
                error={error}
                onRemove={removeFile}
                onChange={() => inputRef.current?.click()}
              />
            ) : (
              <UploadStage
                dragOver={dragOver}
                error={error}
                onFile={applyFile}
                onSample={loadSample}
                onDragOver={setDragOver}
              />
            )}
          </section>
          {step === "assets" ? (
            <section className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:hidden">
              <AssetPanel
                statuses={assets}
                onGenerate={generateAsset}
                onDownload={() => setGateOpen(true)}
                projectName={displayName}
              />
            </section>
          ) : null}

          <input
            id="studio-layout-file"
            ref={inputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.dxf,application/pdf,image/png,image/jpeg"
            className="studio-file-input"
            onChange={(event) => {
              const next = event.target.files?.[0];
              if (next) applyFile(next);
            }}
          />
        </main>

        <aside className="border-t border-border-subtle lg:max-h-[calc(100dvh-3.5rem)] lg:overflow-y-auto lg:border-t-0 lg:border-l">
          <div className="px-4 py-5 sm:px-5 lg:hidden">
            <ProjectFields
              idPrefix="studio-mobile"
              projectName={projectName}
              unit={unit}
              floorHeight={floorHeight}
              bounds={bounds}
              disabled={converting}
              onNameChange={setProjectName}
              onUnitChange={changeUnit}
              onHeightChange={setFloorHeight}
            />
          </div>

          {step !== "assets" ? (
            <div className="border-t border-border-subtle px-4 py-5 sm:px-5">
              {file ? (
                <FileChip file={file} onRemove={removeFile} />
              ) : (
                <p className="text-sm text-text-muted">{studioCopy.upload.description}</p>
              )}

              {error ? (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <Button
                className="mt-5 w-full"
                disabled={!canConvert}
                busy={converting}
                onClick={startConversion}
              >
                {converting
                  ? studioCopy.converting
                  : modelReady
                    ? studioCopy.regenerate
                    : studioCopy.convert}
              </Button>

              {modelReady ? (
                <div className="mt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
                    {studioCopy.result.rooms}
                  </p>
                  <ul className="mt-3 divide-y divide-border-subtle border-y border-border-subtle">
                    {studioCopy.rooms.map((room) => (
                      <li key={room.name} className="flex items-center justify-between py-3 text-sm">
                        <span>{room.name}</span>
                        <span className="text-text-muted">{unit === "ft" ? room.ft : room.m}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="secondary"
                    className="mt-5 w-full"
                    onClick={() => setStep("assets")}
                  >
                    {studioCopy.pipeline.steps[2].label}
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === "assets" && modelReady ? (
            <div className="hidden border-t border-border-subtle px-5 py-5 lg:block">
              <AssetPanel
                statuses={assets}
                onGenerate={generateAsset}
                onDownload={() => setGateOpen(true)}
                projectName={displayName}
              />
            </div>
          ) : null}
        </aside>
      </div>

      <WaitlistGate open={gateOpen} onClose={() => setGateOpen(false)} />
    </div>
  );
}

function ProjectFields({
  idPrefix,
  projectName,
  unit,
  floorHeight,
  bounds,
  disabled,
  onNameChange,
  onUnitChange,
  onHeightChange,
}: {
  idPrefix: string;
  projectName: string;
  unit: MeasurementUnit;
  floorHeight: number;
  bounds: { min: number; max: number; step: number };
  disabled: boolean;
  onNameChange: (value: string) => void;
  onUnitChange: (value: MeasurementUnit) => void;
  onHeightChange: (value: number) => void;
}) {
  const fieldClass =
    "mt-2 min-h-11 w-full rounded-[4px] border border-border-subtle bg-bg-surface px-3 py-2.5 text-sm text-text-primary transition-colors hover:border-text-faint focus-visible:outline-none disabled:opacity-50";
  const nameId = `${idPrefix}-project-name`;
  const unitId = `${idPrefix}-unit`;
  const heightId = `${idPrefix}-height`;

  return (
    <div className="grid gap-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
        {studioCopy.config.heading}
      </p>
      <div>
        <label htmlFor={nameId} className="block text-sm font-medium">
          {studioCopy.config.name}
        </label>
        <input
          id={nameId}
          value={projectName}
          disabled={disabled}
          placeholder={studioCopy.config.namePlaceholder}
          onChange={(event) => onNameChange(event.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor={unitId} className="block text-sm font-medium">
          {studioCopy.config.unit}
        </label>
        <select
          id={unitId}
          value={unit}
          disabled={disabled}
          onChange={(event) => onUnitChange(event.target.value as MeasurementUnit)}
          className={fieldClass}
        >
          <option value="ft">{studioCopy.config.feet}</option>
          <option value="m">{studioCopy.config.meters}</option>
        </select>
      </div>
      <div>
        <label htmlFor={heightId} className="block text-sm font-medium">
          {studioCopy.config.height}
        </label>
        <input
          id={heightId}
          type="number"
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={floorHeight}
          disabled={disabled}
          onChange={(event) => onHeightChange(Number(event.target.value))}
          className={fieldClass}
        />
      </div>
    </div>
  );
}

function FileChip({ file, onRemove }: { file: StudioFile; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[4px] border border-border-subtle bg-bg-surface px-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-bg-surface-deep font-mono text-[10px] font-medium tracking-[0.08em]">
          {fileBadge(file.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="mt-0.5 text-xs text-text-faint">
            {file.isSample ? studioCopy.upload.sampleSize : formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-[4px] px-2 py-1 text-xs font-medium text-text-muted hover:text-text-primary"
      >
        {studioCopy.upload.remove}
      </button>
    </div>
  );
}

function UploadStage({
  dragOver,
  error,
  onFile,
  onSample,
  onDragOver,
}: {
  dragOver: boolean;
  error: string | null;
  onFile: (file: File) => void;
  onSample: () => void;
  onDragOver: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-5 sm:p-8">
      <div className="w-full max-w-xl">
        <label
          htmlFor="studio-layout-file"
          onDragOver={(event) => {
            event.preventDefault();
            onDragOver(true);
          }}
          onDragLeave={() => onDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            onDragOver(false);
            const next = event.dataTransfer.files[0];
            if (next) onFile(next);
          }}
          className={`studio-drop flex min-h-[22rem] cursor-pointer flex-col items-center justify-center border border-dashed px-6 text-center transition-colors ${
            dragOver ? "border-bg-ink bg-bg-surface" : "border-border-subtle bg-bg-surface/70"
          }`}
        >
          <span className="flex size-14 items-center justify-center border border-border-subtle bg-bg-primary text-lg">
            ↑
          </span>
          <span className="mt-5 block text-xl tracking-[-0.03em]">{studioCopy.upload.title}</span>
          <span className="mt-2 block text-sm text-text-muted">{studioCopy.upload.description}</span>
          <span className="mt-4 block font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
            {studioCopy.upload.formats}
          </span>
        </label>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <div className="mt-5 flex justify-center">
          <Button variant="secondary" onClick={onSample}>
            {studioCopy.upload.sample}
          </Button>
        </div>
      </div>
    </div>
  );
}

function LayoutPreview({
  file,
  error,
  onRemove,
  onChange,
}: {
  file: StudioFile;
  error: string | null;
  onRemove: () => void;
  onChange: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
            {studioCopy.upload.heading}
          </p>
          <p className="mt-1 text-sm font-medium">{file.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="px-3 py-2 text-sm" onClick={onChange}>
            {studioCopy.upload.replace}
          </Button>
          <Button variant="secondary" className="px-3 py-2 text-sm" onClick={onRemove}>
            {studioCopy.upload.remove}
          </Button>
        </div>
      </div>
      <div className="studio-canvas flex min-h-[24rem] flex-1 items-center justify-center p-6">
        {file.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={file.previewUrl}
            alt={file.name}
            className="max-h-[28rem] max-w-full border border-border-subtle bg-bg-surface object-contain shadow-[0_18px_40px_rgba(8,9,11,0.08)]"
          />
        ) : (
          <div className="w-full max-w-xl border border-border-subtle bg-bg-surface p-4 shadow-[0_18px_40px_rgba(8,9,11,0.08)]">
            <StudioFloorPlan />
          </div>
        )}
      </div>
      {error ? (
        <p role="alert" className="px-5 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ConversionStage({
  progress,
  current,
}: {
  progress: number;
  current: (typeof studioCopy.progress)[number];
}) {
  const value = Math.round(progress);

  return (
    <div className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
        {studioCopy.converting}
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h2 className="text-2xl tracking-[-0.04em] sm:text-3xl">{current.label}</h2>
        <p className="font-mono text-sm text-text-muted" aria-live="polite">
          {value}%
        </p>
      </div>
      <p className="mt-2 text-sm text-text-muted">{current.detail}</p>
      <div className="mt-6 h-[3px] overflow-hidden bg-bg-surface-deep">
        <div className="studio-progress-fill h-full bg-bg-ink" style={{ width: `${value}%` }} />
      </div>
      <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {studioCopy.progress.map((item, index) => {
          const done = progress >= item.at;
          const active = current.id === item.id;
          return (
            <li
              key={item.id}
              className={`border px-3 py-3 text-sm ${
                done
                  ? "border-accent-emerald/40 bg-[#eef6f2] text-accent-emerald"
                  : active
                    ? "border-bg-ink bg-bg-surface text-text-primary"
                    : "border-border-subtle text-text-faint"
              }`}
            >
              <span className="font-mono text-[10px] tracking-[0.14em]">0{index + 1}</span>
              <span className="mt-1 block">{item.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
