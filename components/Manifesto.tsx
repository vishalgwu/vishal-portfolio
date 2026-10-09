"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "I don't ship demos. I ship systems that know what they don't know: agents that cite their evidence, memory that has to earn its place, and models that are measured before they are trusted.";

const words = TEXT.split(" ");

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span style={{ opacity, filter }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  return (
    <section ref={ref} id="manifesto" className="relative scroll-mt-16 px-4 py-28 sm:px-6 sm:py-40 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          <span className="h-px w-10 bg-cyber" /> Manifesto
        </p>
        <p className="font-display text-[clamp(1.9rem,5.2vw,5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = Math.min(1, start + 1.6 / words.length);
            return <Word key={i} word={w} range={[start, end]} progress={scrollYProgress} />;
          })}
        </p>
      </div>
    </section>
  );
}
