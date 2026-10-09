"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Copy, Download, Mail, Timer, X } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { accentHex, profile, projects } from "@/lib/data";

interface RecruiterModeProps {
  open: boolean;
  onClose: () => void;
  onOpenProject: (slug: string) => void;
}

const masteryOrder = ["guardmem", "resident-os", "hr-agentic-rag-copilot", "lid", "willdocs-rag"];

function Heading({ n, children }: { n: number; children: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
      <span className="grid h-5 w-5 place-items-center rounded-md bg-cyber/20 text-[10px]">{n}</span>
      {children}
    </h3>
  );
}

export default function RecruiterMode({ open, onClose, onOpenProject }: RecruiterModeProps) {
  const [copied, setCopied] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!open) return;
    setElapsed(0);
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.min(60, (Date.now() - start) / 1000)), 250);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(id);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
    setCopied(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8, x: 0.85 },
      colors: ["#06b6d4", "#8b5cf6", "#10b981", "#f43f5e"],
      disableForReducedMotion: true,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const mastery = masteryOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Recruiter 60-second snapshot"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-xl flex-col border-l border-white/15 bg-glass/95 shadow-[0_0_80px_-10px_rgba(6,182,212,0.5)] backdrop-blur-2xl"
          >
            <div className="relative shrink-0 border-b border-white/10 px-5 pb-4 pt-5 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">Recruiter mode</p>
                  <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">60-second snapshot</h2>
                  <p className="text-sm text-slate-400">
                    {profile.name} · {profile.headline}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close recruiter snapshot"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Timer className="h-4 w-4 text-slate-400" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyber via-electric to-radiant transition-[width] duration-300 ease-linear"
                    style={{ width: `${(elapsed / 60) * 100}%` }}
                  />
                </div>
                <span className="w-9 text-right font-mono text-xs text-slate-400">{Math.max(0, 60 - Math.floor(elapsed))}s</span>
              </div>
            </div>

            <div className="thin-scroll flex-1 space-y-8 overflow-y-auto px-5 py-6 sm:px-7">
              <section>
                <Heading n={1}>Core competencies</Heading>
                <ul className="space-y-2">
                  {profile.competencies.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Heading n={2}>Key performance metrics</Heading>
                <div className="grid grid-cols-2 gap-3">
                  {profile.headlineMetrics.map((m, i) => (
                    <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p
                        className="text-xl font-extrabold"
                        style={{ color: Object.values(accentHex)[i % 4] }}
                      >
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{m.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Figures are taken from each repository&apos;s README; open the project for context and caveats.
                </p>
              </section>

              <section>
                <Heading n={3}>System architecture mastery</Heading>
                <div className="space-y-2">
                  {mastery.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => {
                        onClose();
                        setTimeout(() => onOpenProject(p.slug), 350);
                      }}
                      className="group w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-cyber/60 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-white">{p.title}</span>
                        <span className="font-mono text-[10px] text-slate-500 group-hover:text-cyan-300">open →</span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-400">{p.tagline}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <span key={s} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <Heading n={4}>Background</Heading>
                <p className="text-sm text-slate-300">{profile.degree}</p>
                <ul className="mt-3 space-y-2">
                  {profile.experience.map((e) => (
                    <li key={e.org} className="text-sm text-slate-400">
                      <span className="font-semibold text-slate-200">
                        {e.role}, {e.org}.
                      </span>{" "}
                      {e.detail}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pb-4">
                <Heading n={5}>Direct contact</Heading>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    onClick={copyEmail}
                    className="flex items-center justify-between gap-2 rounded-xl border border-cyber/40 bg-cyber/10 px-4 py-3 text-left text-sm font-semibold text-cyan-100 transition hover:bg-cyber/20 sm:col-span-2"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{profile.email}</span>
                    </span>
                    {copied ? <Check className="h-4 w-4 text-glow" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" /> Send email
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href="resume/"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                  >
                    <Download className="h-4 w-4" /> Resume (PDF)
                  </a>
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
