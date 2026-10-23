"use client";

import { NAV } from "./Sidebar";
import type { TabId } from "@/lib/types";
import { cn } from "@/lib/utils";

const MOBILE: TabId[] = ["home", "shorts", "projects", "posts", "about"];

export default function BottomNav({ tab, onTab }: { tab: TabId; onTab: (t: TabId) => void }) {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line/10 bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      {NAV.filter((n) => MOBILE.includes(n.id)).map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTab(id)}
          aria-current={tab === id ? "page" : undefined}
          className={cn("flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold", tab === id ? "text-solid" : "text-ink2")}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  );
}
