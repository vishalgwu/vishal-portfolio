"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, X } from "lucide-react";
import BackgroundGlow from "./BackgroundGlow";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Intro from "./Intro";
import Cursor from "./Cursor";
import Marquee from "./Marquee";
import Manifesto from "./Manifesto";
import Principles from "./Principles";
import ProjectRow from "./ProjectRow";
import ProjectModal from "./ProjectModal";
import RecruiterMode from "./RecruiterMode";
import Closing from "./Closing";
import { categories, projects } from "@/lib/data";
import type { Project } from "@/lib/types";

export default function Portfolio() {
  const [active, setActive] = useState<{ project: Project; layoutId: string } | null>(null);
  const [recruiter, setRecruiter] = useState(false);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const openProject = useCallback((project: Project, layoutId: string) => {
    setActive({ project, layoutId });
  }, []);

  const openBySlug = useCallback((slug: string) => {
    const project = projects.find((p) => p.slug === slug);
    if (project) setActive({ project, layoutId: `recruiter-${slug}` });
  }, []);

  const closeProject = useCallback(() => setActive(null), []);
  const closeRecruiter = useCallback(() => setRecruiter(false), []);
  const onIntroDone = useCallback(() => setReady(true), []);

  const q = query.trim().toLowerCase();
  const rows = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: projects.filter(
          (p) =>
            p.categories.includes(category.id) &&
            (!q ||
              p.title.toLowerCase().includes(q) ||
              p.tagline.toLowerCase().includes(q) ||
              p.stack.some((s) => s.toLowerCase().includes(q))),
        ),
      })),
    [q],
  );
  const total = rows.reduce((n, r) => n + r.items.length, 0);

  return (
    <>
      <Intro onDone={onIntroDone} />
      <Cursor />
      <BackgroundGlow />
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-cyber via-electric to-radiant"
        style={{ scaleX: progress }}
      />
      <Navbar onRecruiter={() => setRecruiter(true)} recruiterOpen={recruiter} />

      <main>
        <Hero ready={ready} onRecruiter={() => setRecruiter(true)} recruiterOpen={recruiter} />
        <Marquee />
        <Manifesto />
        <Principles onOpenProject={openBySlug} />

        <section id="catalog" className="scroll-mt-16 pb-16 pt-8">
          <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10">
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
              <span className="h-px w-10 bg-cyber" /> The catalog
            </p>
            <h2 className="font-display text-[clamp(2.2rem,6.5vw,6rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
              {projects.length} projects. <span className="text-slate-500">Pick a genre.</span>
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <label className="glass flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-2.5 focus-within:border-cyber/60">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by project or tech: LangGraph, PyTorch, Qdrant..."
                  aria-label="Search projects by title or technology"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} aria-label="Clear search" className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                {categories.map((c) => (
                  <a
                    key={c.id}
                    href={`#row-${c.id}`}
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:border-cyber/60 hover:text-white"
                  >
                    {c.emoji} {c.title.split(",")[0].split(" & ")[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {rows.map(({ category, items }) => (
              <ProjectRow key={category.id} category={category} projects={items} onOpen={openProject} />
            ))}
            {total === 0 && (
              <p className="px-4 py-16 text-center text-slate-400 sm:px-6">
                No projects match &ldquo;{query}&rdquo;. Try a framework name like LangGraph or PyTorch.
              </p>
            )}
          </div>
        </section>
      </main>

      <Closing />

      <ProjectModal project={active?.project ?? null} layoutId={active?.layoutId ?? null} onClose={closeProject} />
      <RecruiterMode open={recruiter} onClose={closeRecruiter} onOpenProject={openBySlug} />
    </>
  );
}
