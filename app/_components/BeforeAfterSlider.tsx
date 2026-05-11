"use client";

import { useState } from "react";

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-12 sm:px-6"
      aria-labelledby="before-after-heading"
    >
      <h2 id="before-after-heading" className="text-xl font-bold text-zinc-900">
        Before / after audit
      </h2>
      <p className="mt-2 text-sm text-zinc-600">
        Drag to compare a typical bill summary before and after fixes we flag.
      </p>
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-inner">
        <div className="grid grid-cols-2 gap-0 text-xs sm:text-sm">
          <div className="border-r border-zinc-200 bg-white p-4">
            <p className="font-semibold text-zinc-500">Before</p>
            <p className="mt-2 font-mono text-zinc-800">Demand ₹42,000</p>
            <p className="font-mono text-zinc-800">FPPCA ₹18,200</p>
          </div>
          <div className="bg-orange-50 p-4">
            <p className="font-semibold text-orange-800">After (illustrative)</p>
            <p className="mt-2 font-mono text-zinc-900">Demand ₹31,500</p>
            <p className="font-mono text-zinc-900">FPPCA ₹14,100</p>
          </div>
        </div>
        <div className="border-t border-zinc-200 bg-white px-4 py-3">
          <label htmlFor="ba-range" className="sr-only">
            Before after position
          </label>
          <input
            id="ba-range"
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
        </div>
      </div>
    </section>
  );
}
