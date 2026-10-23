"use client";

import { useEffect, useState } from "react";

/** Cycles 0,1,2... on an interval while `on` is true; returns null when off (or reduced motion). */
export function useHoverPreview(on: boolean, ms = 1800): number | null {
  const [i, setI] = useState<number | null>(null);

  useEffect(() => {
    if (!on || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(null);
      return;
    }
    const start = setTimeout(() => setI(0), 2000);
    const id = setInterval(() => setI((v) => (v === null ? null : v + 1)), ms);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [on, ms]);

  return i;
}
