"use client";

import { motion } from "framer-motion";
import { NAV } from "./Sidebar";
import type { TabId } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ChannelTabs({ tab, onTab }: { tab: TabId; onTab: (t: TabId) => void }) {
  return (
    <div className="sticky top-14 z-30 -mx-4 mt-5 border-b border-line/10 bg-bg/95 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
      <div role="tablist" aria-label="Channel sections" className="no-scrollbar flex gap-1 overflow-x-auto">
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={cn(
              "relative whitespace-nowrap px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
              tab === id ? "text-ink" : "text-ink2 hover:text-ink",
            )}
          >
            {label}
            {tab === id && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-solid"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
