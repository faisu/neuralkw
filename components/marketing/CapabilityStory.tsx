"use client";

import { useState } from "react";
import { WorkspaceMock, type VisualKind } from "@/components/marketing/TransformationVisual";
import { homeCopy } from "@/content/copy/home";

export function CapabilityStory() {
  const { capabilities } = homeCopy;
  const [modeIndex, setModeIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const mode = capabilities.modes[modeIndex];
  const item = mode.items[itemIndex];
  const inverted = mode.id === "market";

  return (
    <section
      id="workflow"
      className={`scroll-mt-20 transition-colors duration-500 ${
        inverted ? "bg-bg-ink text-[#f8f9fb]" : "bg-bg-primary text-text-primary"
      }`}
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
        <div>
          <h2 className={`text-[15px] font-normal ${inverted ? "text-white/40" : "text-text-faint"}`}>
            {capabilities.heading}
          </h2>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Workflow">
            {capabilities.modes.map((entry, index) => {
              const selected = index === modeIndex;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`rounded-[4px] border bg-transparent px-3 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? inverted
                        ? "border-white/80 text-[#f8f9fb]"
                        : "border-accent-cyan text-accent-cyan"
                      : inverted
                        ? "border-white/15 text-white/55 hover:text-white"
                        : "border-border-subtle text-text-muted hover:text-text-primary"
                  }`}
                  onClick={() => {
                    setModeIndex(index);
                    setItemIndex(0);
                  }}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>
          <ul className="mt-8">
            {mode.items.map((entry, index) => {
              const active = index === itemIndex;
              return (
                <li key={entry.title}>
                  <button
                    type="button"
                    className={`block w-full py-1.5 text-left text-[2rem] leading-[1.12] tracking-[-0.04em] transition-colors md:text-[2.35rem] ${
                      active
                        ? inverted
                          ? "text-[#f8f9fb]"
                          : "text-text-primary"
                        : inverted
                          ? "text-white/28 hover:text-white/55"
                          : "text-black/18 hover:text-black/40"
                    }`}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setItemIndex(index)}
                    onMouseEnter={() => setItemIndex(index)}
                    onFocus={() => setItemIndex(index)}
                  >
                    {entry.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div key={`${mode.id}-${item.title}`} className="visual-swap">
            <WorkspaceMock kind={item.visual as VisualKind} />
          </div>
          <p className={`mt-4 text-sm ${inverted ? "text-white/55" : "text-text-muted"}`}>
            {item.description}
          </p>
        </div>
      </div>
    </section>
  );
}
