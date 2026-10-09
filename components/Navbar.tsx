"use client";

import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Github } from "./icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { categories, profile } from "@/lib/data";

interface NavbarProps {
  onRecruiter: () => void;
  recruiterOpen: boolean;
}

export default function Navbar({ onRecruiter, recruiterOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-obsidian/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyber to-electric text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            VF
          </span>
          <span className="hidden text-slate-100 sm:inline">
            vishal<span className="text-cyber">.</span>dev
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <li key={c.id}>
              <a
                href={`#row-${c.id}`}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                {c.emoji} {c.title.split(",")[0].split(" & ")[0]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onRecruiter}
            aria-pressed={recruiterOpen}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
              recruiterOpen
                ? "border-glow/60 bg-glow/20 text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.4)]"
                : "border-cyber/40 bg-cyber/10 text-cyan-100 hover:border-cyber hover:shadow-[0_0_24px_rgba(6,182,212,0.45)]",
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden xs:inline">Recruiter 60s</span>
            <span className="xs:hidden">HR</span>
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/30 hover:text-white sm:grid"
          >
            <Github className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMenu((m) => !m)}
            aria-label="Toggle menu"
            aria-expanded={menu}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          >
            {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-4 py-3">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#row-${c.id}`}
                    onClick={() => setMenu(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                  >
                    {c.emoji} {c.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
