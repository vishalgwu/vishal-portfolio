"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { accentHex } from "@/lib/data";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  layoutPrefix: string;
  onOpen: (project: Project, layoutId: string) => void;
}

const glyphs = ["{ }", "</>", "01", "λ", "∇", "Σ", "[]", "=>", "::", "#!"];

export default function ProjectCard({ project, layoutPrefix, onOpen }: ProjectCardProps) {
  const color = accentHex[project.accent];
  const layoutId = `${layoutPrefix}-${project.slug}`;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 220, damping: 20 });

  const px = useMotionValue(-200);
  const py = useMotionValue(-200);
  const spot = useMotionTemplate`radial-gradient(200px circle at ${px}px ${py}px, rgba(255,255,255,0.16), transparent 70%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - rect.left);
    py.set(e.clientY - rect.top);
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(project, layoutId);
    }
  };

  const seed = project.slug.length;
  const visibleStack = project.stack.slice(0, 3);

  return (
    <div className="snap-start py-6" style={{ perspective: 900 }}>
      <motion.div
        layoutId={layoutId}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title}`}
        data-cursor="Open"
        onClick={() => onOpen(project, layoutId)}
        onKeyDown={onKey}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.05, zIndex: 20 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", ["--accent" as string]: color }}
        className="group relative h-[300px] w-[230px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-charcoal outline-none transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_38px_-4px_var(--accent)] focus-visible:border-[var(--accent)] focus-visible:shadow-[0_0_38px_-4px_var(--accent)] xs:w-[250px] sm:h-[330px] sm:w-[270px] 3xl:h-[360px] 3xl:w-[300px]"
      >
        {/* poster background */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 20% 0%, ${color}55 0%, transparent 60%), radial-gradient(90% 70% at 100% 100%, ${color}33 0%, transparent 60%), linear-gradient(160deg, #131a29 0%, #0b1020 100%)`,
          }}
        />
        <div className="grid-pattern absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-xs text-white/[0.07]">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className="absolute text-3xl font-bold"
              style={{
                left: `${(i * 37 + seed * 11) % 85}%`,
                top: `${(i * 23 + seed * 7) % 75}%`,
                transform: `rotate(${((i + seed) % 5) * 9 - 18}deg)`,
              }}
            >
              {glyphs[(i + seed) % glyphs.length]}
            </span>
          ))}
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spot }}
        />

        {/* top row */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
          <span className="rounded-md border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-300 backdrop-blur">
            {project.language}
          </span>
          <span className="flex items-center gap-1 rounded-md border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[11px] text-amber-300 backdrop-blur">
            <Star className="h-3 w-3 fill-amber-300" />
            {project.stars}
          </span>
        </div>

        {/* bottom content */}
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent p-4 pt-16"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="text-lg font-bold leading-tight text-white drop-shadow">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-400 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
            {project.tagline}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleStack.map((s) => (
              <span
                key={s}
                className="rounded-full border px-2 py-0.5 font-mono text-[10px] text-slate-200"
                style={{ borderColor: `${color}66`, background: `${color}1f` }}
              >
                {s}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* hover preview */}
        <div className="absolute inset-0 flex flex-col justify-center bg-obsidian/85 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
            {project.status}
          </p>
          <p className="mt-2 line-clamp-6 text-[13px] leading-relaxed text-slate-200">{project.overview}</p>
          <p className="mt-3 text-xs font-semibold text-white">Click for the full breakdown →</p>
        </div>
      </motion.div>
    </div>
  );
}
