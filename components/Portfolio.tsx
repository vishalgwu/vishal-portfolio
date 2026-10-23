"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import ChannelHeader from "./ChannelHeader";
import ChannelTabs from "./ChannelTabs";
import Watch from "./Watch";
import RecruiterMode from "./RecruiterMode";
import HomeTab from "./tabs/HomeTab";
import ProjectsTab from "./tabs/ProjectsTab";
import ShortsTab from "./tabs/ShortsTab";
import PlaylistsTab from "./tabs/PlaylistsTab";
import PostsTab from "./tabs/PostsTab";
import AboutTab from "./tabs/AboutTab";
import { projects } from "@/lib/data";
import type { CategoryId, Project, TabId } from "@/lib/types";

const TABS: TabId[] = ["home", "projects", "shorts", "playlists", "posts", "about"];

export default function Portfolio() {
  const [tab, setTab] = useState<TabId>("home");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [watching, setWatching] = useState<Project | null>(null);
  const [recruiter, setRecruiter] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);

  // theme: the inline script in layout.tsx already set the class; mirror it into state
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("vf-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  }, []);

  // deep link: #projects, #about, ...
  useEffect(() => {
    const h = window.location.hash.replace("#", "") as TabId;
    if (TABS.includes(h)) setTab(h);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const goTab = useCallback((t: TabId) => {
    setTab(t);
    try {
      window.history.replaceState(null, "", `#${t}`);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onQuery = useCallback(
    (q: string) => {
      setQuery(q);
      if (q.trim() && tab !== "projects" && tab !== "home") goTab("projects");
    },
    [tab, goTab],
  );

  const playlist = useCallback(
    (c: CategoryId) => {
      setFilter(c);
      goTab("projects");
    },
    [goTab],
  );

  const openBySlug = useCallback((slug: string) => {
    const p = projects.find((x) => x.slug === slug);
    if (p) setWatching(p);
  }, []);

  const closeWatch = useCallback(() => setWatching(null), []);
  const closeRecruiter = useCallback(() => setRecruiter(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="buffer"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-solid via-sky to-lime"
          />
        )}
      </AnimatePresence>

      <Header
        query={query}
        onQuery={onQuery}
        onMenu={() => setDrawer(true)}
        onRecruiter={() => setRecruiter(true)}
        onProfile={() => goTab("about")}
        dark={dark}
        onToggleTheme={toggleTheme}
      />
      <Sidebar tab={tab} onTab={goTab} onPlaylist={playlist} open={drawer} onClose={() => setDrawer(false)} />

      <main className="relative z-[2] px-4 pb-24 pt-[4.25rem] sm:px-6 lg:pb-12 lg:pl-[16.5rem]">
        <div className="mx-auto max-w-[1800px]">
          <ChannelHeader onTab={goTab} />
          <ChannelTabs tab={tab} onTab={goTab} />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {tab === "home" && <HomeTab query={query} onOpen={setWatching} onTab={goTab} onPlaylist={playlist} />}
              {tab === "projects" && <ProjectsTab query={query} filter={filter} onFilter={setFilter} onOpen={setWatching} />}
              {tab === "shorts" && <ShortsTab onOpen={setWatching} />}
              {tab === "playlists" && <PlaylistsTab onPlaylist={playlist} />}
              {tab === "posts" && <PostsTab onOpen={setWatching} />}
              {tab === "about" && <AboutTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav tab={tab} onTab={goTab} />
      <Watch project={watching} onClose={closeWatch} onOpen={setWatching} />
      <RecruiterMode open={recruiter} onClose={closeRecruiter} onOpenProject={openBySlug} />
    </>
  );
}
