"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { asset } from "@/lib/assets";
import { badge, emoji, gradients, sticker, thumbTitle } from "@/lib/meta";
import { cn } from "@/lib/utils";

interface ThumbProps {
  project: Project;
  /** index into project.metrics while a hover preview is playing, else null */
  preview?: number | null;
  className?: string;
  big?: boolean;
  small?: boolean;
}

/** A YouTube-style thumbnail: bold title, emoji sticker, "duration" badge, hover preview. */
export default function Thumb({ project, preview = null, className, big = false, small = false }: ThumbProps) {
  const [a, b] = gradients[project.accent];
  const st = sticker(project);
  const metric = preview !== null ? project.metrics[preview % project.metrics.length] : null;

  return (
    <div
      className={cn("group/thumb relative aspect-video w-full overflow-hidden rounded-xl", className)}
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
    >
      {project.thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(project.thumb)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-60 mix-blend-luminosity" />
      )}
      <div className="dots absolute inset-0 opacity-40 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <span
        className={cn(
          "absolute left-3 top-2 -rotate-6 select-none drop-shadow-[0_4px_0_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover/thumb:rotate-6 group-hover/thumb:scale-110",
          big ? "text-6xl sm:text-7xl" : small ? "text-2xl" : "text-4xl sm:text-5xl",
        )}
        aria-hidden
      >
        {emoji(project)}
      </span>

      {st && (
        <span
          className="sticker absolute right-2 top-2 rotate-6"
          style={{ background: st.color }}
        >
          {st.text}
        </span>
      )}

      <p
        className={cn(
          "absolute bottom-2 left-3 right-14 font-display font-extrabold leading-[1.02] tracking-tight text-white [text-shadow:0_2px_0_rgba(0,0,0,0.35)]",
          big ? "text-3xl sm:text-5xl" : small ? "text-[13px]" : "text-lg sm:text-[22px]",
        )}
      >
        {thumbTitle(project)}
      </p>

      <span className={cn("absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 font-mono font-semibold text-white", small ? "text-[9px]" : "text-[11px]")}>
        {badge(project)}
      </span>

      <AnimatePresence mode="wait">
        {metric && (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-center backdrop-blur-[2px]"
          >
            <motion.p
              initial={{ scale: 0.7, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={cn("font-display font-extrabold leading-tight text-white", big ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl")}
            >
              {metric.value}
            </motion.p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/70">{metric.label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
