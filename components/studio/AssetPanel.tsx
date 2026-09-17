"use client";

import type { ReactNode } from "react";
import { LoopVideo } from "@/components/marketing/LoopVideo";
import { PamphletMock, WebsiteMock } from "@/components/marketing/TransformationVisual";
import { Button } from "@/components/ui/Button";
import { studioCopy, type StudioAssetId } from "@/content/copy/studio";
import { homeCopy } from "@/content/copy/home";

type AssetStatus = "idle" | "pending" | "ready";

type AssetPanelProps = {
  statuses: Record<StudioAssetId, AssetStatus>;
  onGenerate: (id: StudioAssetId) => void;
  onDownload: () => void;
  projectName: string;
};

export function AssetPanel({ statuses, onGenerate, onDownload, projectName }: AssetPanelProps) {
  const clip = homeCopy.film.clips.find((item) => item.kind === "video" && item.id === "living");
  const { assets } = studioCopy;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-medium tracking-[-0.03em]">{assets.heading}</h2>
        <p className="mt-1 text-sm text-text-muted">{assets.description}</p>
      </div>

      <div className="border-t border-border-subtle pt-5">
        <h3 className="text-sm font-medium">{assets.download.title}</h3>
        <p className="mt-1 text-sm text-text-muted">{assets.download.description}</p>
        <Button className="mt-4" onClick={onDownload}>
          {assets.download.action}
        </Button>
      </div>

      <AssetCard
        title={assets.video.title}
        description={assets.video.description}
        action={assets.video.action}
        pending={assets.video.pending}
        ready={assets.video.ready}
        status={statuses.video}
        onGenerate={() => onGenerate("video")}
      >
        {statuses.video === "ready" && clip && clip.kind === "video" ? (
          <div className="overflow-hidden rounded-[4px] border border-border-subtle bg-[#111318]">
            <LoopVideo src={clip.src} poster={clip.poster} label={clip.label} />
          </div>
        ) : null}
      </AssetCard>

      <AssetCard
        title={assets.website.title}
        description={assets.website.description}
        action={assets.website.action}
        pending={assets.website.pending}
        ready={assets.website.ready}
        status={statuses.website}
        onGenerate={() => onGenerate("website")}
      >
        {statuses.website === "ready" ? (
          <div className="overflow-hidden rounded-[4px] border border-border-subtle bg-bg-surface p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
              {projectName}
            </p>
            <WebsiteMock />
          </div>
        ) : null}
      </AssetCard>

      <AssetCard
        title={assets.pamphlet.title}
        description={assets.pamphlet.description}
        action={assets.pamphlet.action}
        pending={assets.pamphlet.pending}
        ready={assets.pamphlet.ready}
        status={statuses.pamphlet}
        onGenerate={() => onGenerate("pamphlet")}
      >
        {statuses.pamphlet === "ready" ? (
          <div className="overflow-hidden rounded-[4px] border border-border-subtle bg-bg-surface p-3">
            <PamphletMock />
          </div>
        ) : null}
      </AssetCard>
    </div>
  );
}

function AssetCard({
  title,
  description,
  action,
  pending,
  ready,
  status,
  onGenerate,
  children,
}: {
  title: string;
  description: string;
  action: string;
  pending: string;
  ready: string;
  status: AssetStatus;
  onGenerate: () => void;
  children?: ReactNode;
}) {
  return (
    <article className="border-t border-border-subtle pt-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        </div>
        {status === "ready" ? (
          <span className="shrink-0 rounded-[4px] border border-accent-emerald px-2 py-0.5 text-[11px] font-medium text-accent-emerald">
            {ready}
          </span>
        ) : null}
      </div>
      {status === "idle" ? (
        <Button variant="secondary" className="mt-4" onClick={onGenerate}>
          {action}
        </Button>
      ) : null}
      {status === "pending" ? (
        <p className="mt-4 text-sm text-text-muted" role="status">
          {pending}
        </p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
