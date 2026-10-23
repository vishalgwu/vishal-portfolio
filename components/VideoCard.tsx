"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import Avatar from "./Avatar";
import Thumb from "./Thumb";
import { fmtUpdated } from "@/lib/meta";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  className?: string;
}

/** YouTube card. Hovering (or focusing) it plays a preview that cycles the project's metrics. */
export default function VideoCard({ project, onOpen, className }: VideoCardProps) {
  const [preview, setPreview] = useState<number | null>(null);
  const [active, setActive] = useState(false);
  const delay = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setPreview(null);
      return;
    }
    delay.current = setTimeout(() => setPreview(0), 350);
    const id = setInterval(() => setPreview((i) => (i === null ? 0 : i + 1)), 1500);
    return () => {
      if (delay.current) clearTimeout(delay.current);
      clearInterval(id);
    };
  }, [active]);

  return (
    <article
      className={cn("group cursor-pointer", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <button
        onClick={() => onOpen(project)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        aria-label={`Watch ${project.title}`}
        className="block w-full rounded-xl text-left outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-solid group-hover:-translate-y-1 group-hover:rounded-2xl"
      >
        <Thumb project={project} preview={preview} className="group-hover:shadow-[0_10px_30px_-8px_rgba(10,102,194,0.55)]" />
        <div className="mt-3 flex gap-3">
          <Avatar size={36} />
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-ink">{project.title}</h3>
            <p className="mt-0.5 line-clamp-1 text-[13px] text-ink2">{project.tagline}</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-ink2">
              <span className="inline-flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-sun text-sun" />
                {project.stars}
              </span>
              <span aria-hidden>·</span>
              <span>{project.language}</span>
              <span aria-hidden>·</span>
              <span>Updated {fmtUpdated(project.updated)}</span>
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}
