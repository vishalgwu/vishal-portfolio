"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShelfProps {
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  count: number;
}

/** Horizontal YouTube-style shelf with arrow buttons that appear when there is more to see. */
export default function Shelf({ title, subtitle, action, children, count }: ShelfProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setLeft(el.scrollLeft > 4);
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, count]);

  const go = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <section className="py-3">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-0.5 line-clamp-2 text-sm text-ink2">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="group/shelf relative">
        <div ref={scroller} onScroll={update} className="no-scrollbar flex snap-x snap-proximity gap-4 overflow-x-auto pb-2 pt-1">
          {children}
        </div>
        {([-1, 1] as const).map((d) => {
          const on = d === -1 ? left : right;
          return (
            <button
              key={d}
              onClick={() => go(d)}
              aria-label={d === -1 ? "Scroll left" : "Scroll right"}
              tabIndex={on ? 0 : -1}
              className={cn(
                "absolute top-[28%] hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line/15 bg-surface text-ink shadow-lg transition hover:scale-110 md:grid",
                d === -1 ? "-left-3" : "-right-3",
                on ? "opacity-0 group-hover/shelf:opacity-100 focus-visible:opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              {d === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}
