"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClapperboardIcon, FileText, Home, ListVideo, Mail, MessageSquareText, User, X, Zap } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { categories, profile } from "@/lib/data";
import type { CategoryId, TabId } from "@/lib/types";
import { cn } from "@/lib/utils";

export const NAV: { id: TabId; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "projects", label: "Projects", Icon: ClapperboardIcon },
  { id: "shorts", label: "Shorts", Icon: Zap },
  { id: "playlists", label: "Playlists", Icon: ListVideo },
  { id: "posts", label: "Posts", Icon: MessageSquareText },
  { id: "about", label: "About", Icon: User },
];

interface SidebarProps {
  tab: TabId;
  onTab: (t: TabId) => void;
  onPlaylist: (c: CategoryId) => void;
  open: boolean;
  onClose: () => void;
}

function Content({ tab, onTab, onPlaylist, after }: Omit<SidebarProps, "open" | "onClose"> & { after?: () => void }) {
  const row = "flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-ink/10";
  return (
    <nav className="thin-scroll flex h-full flex-col gap-1 overflow-y-auto p-3" aria-label="Primary">
      {NAV.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => {
            onTab(id);
            after?.();
          }}
          aria-current={tab === id ? "page" : undefined}
          className={cn(row, tab === id && "bg-ink/10 font-bold")}
        >
          <Icon className={cn("h-5 w-5", tab === id && "text-solid")} />
          {label}
        </button>
      ))}

      <hr className="my-2 border-line/10" />
      <p className="px-3 pb-1 font-hand text-xl text-ink2">playlists ✨</p>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => {
            onPlaylist(c.id);
            after?.();
          }}
          className={row}
        >
          <span className="w-5 text-center text-base">{c.emoji}</span>
          <span className="line-clamp-1 text-left">{c.title.split(",")[0].split(" & ")[0]}</span>
        </button>
      ))}

      <hr className="my-2 border-line/10" />
      <p className="px-3 pb-1 font-hand text-xl text-ink2">find me</p>
      <a href={profile.github} target="_blank" rel="noreferrer" className={row}>
        <Github className="h-5 w-5" /> GitHub
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" className={row}>
        <Linkedin className="h-5 w-5" /> LinkedIn
      </a>
      <a href={`mailto:${profile.email}`} className={row}>
        <Mail className="h-5 w-5" /> Email
      </a>
      <a href="resume/" className={row}>
        <FileText className="h-5 w-5" /> Resume
      </a>
      <p className="mt-auto px-3 pt-6 text-[11px] leading-relaxed text-ink2">
        Built with Next.js, Tailwind &amp; Framer Motion. Every number comes from a repo README.
      </p>
    </nav>
  );
}

export default function Sidebar(props: SidebarProps) {
  const { open, onClose, ...rest } = props;
  return (
    <>
      <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-60 border-r border-line/10 bg-bg lg:block">
        <Content {...rest} />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-[55] bg-black/50 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-[56] w-72 max-w-[85vw] bg-bg shadow-2xl lg:hidden"
            >
              <div className="flex h-14 items-center justify-between border-b border-line/10 px-3">
                <span className="font-display text-xl font-extrabold">
                  vishal<span className="ml-1 rounded-[5px] bg-solid px-1 text-white">in</span>
                </span>
                <button onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="h-[calc(100%-3.5rem)]">
                <Content {...rest} after={onClose} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
