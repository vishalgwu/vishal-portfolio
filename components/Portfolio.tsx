"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, FileText, GraduationCap, Mail } from "lucide-react";
import { Github, Linkedin } from "./icons";
import ProjectModal from "./ProjectModal";
import { categories, profile, projects, projectsFor } from "@/lib/data";
import { asset } from "@/lib/assets";
import type { CategoryId, Project } from "@/lib/types";

const INITIAL = 6;
const NAV = [
  ["About", "about"],
  ["Featured", "featured"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Research", "research"],
  ["Skills", "skills"],
] as const;

function Card({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-xl bg-white p-5 shadow-card sm:p-6">
      <h2 className="mb-4 text-xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const featured = useMemo(() => projects.filter((p) => p.thumb), []);
  const list = useMemo(() => (filter === "all" ? projects : projectsFor(filter)), [filter]);
  const visible = expanded ? list : list.slice(0, INITIAL);
  const chips = categories.filter((c) => c.id !== "featured");
  const initials = profile.name.split(" ").map((w) => w[0]).join("");

  return (
    <>
      <header className="no-print sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">{initials}</span>
            <span className="hidden text-sm font-semibold sm:block">{profile.name}</span>
          </a>
          <nav aria-label="Sections" className="no-scrollbar flex gap-1 overflow-x-auto">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-mute hover:bg-chip hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto grid max-w-page gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-4">
          <section className="overflow-hidden rounded-xl bg-white shadow-card">
            <div className="h-28 bg-gradient-to-r from-[#dfe7ef] via-[#e7eaee] to-[#efe9e1] sm:h-40" />
            <div className="px-5 pb-6 sm:px-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("vishal.jpg")}
                alt={`Portrait of ${profile.name}`}
                width={160}
                height={160}
                className="-mt-14 h-28 w-28 rounded-full border-4 border-white bg-chip object-cover sm:-mt-20 sm:h-40 sm:w-40"
              />
              <h1 className="mt-3 text-2xl font-semibold text-ink">{profile.name}</h1>
              <p className="mt-0.5 text-base text-ink">{profile.headline}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-mute">
                <GraduationCap className="h-4 w-4 shrink-0" /> {profile.school}, {profile.degree}
              </p>
              <div className="no-print mt-5 flex flex-wrap gap-2">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark">
                  <Mail className="h-4 w-4" /> Contact me
                </a>
                <a href="resume/" className="inline-flex items-center gap-2 rounded-full border border-brand px-5 py-1.5 text-sm font-semibold text-brand hover:bg-brand-soft">
                  <FileText className="h-4 w-4" /> Resume
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-mute/50 px-5 py-1.5 text-sm font-semibold text-mute hover:bg-chip">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-mute/50 px-5 py-1.5 text-sm font-semibold text-mute hover:bg-chip">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </section>

          <Card id="about" title="About">
            <p className="text-sm leading-relaxed text-ink sm:text-[15px]">{profile.tagline}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink sm:text-[15px]">
              {profile.competencies.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mute" />
                  {c}
                </li>
              ))}
            </ul>
          </Card>

          <Card id="featured" title="Featured">
            <div className="grid gap-4 sm:grid-cols-3">
              {featured.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setOpen(p)}
                  className="group overflow-hidden rounded-lg border border-line bg-white text-left transition hover:shadow-pop"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(p.thumb!)} alt="" loading="lazy" className="aspect-[16/10] w-full border-b border-line object-cover object-top" />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-ink group-hover:text-brand group-hover:underline">{p.title}</h3>
                    <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-mute">{p.tagline}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card id="experience" title="Experience">
            <ul className="space-y-5">
              {profile.experience.map((e) => (
                <li key={e.org} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-chip text-lg font-semibold text-mute">{e.org[0]}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{e.role}</h3>
                    <p className="text-sm text-mute">{e.org}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 border-t border-line pt-5 text-lg font-semibold text-ink">Education</h3>
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-chip text-mute">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div>
                <h4 className="text-[15px] font-semibold text-ink">{profile.school}</h4>
                <p className="text-sm text-mute">{profile.degree}</p>
              </div>
            </div>
          </Card>

          <Card id="projects" title={`Projects (${projects.length})`}>
            <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto" role="group" aria-label="Filter projects">
              {[{ id: "all" as const, title: "All" }, ...chips].map((c) => {
                const active = filter === c.id;
                return (
                  <button
                    key={c.id}
                    aria-pressed={active}
                    onClick={() => {
                      setFilter(c.id);
                      setExpanded(false);
                    }}
                    className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                      active ? "border-ink bg-ink text-white" : "border-mute/50 text-mute hover:bg-chip"
                    }`}
                  >
                    {c.title}
                  </button>
                );
              })}
            </div>
            <ul className="divide-y divide-line">
              {visible.map((p) => (
                <li key={p.slug}>
                  <button onClick={() => setOpen(p)} className="group block w-full py-4 text-left">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[15px] font-semibold text-ink group-hover:text-brand group-hover:underline">{p.title}</h3>
                      {p.demo && <span className="shrink-0 rounded bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">Live</span>}
                    </div>
                    <p className="mt-0.5 text-sm text-mute">{p.tagline}</p>
                    <p className="mt-2 text-xs text-mute">
                      <span className="font-semibold text-ink">Skills:</span> {p.stack.slice(0, 6).join(" · ")}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
            {list.length > INITIAL && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="-mx-5 -mb-5 mt-1 block w-[calc(100%+2.5rem)] border-t border-line py-3 text-center text-sm font-semibold text-mute hover:bg-chip sm:-mx-6 sm:-mb-6 sm:w-[calc(100%+3rem)]"
              >
                {expanded ? "Show fewer" : `Show all ${list.length} projects →`}
              </button>
            )}
          </Card>

          <Card id="research" title="Research">
            <ul className="space-y-4">
              {profile.research.map((r) => (
                <li key={r.title}>
                  <h3 className="text-[15px] font-semibold text-ink">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{r.detail}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card id="skills" title="Skills">
            <div className="space-y-4">
              {profile.skills.map((g) => (
                <div key={g.group}>
                  <h3 className="mb-2 text-sm font-semibold text-ink">{g.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="rounded-full bg-chip px-3 py-1 text-xs font-medium text-ink">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <section className="rounded-xl bg-white p-5 shadow-card">
            <h2 className="mb-3 text-base font-semibold text-ink">Highlights</h2>
            <dl className="divide-y divide-line">
              {profile.headlineMetrics.map((m) => (
                <div key={m.label} className="flex items-baseline justify-between gap-3 py-2">
                  <dt className="text-sm text-mute">{m.label}</dt>
                  <dd className="shrink-0 text-sm font-semibold text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="rounded-xl bg-white p-5 shadow-card">
            <h2 className="mb-3 text-base font-semibold text-ink">Find me online</h2>
            <ul className="space-y-1 text-sm">
              {[
                ["GitHub", profile.github],
                ["LinkedIn", profile.linkedin],
                ["Resume (PDF)", "resume/"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center justify-between rounded-md px-2 py-1.5 font-medium text-brand hover:bg-brand-soft">
                    {label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl bg-white p-5 shadow-card">
            <h2 className="mb-3 text-base font-semibold text-ink">Live projects</h2>
            <ul className="space-y-1 text-sm">
              {projects.filter((p) => p.demo).map((p) => (
                <li key={p.slug}>
                  <a href={p.demo!} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 font-medium text-brand hover:bg-brand-soft">
                    <span className="truncate">{p.title}</span> <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>

      <footer className="no-print pb-10 text-center text-xs text-mute">© {new Date().getFullYear()} {profile.name}</footer>
      <ProjectModal project={open} onClose={close} />
    </>
  );
}
