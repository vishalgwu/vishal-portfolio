"use client";

import ShortCard from "../ShortCard";
import { getShorts } from "@/lib/meta";
import type { Project } from "@/lib/types";

export default function ShortsTab({ onOpen }: { onOpen: (p: Project) => void }) {
  const shorts = getShorts();
  return (
    <div className="pt-5">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">Shorts</h2>
        <p className="font-hand text-2xl text-brand">the number, the label, the project. tap for the full video.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-8">
        {shorts.map((s, i) => (
          <ShortCard key={`${s.project.slug}-${i}`} short={s} onOpen={onOpen} className="!w-full" />
        ))}
      </div>
    </div>
  );
}
