"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { Github, Linkedin } from "./icons";
import Magnetic from "./Magnetic";
import CountUp from "./CountUp";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeroProps {
  ready: boolean;
  onRecruiter: () => void;
  recruiterOpen: boolean;
}

const WORDS = ["trust.", "audit.", "measure.", "ship."];
const EASE = [0.16, 1, 0.3, 1] as const;

function useTypewriter(lines: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(lines[0]);
      return;
    }
    const current = lines[index % lines.length];
    let delay = deleting ? 22 : 55;
    let next: () => void;
    if (!deleting && text === current) {
      delay = 1500;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 250;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % lines.length);
      };
    } else {
      next = () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }
    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, lines]);

  return text;
}

function Line({ children, i, ready, className }: { children: React.ReactNode; i: number; ready: boolean; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={cn("block", className)}
        initial={{ y: "115%" }}
        animate={ready ? { y: 0 } : { y: "115%" }}
        transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition";

const stats = [
  { to: 26, suffix: "", decimals: 0, label: "projects across 5 domains" },
  { to: 230, suffix: "", decimals: 0, label: "offline tests, HR copilot" },
  { to: 0.71, suffix: "", decimals: 2, label: "AUROC, pre-emission detection" },
  { to: 84, suffix: "%", decimals: 0, label: "recall@5, hybrid RAG" },
];

export default function Hero({ ready, onRecruiter, recruiterOpen }: HeroProps) {
  const typed = useTypewriter(profile.typewriter);
  const [word, setWord] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(139,92,246,0.22), rgba(6,182,212,0.08) 40%, transparent 70%)`;

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={(e) => {
        const r = sectionRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-10 pt-28 sm:px-6 lg:px-10"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spot }} />

      <div className="relative mx-auto w-full max-w-[1800px]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-slate-400"
        >
          <span className="h-px w-10 bg-gradient-to-r from-cyber to-electric" />
          Vishal Fulsundar · AI Systems &amp; Data Science Engineer
        </motion.p>

        <h1 className="font-display text-[clamp(2.9rem,10.5vw,10.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-white">
          <Line i={0} ready={ready}>AI systems</Line>
          <Line i={1} ready={ready}>you can</Line>
          <Line i={2} ready={ready}>
            <span className="relative inline-block min-w-[3ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[word]}
                  initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-60%", opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="text-gradient animate-shimmer inline-block"
                >
                  {WORDS[word]}
                </motion.span>
              </AnimatePresence>
            </span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="mt-8 grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl">
              Agents that cite their evidence. Memory that earns its place. Models measured before they are trusted.
              MS Data Science at George Washington University.
            </p>
            <p className="mt-4 flex min-h-[1.5em] items-center gap-2 font-mono text-sm text-cyan-300">
              <span className="text-glow">$</span> {typed}
              <span className="inline-block h-4 w-2 animate-blink bg-cyber" />
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Magnetic>
              <button
                onClick={onRecruiter}
                aria-pressed={recruiterOpen}
                data-cursor="Go"
                className={cn(btn, "bg-white text-obsidian shadow-[0_0_40px_rgba(139,92,246,0.45)] hover:scale-105")}
              >
                <Sparkles className="h-4 w-4" />
                Recruiter 60-Second Snapshot
              </button>
            </Magnetic>
            <Magnetic>
              <a href="resume/" className={cn(btn, "glass text-slate-100 hover:border-cyber/60")}>
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.github} target="_blank" rel="noreferrer" className={cn(btn, "glass text-slate-100 hover:border-white/40")}>
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={cn(btn, "glass text-slate-100 hover:border-cyber/60")}>
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${profile.email}`} className={cn(btn, "glass text-slate-100 hover:border-radiant/60")}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-obsidian/80 p-4 backdrop-blur sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp
                  to={s.to}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
                />
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">{s.label}</p>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <a
        href="#manifesto"
        aria-label="Scroll to manifesto"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-white lg:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
