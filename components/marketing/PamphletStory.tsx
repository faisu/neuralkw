"use client";

import { OutputStory, type OutputCanvasProps } from "@/components/marketing/OutputStory";
import { StoryModel } from "@/components/marketing/StoryFrame";
import { PropertyModel, StudioFloorPlan } from "@/components/studio/PropertyModel";
import { homeCopy } from "@/content/copy/home";
import { studioCopy } from "@/content/copy/studio";
import { easeOut, range } from "@/lib/story-scroll";

export function PamphletStory() {
  return <OutputStory id="pamphlet" story={homeCopy.pamphlet} canvas={PamphletCanvas} />;
}

function PamphletCanvas({ progress, converting, ready }: OutputCanvasProps) {
  const sheetIn = easeOut(range(progress, 0.04, 0.2));
  const convertT = range(progress, 0.28, 0.64);
  const fill = easeOut(range(progress, 0.32, 0.7));
  const open = easeOut(range(progress, 0.58, 0.88));
  const modelBack = 1 - easeOut(range(progress, 0.2, 0.42));
  const rooms = studioCopy.rooms.slice(0, 4);

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          opacity: modelBack,
          transform: `scale(${0.86 + modelBack * 0.08})`,
        }}
      >
        <StoryModel rotation={-36 + sheetIn * 12} tilt={70 - open * 8} scale={0.88} />
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center p-3 sm:p-10"
        style={{ opacity: sheetIn, perspective: "1600px" }}
      >
        <div
          className="story-spread relative flex h-[min(22rem,82%)] w-full max-w-3xl sm:h-[min(28rem,78%)]"
          style={{
            transform: `rotateX(${16 - open * 14}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <article
            className="story-spread-page relative w-1/2 overflow-hidden rounded-l-[4px] border border-border-subtle bg-[#f7f8fa] shadow-[0_24px_50px_rgba(8,9,11,0.12)]"
            style={{
              transform: `rotateY(${-38 + open * 38}deg)`,
              transformOrigin: "right center",
            }}
          >
            <div className="flex h-full flex-col p-2.5 sm:p-6">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint"
                style={{ opacity: fill }}
              >
                {homeCopy.pamphlet.project}
              </p>
              <h3
                className="mt-1 text-sm tracking-[-0.04em] text-text-primary sm:mt-1 sm:text-xl"
                style={{ opacity: fill }}
              >
                A courtyard residence
              </h3>
              <div
                className="mt-3 min-h-0 flex-[1.2] overflow-hidden rounded-[4px] border border-border-subtle bg-white"
                style={{ opacity: 0.2 + fill * 0.8 }}
              >
                <StudioFloorPlan className="h-full w-full object-contain" />
              </div>
              <p
                className="mt-2 hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint sm:block"
                style={{ opacity: fill }}
              >
                Cover · Plan 1:150
              </p>
            </div>
            {converting ? (
              <span className="create-story-scan" style={{ top: `${14 + convertT * 72}%` }} />
            ) : null}
          </article>

          <article
            className="story-spread-page relative w-1/2 overflow-hidden rounded-r-[4px] border border-l-0 border-border-subtle bg-white shadow-[0_24px_50px_rgba(8,9,11,0.12)]"
            style={{
              transform: `rotateY(${38 - open * 38}deg)`,
              transformOrigin: "left center",
            }}
          >
            <div className="flex h-full flex-col p-2.5 sm:p-6">
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
                Interior
              </p>
              <div
                className="relative mt-2 min-h-[4.5rem] flex-1 overflow-hidden rounded-[4px] bg-[#eef2f6] sm:mt-3 sm:min-h-[7rem]"
                style={{ opacity: 0.18 + fill * 0.82 }}
              >
                <div
                  className="studio-iso-stage"
                  style={{ transform: `scale(${0.55 + open * 0.08})` }}
                >
                  <div
                    className="studio-iso"
                    style={{
                      transform: `rotateX(58deg) rotateZ(-26deg) scale(0.62)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <PropertyModel wallHeight={40} />
                  </div>
                </div>
              </div>
              <ul className="mt-2 hidden shrink-0 grid-cols-2 gap-x-3 gap-y-1.5 sm:mt-3 sm:grid">
                {rooms.map((room, index) => (
                  <li
                    key={room.name}
                    className="flex items-center justify-between text-xs"
                    style={{ opacity: convertT > 0.35 + index * 0.12 || ready ? fill : 0.15 }}
                  >
                    <span>{room.name}</span>
                    <span className="font-mono text-[10px] text-text-faint">{room.m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
