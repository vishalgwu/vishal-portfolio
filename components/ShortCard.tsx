"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { emoji, gradients, type Short } from "@/lib/meta";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ShortCardProps {
  short: Short;
  onOpen: (p: Project) => void;
  className?: string;
}

/** A vertical 9:16 "Short": one number, one label, one project. */
export default function ShortCard({ short, onOpen, className }: ShortCardProps) {
  const { project, value, label } = short;
  const [a, b] = gradients[project.accent];
  return (
    <motion.button
      onClick={() => onOpen(project)}
      whileHover={{ y: -6, rotate: -1.2 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${value} ${label}, from ${project.title}. Watch the full project`}
      className={cn(
        "group relative aspect-[9/16] w-[160px] shrink-0 snap-start overflow-hidden rounded-2xl text-left text-white outline-none focus-visible:ring-2 focus-visible:ring-solid sm:w-[190px]",
        className,
      )}
      style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}
    >
      <div className="dots absolute inset-0 opacity-40 [mask-image:linear-gradient(180deg,black,transparent_65%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      <span className="absolute left-3 top-3 text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.25)] transition group-hover:rotate-12 group-hover:scale-110" aria-hidden>
        {emoji(project)}
      </span>
      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-black opacity-0 transition group-hover:opacity-100">
        <Play className="h-4 w-4 fill-black" />
      </span>
      <div className="absolute inset-x-3 top-1/3">
        <p className="font-display text-[clamp(1.6rem,4vw,2.3rem)] font-extrabold leading-[0.98] tracking-tight [text-shadow:0_3px_0_rgba(0,0,0,0.3)]">
          {value}
        </p>
        <p className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-wider text-white/85">{label}</p>
      </div>
      <p className="absolute inset-x-3 bottom-3 line-clamp-2 text-xs font-bold leading-snug">{project.title}</p>
    </motion.button>
  );
}
