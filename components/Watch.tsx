"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ExternalLink, Pause, Play, RotateCcw, Share2, ThumbsUp } from "lucide-react";
import { Github } from "./icons";
import Avatar from "./Avatar";
import Thumb from "./Thumb";
import { emoji, fmtUpdated, gradients, related, sticker } from "@/lib/meta";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const CHAPTERS = ["Overview", "Metrics", "Architecture", "Challenges", "Tech stack"] as const;
const CH_LEN = 6;
const TOTAL = CHAPTERS.length * CH_LEN;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

interface WatchProps {
  project: Project | null;
  onClose: () => void;
  onOpen: (p: Project) => void;
}

function Screen({ project, idx, lt }: { project: Project; idx: number; lt: number }) {
  if (idx === 0) {
    const st = sticker(project);
    return (
      <div className="flex h-full flex-col justify-center">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-5xl sm:text-6xl">{emoji(project)}</span>
          {st && (
            <span className="sticker rotate-3" style={{ background: st.color }}>
              {st.text}
            </span>
          )}
        </div>
        <h2 className="font-display text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">{project.title}</h2>
        <p className="mt-2 text-sm font-semibold text-white/80 sm:text-lg">{project.tagline}</p>
        <p className="mt-3 line-clamp-4 max-w-2xl text-xs leading-relaxed text-white/75 sm:text-base">{project.overview}</p>
      </div>
    );
  }
  if (idx === 1) {
    return (
      <div className="grid h-full grid-cols-2 content-center gap-3 sm:gap-5">
        {project.metrics.map((m, i) => {
          const on = lt > i * 0.7;
          return (
            <motion.div
              key={m.label}
              animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.85, y: on ? 0 : 14 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-2xl bg-white/10 p-3 backdrop-blur sm:p-5"
            >
              <p className="font-display text-xl font-extrabold leading-tight sm:text-4xl">{m.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">{m.label}</p>
            </motion.div>
          );
        })}
      </div>
    );
  }
  if (idx === 2) {
    const text = project.architecture;
    const shown = text.slice(0, Math.ceil(text.length * Math.min(1, lt / 4.6)));
    return (
      <pre className="thin-scroll h-full overflow-auto whitespace-pre font-mono text-[10px] leading-[1.35] text-lime sm:text-sm sm:leading-snug">
        {shown}
        <span className="inline-block h-3 w-1.5 animate-pulse bg-lime align-middle" />
      </pre>
    );
  }
  if (idx === 3) {
    const n = project.challenges.length;
    const visible = Math.min(n, Math.floor(lt / (CH_LEN / n)) + 1);
    return (
      <ul className="flex h-full flex-col justify-center gap-2 sm:gap-3">
        {project.challenges.slice(0, visible).map((c) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 rounded-xl bg-white/10 p-2.5 text-[11px] leading-snug sm:p-3.5 sm:text-base"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime" />
            {c}
          </motion.li>
        ))}
      </ul>
    );
  }
  const visible = Math.floor((lt / 4.5) * project.stack.length) + 1;
  return (
    <div className="flex h-full flex-wrap content-center gap-2 sm:gap-3">
      {project.stack.slice(0, visible).map((s, i) => (
        <motion.span
          key={s}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: ((i % 3) - 1) * 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
          className="rounded-full border-2 border-black px-3 py-1 text-xs font-extrabold text-black shadow-[2px_2px_0_#000] sm:px-4 sm:py-1.5 sm:text-base"
          style={{ background: ["#c8f169", "#70b5f9", "#ff8fc0", "#f5b942", "#57d29b"][i % 5] }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

export default function Watch({ project, onClose, onOpen }: WatchProps) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const slug = project?.slug;

  useEffect(() => {
    if (!slug) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setT(0);
    setPlaying(!reduce);
    setLiked(false);
    setExpanded(false);
    scroller.current?.scrollTo({ top: 0 });
  }, [slug]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((p) => Math.min(TOTAL, p + 0.1)), 100);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (t >= TOTAL) setPlaying(false);
  }, [t]);

  const seek = useCallback((s: number) => setT(Math.max(0, Math.min(TOTAL, s))), []);
  const toggle = useCallback(() => {
    if (t >= TOTAL) {
      setT(0);
      setPlaying(true);
    } else setPlaying((p) => !p);
  }, [t]);

  useEffect(() => {
    if (!slug) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      const interactive = e.target instanceof Element ? e.target.closest("a, button, input, select, textarea") : null;
      if (e.key === "Escape") onClose();
      else if (e.key === "k" || (e.key === " " && !interactive)) {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowRight") seek(t + 5);
      else if (e.key === "ArrowLeft") seek(t - 5);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [slug, onClose, toggle, seek, t]);

  const idx = Math.min(CHAPTERS.length - 1, Math.floor(t / CH_LEN));
  const lt = t - idx * CH_LEN;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="watch"
          ref={scroller}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`Watching ${project.title}`}
          className="thin-scroll fixed inset-0 z-[70] overflow-y-auto bg-bg"
        >
          <div className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-line/10 bg-bg/90 px-3 backdrop-blur-xl sm:px-4">
            <button onClick={onClose} aria-label="Back to channel" className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/10">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="font-display text-lg font-extrabold">
              vishal<span className="ml-1 rounded-[5px] bg-solid px-1 text-white">in</span>
            </span>
            <span className="ml-auto hidden font-mono text-xs text-ink2 sm:block">space = play/pause · ← → = seek 5s · esc = close</span>
          </div>

          <div className="mx-auto grid max-w-[1700px] gap-6 p-3 sm:p-6 xl:grid-cols-[minmax(0,1fr)_400px]">
            <div className="min-w-0">
              {/* player */}
              <div
                className="group relative h-[300px] overflow-hidden rounded-2xl text-white shadow-2xl sm:h-auto sm:aspect-video"
                style={{ background: `linear-gradient(135deg, ${gradients[project.accent][0]}, ${gradients[project.accent][1]})` }}
              >
                <div className="dots absolute inset-0 opacity-30" />
                <div className="absolute inset-0 bg-black/70" />
                <button
                  onClick={toggle}
                  aria-label={playing ? "Pause" : t >= TOTAL ? "Replay" : "Play"}
                  className="absolute inset-0 z-10 cursor-pointer outline-none"
                />
                <div className="pointer-events-none absolute inset-0 z-[5] p-4 pb-16 sm:p-8 sm:pb-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.25 }}
                      className="h-full"
                    >
                      <Screen project={project} idx={idx} lt={lt} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {!playing && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className="pointer-events-none absolute inset-0 z-[6] grid place-items-center"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black shadow-xl sm:h-20 sm:w-20">
                        {t >= TOTAL ? <RotateCcw className="h-7 w-7" /> : <Play className="h-8 w-8 translate-x-0.5 fill-black" />}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-10 sm:px-5">
                  <div className="flex items-center gap-1">
                    {CHAPTERS.map((c, i) => {
                      const fill = Math.max(0, Math.min(1, (t - i * CH_LEN) / CH_LEN));
                      return (
                        <button
                          key={c}
                          aria-label={`Jump to ${c}`}
                          onClick={(e) => {
                            const r = e.currentTarget.getBoundingClientRect();
                            const frac = r.width ? (e.clientX - r.left) / r.width : 0;
                            seek(i * CH_LEN + Math.max(0, Math.min(1, frac)) * CH_LEN);
                          }}
                          className="group/seg flex h-4 flex-1 items-center"
                        >
                          <span className="relative block h-1 w-full overflow-hidden rounded-full bg-white/30 transition-all group-hover/seg:h-2">
                            <span className="absolute inset-y-0 left-0 bg-solid [background:linear-gradient(90deg,#70b5f9,#c8f169)]" style={{ width: `${fill * 100}%` }} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs font-semibold">
                    <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15">
                      {playing ? <Pause className="h-4 w-4 fill-white" /> : t >= TOTAL ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    </button>
                    <span className="font-mono">
                      {fmt(t)} / {fmt(TOTAL)}
                    </span>
                    <span className="hidden text-white/60 sm:inline">•</span>
                    <span className="truncate">{CHAPTERS[idx]}</span>
                  </div>
                </div>
              </div>

              {/* title + actions */}
              <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{project.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3">
                  <Avatar size={40} />
                  <div>
                    <p className="text-sm font-bold leading-tight">Vishal Fulsundar</p>
                    <p className="text-xs text-ink2">@vishalgwu</p>
                  </div>
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setLiked((l) => !l)}
                    aria-pressed={liked}
                    className={cn("inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-bold transition", liked ? "bg-solid text-white" : "bg-ink/10 text-ink hover:bg-ink/15")}
                  >
                    <ThumbsUp className={cn("h-4 w-4", liked && "fill-white")} /> {liked ? "Liked" : "Like"}
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(project.repo);
                      } catch {
                        /* clipboard unavailable */
                      }
                      setShared(true);
                      setTimeout(() => setShared(false), 1800);
                    }}
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-ink/10 px-4 text-sm font-bold text-ink hover:bg-ink/15"
                  >
                    {shared ? <Check className="h-4 w-4 text-mint" /> : <Share2 className="h-4 w-4" />} {shared ? "Link copied" : "Share"}
                  </button>
                  <a href={project.repo} target="_blank" rel="noreferrer" className="pop-btn inline-flex h-9 items-center gap-2 rounded-full bg-lime px-4 text-sm">
                    <Github className="h-4 w-4" /> View repo
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="pop-btn inline-flex h-9 items-center gap-2 rounded-full bg-sky px-4 text-sm">
                      <ExternalLink className="h-4 w-4" /> Live demo
                    </a>
                  )}
                  {project.secondary && (
                    <a href={project.secondary.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full bg-ink/10 px-4 text-sm font-bold text-ink hover:bg-ink/15">
                      <ExternalLink className="h-4 w-4" /> {project.secondary.label}
                    </a>
                  )}
                </div>
              </div>

              {/* description box with chapters */}
              <div className="mt-4 rounded-2xl bg-surface2 p-4">
                <p className="text-sm font-bold">
                  ★ {project.stars} · {project.language} · Updated {fmtUpdated(project.updated)} · {project.status}
                </p>
                <p className="mt-1 text-sm font-semibold text-brand">
                  {project.stack.slice(0, 6).map((s) => `#${s.toLowerCase().replace(/[^a-z0-9]/g, "")}`).join(" ")}
                </p>
                <p className={cn("mt-2 text-sm leading-relaxed text-ink/90", !expanded && "line-clamp-3")}>{project.overview}</p>
                <div className={cn("mt-3 space-y-1", !expanded && "hidden")}>
                  <p className="font-hand text-xl text-ink2">chapters</p>
                  {CHAPTERS.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => {
                        seek(i * CH_LEN);
                        setPlaying(true);
                        scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="flex items-center gap-3 rounded-lg px-1 py-1 text-sm hover:bg-ink/10"
                    >
                      <span className="rounded bg-solid/15 px-1.5 py-0.5 font-mono text-xs font-bold text-brand">{fmt(i * CH_LEN)}</span>
                      {c}
                    </button>
                  ))}
                </div>
                <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-sm font-bold text-ink hover:underline">
                  {expanded ? "Show less" : "...more"}
                </button>
              </div>

              {/* challenges as comments */}
              <section className="mt-6" aria-label="Engineering challenges">
                <h2 className="mb-4 font-display text-xl font-extrabold">
                  {project.challenges.length} engineering {project.challenges.length === 1 ? "challenge" : "challenges"} solved
                </h2>
                <ul className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <li key={c} className="flex gap-3">
                      <Avatar size={36} />
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold">
                          @vishalgwu {i === 0 && <span className="sticker ml-1 bg-lime align-middle !text-[9px]">Pinned</span>}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-ink/90">{c}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* up next */}
            <aside aria-label="Up next" className="min-w-0">
              <h2 className="mb-3 font-display text-lg font-extrabold">Up next</h2>
              <ul className="space-y-3">
                {related(project, 9).map((p) => (
                  <li key={p.slug}>
                    <button onClick={() => onOpen(p)} className="group flex w-full gap-3 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-solid">
                      <div className="w-[168px] shrink-0 transition group-hover:-translate-y-0.5">
                        <Thumb project={p} small />
                      </div>
                      <div className="min-w-0 py-0.5">
                        <p className="line-clamp-2 text-sm font-bold leading-snug">{p.title}</p>
                        <p className="mt-0.5 text-xs text-ink2">Vishal Fulsundar</p>
                        <p className="text-xs text-ink2">
                          ★ {p.stars} · {fmtUpdated(p.updated)}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
