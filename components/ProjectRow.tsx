"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Category, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectRowProps {
  category: Category;
  projects: Project[];
  onOpen: (project: Project, layoutId: string) => void;
}

export default function ProjectRow({ category, projects, onOpen }: ProjectRowProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, projects.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <motion.section
      id={`row-${category.id}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="scroll-mt-20 py-3"
      aria-labelledby={`row-title-${category.id}`}
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id={`row-title-${category.id}`} className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              <span className="mr-2">{category.emoji}</span>
              {category.title}
              <span className="ml-3 align-middle font-mono text-xs font-normal text-slate-500">
                {projects.length} {projects.length === 1 ? "project" : "projects"}
              </span>
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-400">{category.blurb}</p>
          </div>
          <div className="hidden gap-2 md:flex">
            {([-1, 1] as const).map((dir) => {
              const enabled = dir === -1 ? canLeft : canRight;
              return (
                <button
                  key={dir}
                  onClick={() => scrollBy(dir)}
                  disabled={!enabled}
                  aria-label={dir === -1 ? "Scroll left" : "Scroll right"}
                  className={cn(
                    "glass grid h-9 w-9 place-items-center rounded-full transition",
                    enabled ? "text-white hover:border-cyber hover:shadow-[0_0_18px_rgba(6,182,212,0.5)]" : "cursor-not-allowed text-slate-600",
                  )}
                >
                  {dir === -1 ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scroller}
          onScroll={update}
          className="no-scrollbar mx-auto flex max-w-[1800px] snap-x snap-proximity gap-4 overflow-x-auto px-4 sm:gap-5 sm:px-6 lg:px-10"
        >
          {projects.map((p) => (
            <div key={p.slug} className="shrink-0">
              <ProjectCard project={p} layoutPrefix={category.id} onOpen={onOpen} />
            </div>
          ))}
          <div className="w-2 shrink-0 lg:w-6" aria-hidden />
        </div>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-obsidian to-transparent transition-opacity sm:w-14",
            canLeft ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-obsidian to-transparent transition-opacity sm:w-14",
            canRight ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </motion.section>
  );
}
