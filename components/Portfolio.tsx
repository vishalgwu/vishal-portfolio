"use client";

import { useCallback, useMemo, useState } from "react";
import { Mail, Search, X } from "lucide-react";
import { Github, Linkedin } from "./icons";
import BackgroundGlow from "./BackgroundGlow";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProjectRow from "./ProjectRow";
import ProjectModal from "./ProjectModal";
import RecruiterMode from "./RecruiterMode";
import { categories, profile, projects } from "@/lib/data";
import type { Project } from "@/lib/types";

export default function Portfolio() {
  const [active, setActive] = useState<{ project: Project; layoutId: string } | null>(null);
  const [recruiter, setRecruiter] = useState(false);
  const [query, setQuery] = useState("");

  const openProject = useCallback((project: Project, layoutId: string) => {
    setActive({ project, layoutId });
  }, []);

  const openBySlug = useCallback((slug: string) => {
    const project = projects.find((p) => p.slug === slug);
    if (project) setActive({ project, layoutId: `recruiter-${slug}` });
  }, []);

  const closeProject = useCallback(() => setActive(null), []);
  const closeRecruiter = useCallback(() => setRecruiter(false), []);

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
      <BackgroundGlow />
      <Navbar onRecruiter={() => setRecruiter(true)} recruiterOpen={recruiter} />

      <main>
        <Hero onRecruiter={() => setRecruiter(true)} recruiterOpen={recruiter} />

        <div className="mx-auto mb-4 max-w-[1800px] px-4 sm:px-6 lg:px-10">
          <label className="glass flex max-w-xl items-center gap-3 rounded-full px-4 py-2.5 focus-within:border-cyber/60">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech: LangGraph, PyTorch, Qdrant, Docker..."
              aria-label="Search projects by title or technology"
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <div className="space-y-4 pb-10">
          {rows.map(({ category, items }) => (
            <ProjectRow key={category.id} category={category} projects={items} onOpen={openProject} />
          ))}
          {total === 0 && (
            <p className="px-4 py-16 text-center text-slate-400 sm:px-6">
              No projects match &ldquo;{query}&rdquo;. Try a framework name like LangGraph or PyTorch.
            </p>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-center font-mono text-xs text-slate-500 sm:text-left">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind and Framer Motion. Data audited from github.com/vishalgwu.
          </p>
          <div className="flex gap-3">
            {[
              { href: profile.github, label: "GitHub", Icon: Github },
              { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="glass grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:border-cyber/60 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ProjectModal project={active?.project ?? null} layoutId={active?.layoutId ?? null} onClose={closeProject} />
      <RecruiterMode open={recruiter} onClose={closeRecruiter} onOpenProject={openBySlug} />
    </>
  );
}
