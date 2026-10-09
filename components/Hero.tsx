"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Sparkles, Terminal } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeroProps {
  onRecruiter: () => void;
  recruiterOpen: boolean;
}

function useTypewriter(lines: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
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
      next = () =>
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }
    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, lines]);

  return text;
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition";

export default function Hero({ onRecruiter, recruiterOpen }: HeroProps) {
  const typed = useTypewriter(profile.typewriter);

  return (
    <section id="top" className="relative px-4 pb-14 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pb-20">
      <div className="mx-auto grid max-w-[1800px] items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
            </span>
            MS Data Science · George Washington University
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white xs:text-5xl sm:text-6xl xl:text-7xl 3xl:text-8xl"
          >
            {profile.name}
            <span className="mt-2 block text-gradient animate-shimmer text-[0.55em] font-bold leading-tight">
              AI Systems &amp; Data Science Engineer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={onRecruiter}
              aria-pressed={recruiterOpen}
              className={cn(
                buttonBase,
                "bg-gradient-to-r from-cyber to-electric text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(139,92,246,0.55)]",
              )}
            >
              <Sparkles className="h-4 w-4" />
              Recruiter 60-Second Snapshot
            </button>
            <a
              href="resume/"
              className={cn(buttonBase, "glass text-slate-100 hover:border-cyber/60 hover:bg-white/10")}
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonBase, "glass text-slate-100 hover:border-white/40 hover:bg-white/10")}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonBase, "glass text-slate-100 hover:border-cyber/60 hover:bg-white/10")}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className={cn(buttonBase, "glass text-slate-100 hover:border-radiant/60 hover:bg-white/10")}
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyber/30 via-electric/20 to-radiant/20 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-radiant" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-glow" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-400">
                <Terminal className="h-3.5 w-3.5" /> vishal@portfolio ~ stack
              </span>
            </div>
            <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p className="text-slate-500">
                <span className="text-glow">$</span> whoami
              </p>
              <p className="text-slate-200">{profile.name} · {profile.school}</p>
              <p className="pt-2 text-slate-500">
                <span className="text-glow">$</span> stack --live
              </p>
              <p className="min-h-[1.6em] text-cyan-300" aria-live="off">
                {typed}
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyber" />
              </p>
              <div className="flex flex-wrap gap-2 pt-3">
                {["agentic-rag", "llm-infra", "research", "mlops", "data-science"].map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-[11px]",
                      [
                        "border-cyber/40 text-cyan-300",
                        "border-electric/40 text-violet-300",
                        "border-glow/40 text-emerald-300",
                        "border-radiant/40 text-rose-300",
                        "border-white/20 text-slate-300",
                      ][i],
                    )}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
