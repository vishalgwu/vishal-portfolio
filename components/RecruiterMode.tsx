"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Copy, Download, Mail, Timer, X } from "lucide-react";
import { Github, Linkedin } from "./icons";
import Avatar from "./Avatar";
import { profile, projects } from "@/lib/data";
import { emoji } from "@/lib/meta";

interface RecruiterModeProps {
  open: boolean;
  onClose: () => void;
  onOpenProject: (slug: string) => void;
}

const masteryOrder = ["guardmem", "resident-os", "hr-agentic-rag-copilot", "lid", "willdocs-rag"];
const tints = ["bg-sky/40", "bg-lime/60", "bg-pink/40", "bg-sun/40", "bg-mint/40", "bg-sky/40"];

function Heading({ n, children }: { n: number; children: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-ink">
      <span className="grid h-6 w-6 place-items-center rounded-md bg-ink text-xs text-bg">{n}</span>
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
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.8, x: 0.85 }, colors: ["#0a66c2", "#70b5f9", "#c8f169", "#ff8fc0", "#f5b942"], disableForReducedMotion: true });
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
            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
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
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-xl flex-col bg-bg shadow-2xl"
          >
            <div className="relative shrink-0">
              <div className="h-20 bg-gradient-to-br from-solid via-[#1f7ad6] to-sky">
                <div className="dots absolute inset-x-0 top-0 h-20 opacity-50" />
              </div>
              <button
                onClick={onClose}
                aria-label="Close recruiter snapshot"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="-mt-9 flex items-end gap-3 px-5">
                <Avatar size={72} ring />
                <div className="pb-1">
                  <p className="font-hand text-xl leading-none text-brand">recruiter mode ⚡</p>
                  <h2 className="font-display text-2xl font-extrabold leading-tight text-ink">60-second snapshot</h2>
                </div>
              </div>
              <p className="px-5 pt-2 text-sm text-ink2">
                {profile.name} · {profile.headline}
              </p>
              <div className="flex items-center gap-3 px-5 pb-4 pt-3">
                <Timer className="h-4 w-4 text-ink2" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-solid via-sky to-lime transition-[width] duration-300 ease-linear"
                    style={{ width: `${(elapsed / 60) * 100}%` }}
                  />
                </div>
                <span className="w-9 text-right font-mono text-xs text-ink2">{Math.max(0, 60 - Math.floor(elapsed))}s</span>
              </div>
            </div>

            <div className="thin-scroll flex-1 space-y-7 overflow-y-auto border-t border-line/10 px-5 py-6">
              <section>
                <Heading n={1}>Core competencies</Heading>
                <ul className="space-y-2">
                  {profile.competencies.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Heading n={2}>Key performance metrics</Heading>
                <div className="grid grid-cols-2 gap-3">
                  {profile.headlineMetrics.map((m, i) => (
                    <div key={m.label} className={`rounded-2xl p-3 ${tints[i]}`}>
                      <p className="font-display text-2xl font-extrabold text-black">{m.value}</p>
                      <p className="mt-0.5 text-[11px] font-semibold leading-snug text-black/70">{m.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-ink2">Figures come from each repository&apos;s README; open the video for context and caveats.</p>
              </section>

              <section>
                <Heading n={3}>System architecture mastery</Heading>
                <div className="space-y-2">
                  {mastery.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => {
                        onClose();
                        setTimeout(() => onOpenProject(p.slug), 300);
                      }}
                      className="group w-full rounded-2xl border border-line/10 bg-surface p-3 text-left transition hover:border-solid"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-bold text-ink">
                          {emoji(p)} {p.title}
                        </span>
                        <span className="font-mono text-[10px] text-ink2 group-hover:text-brand">watch →</span>
                      </div>
                      <p className="mt-0.5 text-xs text-ink2">{p.tagline}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <span key={s} className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-semibold text-ink">
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
                <p className="text-sm text-ink">{profile.degree}</p>
                <ul className="mt-3 space-y-2">
                  {profile.experience.map((e) => (
                    <li key={e.org} className="text-sm text-ink2">
                      <span className="font-bold text-ink">
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
                  <button onClick={copyEmail} className="pop-btn flex items-center justify-between gap-2 rounded-xl bg-lime px-4 py-3 text-left text-sm sm:col-span-2">
                    <span className="flex min-w-0 items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{profile.email}</span>
                    </span>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                  {[
                    { href: `mailto:${profile.email}`, label: "Send email", Icon: Mail, ext: false },
                    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin, ext: true },
                    { href: profile.github, label: "GitHub", Icon: Github, ext: true },
                    { href: "resume/", label: "Resume (PDF)", Icon: Download, ext: false },
                  ].map(({ href, label, Icon, ext }) => (
                    <a
                      key={label}
                      href={href}
                      target={ext ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-solid"
                    >
                      <Icon className="h-4 w-4 text-brand" /> {label}
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
