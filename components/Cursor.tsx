"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "[data-cursor], a, button, [role='button'], input, label";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 170, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 170, damping: 20, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      setHover(Boolean(target));
      setLabel(target?.getAttribute("data-cursor") ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hover ? 54 : 30;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[400] h-1.5 w-1.5 rounded-full bg-cyber"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[399] grid place-items-center rounded-full border text-[11px] font-semibold uppercase tracking-wider"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(255,255,255,0.95)" : hover ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0)",
          borderColor: label ? "rgba(255,255,255,0)" : hover ? "rgba(6,182,212,0.9)" : "rgba(255,255,255,0.35)",
          color: "#07090e",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label}
      </motion.div>
    </>
  );
}
