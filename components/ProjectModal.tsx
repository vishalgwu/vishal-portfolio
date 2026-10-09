"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Star, X, Calendar, Layers, Gauge, Wrench, Workflow } from "lucide-react";
import { Github } from "./icons";
import { accentHex } from "@/lib/data";
import type { Project } from "@/lib/types";

interface ProjectModalProps {
  project: Project | null;
  layoutId: string | null;
  onClose: () => void;
}

function SectionTitle({ icon: Icon, children, color }: { icon: typeof Layers; children: string; color: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em]" style={{ color }}>
      <Icon className="h-4 w-4" />
      {children}
    </h3>
  );
}

export default function ProjectModal({ project, layoutId, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && layoutId && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            style={{ ["--accent" as string]: accentHex[project.accent] }}
            className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-glass shadow-[0_0_80px_-10px_var(--accent)] sm:max-h-[90vh] sm:rounded-3xl"
          >
            <div
              className="relative shrink-0 overflow-hidden px-5 pb-6 pt-8 sm:px-8"
              style={{
                background: `radial-gradient(110% 130% at 10% 0%, ${accentHex[project.accent]}55 0%, transparent 65%), linear-gradient(160deg,#131a29,#0f172a)`,
              }}
            >
              <div className="grid-pattern absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close project details"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-300">
                  <span className="rounded-md border border-white/15 bg-black/30 px-2 py-0.5 uppercase tracking-wider">{project.language}</span>
                  <span className="flex items-center gap-1 rounded-md border border-white/15 bg-black/30 px-2 py-0.5 text-amber-300">
                    <Star className="h-3 w-3 fill-amber-300" /> {project.stars}
                  </span>
                  <span className="flex items-center gap-1 rounded-md border border-white/15 bg-black/30 px-2 py-0.5">
                    <Calendar className="h-3 w-3" /> updated {project.updated}
                  </span>
                  <span className="rounded-md border px-2 py-0.5" style={{ borderColor: `${accentHex[project.accent]}77`, color: accentHex[project.accent] }}>
                    {project.status}
                  </span>
                </div>
                <h2 id="modal-title" className="mt-3 pr-10 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-slate-300 sm:text-base">{project.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-obsidian transition hover:scale-[1.03]"
                  >
                    <Github className="h-4 w-4" /> View repository
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <ExternalLink className="h-4 w-4" /> Live demo
                    </a>
                  )}
                  {project.secondary && (
                    <a
                      href={project.secondary.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <ExternalLink className="h-4 w-4" /> {project.secondary.label}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="thin-scroll min-h-0 flex-1 space-y-8 overflow-y-auto px-5 py-6 sm:px-8">
              <section>
                <SectionTitle icon={Layers} color={accentHex[project.accent]}>Overview</SectionTitle>
                <p className="leading-relaxed text-slate-300">{project.overview}</p>
              </section>

              <section>
                <SectionTitle icon={Gauge} color={accentHex[project.accent]}>Metrics</SectionTitle>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-base font-bold leading-snug text-white sm:text-lg">{m.value}</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-slate-400">{m.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle icon={Workflow} color={accentHex[project.accent]}>Architecture</SectionTitle>
                <pre className="thin-scroll overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-[11.5px] leading-relaxed text-cyan-200 sm:text-xs">
                  {project.architecture}
                </pre>
              </section>

              <section>
                <SectionTitle icon={Wrench} color={accentHex[project.accent]}>Engineering challenges solved</SectionTitle>
                <ul className="space-y-2.5">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accentHex[project.accent] }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <SectionTitle icon={Layers} color={accentHex[project.accent]}>Tech stack</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-3 py-1 font-mono text-xs text-slate-100"
                      style={{ borderColor: `${accentHex[project.accent]}66`, background: `${accentHex[project.accent]}1a` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
