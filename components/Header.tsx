"use client";

import { useState } from "react";
import { Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import Avatar from "./Avatar";

interface HeaderProps {
  query: string;
  onQuery: (q: string) => void;
  onMenu: () => void;
  onRecruiter: () => void;
  onProfile: () => void;
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ query, onQuery, onMenu, onRecruiter, onProfile, dark, onToggleTheme }: HeaderProps) {
  const [mobileSearch, setMobileSearch] = useState(false);

  const search = (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-[640px] items-center"
    >
      <div className="flex h-10 flex-1 items-center rounded-l-full border border-line/20 bg-surface pl-4 pr-2 focus-within:border-solid">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search projects, tech, tools..."
          aria-label="Search projects by title or technology"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink2 focus:outline-none"
        />
        {query && (
          <button type="button" onClick={() => onQuery("")} aria-label="Clear search" className="grid h-7 w-7 place-items-center rounded-full text-ink2 hover:bg-ink/10">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        aria-label="Search"
        className="grid h-10 w-14 place-items-center rounded-r-full border border-l-0 border-line/20 bg-surface2 text-ink transition hover:bg-ink/10"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/10 bg-bg/90 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-3">
          <button onClick={onMenu} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/10 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <a href="#home" className="flex items-center gap-1 font-display text-xl font-extrabold tracking-tight text-ink" aria-label="vishal-in, home">
            vishal
            <span className="grid h-[22px] w-[26px] place-items-center rounded-[5px] bg-solid text-[15px] leading-none text-white">in</span>
            <span className="ml-1 hidden rotate-[-4deg] font-hand text-xl font-bold text-brand sm:inline">studio</span>
          </a>
        </div>

        <div className="hidden flex-1 justify-center md:flex">{search}</div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={() => setMobileSearch((s) => !s)} aria-label="Toggle search" className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/10 md:hidden">
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleTheme}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/10"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={onRecruiter}
            className="pop-btn inline-flex h-10 items-center gap-2 rounded-full bg-lime px-3 text-sm sm:px-4"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden xs:inline">Recruiter 60s</span>
            <span className="xs:hidden">HR</span>
          </button>
          <button onClick={onProfile} aria-label="About Vishal" className="ml-1 rounded-full">
            <Avatar size={34} ring />
          </button>
        </div>
      </div>
      {mobileSearch && <div className="flex justify-center border-t border-line/10 px-3 py-2 md:hidden">{search}</div>}
    </header>
  );
}
