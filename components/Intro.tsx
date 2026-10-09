"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

interface IntroProps {
  onDone: () => void;
}

const KEY = "vf-intro-seen";

export default function Intro({ onDone }: IntroProps) {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage unavailable: play the intro */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      onDone();
      return;
    }

    const start = performance.now();
    const total = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      document.body.style.overflow = prev;
      setShow(false);
    }, total + 350);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-obsidian"
        >
          <div className="absolute h-[28rem] w-[28rem] rounded-full bg-electric/20 blur-[120px]" />
          <Logo size={96} draw className="relative" />
          <p className="relative mt-6 font-mono text-xs uppercase tracking-[0.35em] text-slate-400">
            Vishal Fulsundar
          </p>
          <p className="relative mt-1 font-mono text-[11px] tracking-widest text-slate-600">
            AI systems, governed.
          </p>
          <p className="absolute bottom-8 right-6 font-display text-6xl font-extrabold tabular-nums text-white/90 sm:bottom-10 sm:right-10 sm:text-8xl">
            {String(count).padStart(3, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
