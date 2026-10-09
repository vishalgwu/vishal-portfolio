"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Github, Linkedin } from "./icons";
import Magnetic from "./Magnetic";
import Logo from "./Logo";
import { profile } from "@/lib/data";

export default function Closing() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
    setCopied(true);
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.75 },
      colors: ["#06b6d4", "#8b5cf6", "#10b981", "#f43f5e"],
      disableForReducedMotion: true,
    });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-white/10 px-4 pb-8 pt-28 sm:px-6 lg:px-10">
      <div aria-hidden className="absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-electric/15 blur-[140px]" />
      <div className="relative mx-auto max-w-[1800px]">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.6rem,9vw,9rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white"
        >
          Let&apos;s build something
          <br />
          that <span className="text-gradient animate-shimmer">holds up.</span>
        </motion.h2>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.25}>
            <button
              onClick={copy}
              data-cursor="Copy"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-obsidian shadow-[0_0_50px_rgba(6,182,212,0.4)] transition hover:scale-105 sm:text-lg"
            >
              {profile.email}
              {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-white hover:border-cyber/60"
            >
              Say hello <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-white hover:border-cyber/60">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.github} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-white hover:border-white/40">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Magnetic>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <p className="font-mono text-xs text-slate-500">
              © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind and Framer Motion.
            </p>
          </div>
          <a href="#top" data-cursor="Top" className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
