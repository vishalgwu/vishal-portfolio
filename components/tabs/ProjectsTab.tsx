"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoCard from "../VideoCard";
import { categories, projects } from "@/lib/data";
import { matches, topTech } from "@/lib/meta";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

type Sort = "new" | "stars" | "az";

interface ProjectsTabProps {
  query: string;
  filter: string;
  onFilter: (f: string) => void;
  onOpen: (p: Project) => void;
}

const tech = topTech(8);

export default function ProjectsTab({ query, filter, onFilter, onOpen }: ProjectsTabProps) {
  const [sort, setSort] = useState<Sort>("new");

  const list = useMemo(() => {
    const base = projects.filter((p) => {
      if (!matches(p, query)) return false;
      if (filter === "all") return true;
      if (filter.startsWith("tech:")) return p.stack.includes(filter.slice(5));
      return p.categories.includes(filter as Project["categories"][number]);
    });
    return [...base].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars || b.updated.localeCompare(a.updated);
      if (sort === "az") return a.title.localeCompare(b.title);
      return b.updated.localeCompare(a.updated);
    });
  }, [query, filter, sort]);

  const chips: { id: string; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c.id, label: `${c.emoji} ${c.title.split(",")[0].split(" & ")[0]}` })),
    ...tech.map((t) => ({ id: `tech:${t}`, label: t })),
  ];

  return (
    <div className="pt-4">
      <div className="sticky top-[6.4rem] z-20 -mx-4 flex items-center gap-2 bg-bg/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          {chips.map((c) => (
            <button key={c.id} onClick={() => onFilter(c.id)} aria-pressed={filter === c.id} className={cn("chip", filter === c.id && "chip-on")}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="hidden shrink-0 items-center gap-2 text-sm text-ink2 sm:flex">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-line/15 bg-surface px-2 py-1.5 text-sm font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-solid"
          >
            <option value="new">Recently updated</option>
            <option value="stars">Most starred</option>
            <option value="az">A to Z</option>
          </select>
        </label>
      </div>

      <p className="mb-3 text-sm text-ink2">
        {list.length} {list.length === 1 ? "video" : "videos"}
        {query && <> matching “{query}”</>}
      </p>

      <motion.div layout className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
            >
              <VideoCard project={p} onOpen={onOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-5xl">🫥</p>
          <p className="mt-3 font-display text-xl font-bold">Nothing here yet</p>
          <p className="text-ink2">Try another chip, or clear the search.</p>
        </div>
      )}
    </div>
  );
}
