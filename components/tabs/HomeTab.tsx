"use client";

import { ExternalLink, ListVideo, Play, Zap } from "lucide-react";
import { Github } from "../icons";
import Shelf from "../Shelf";
import ShortCard from "../ShortCard";
import Thumb from "../Thumb";
import VideoCard from "../VideoCard";
import { categories, projects, projectsFor } from "@/lib/data";
import { fmtUpdated, getShorts, matches } from "@/lib/meta";
import type { CategoryId, Project, TabId } from "@/lib/types";
import { useHoverPreview } from "../useHoverPreview";

interface HomeTabProps {
  query: string;
  onOpen: (p: Project) => void;
  onTab: (t: TabId) => void;
  onPlaylist: (c: CategoryId) => void;
}

export default function HomeTab({ query, onOpen, onTab, onPlaylist }: HomeTabProps) {
  const trailer = projects.find((p) => p.slug === "guardmem") ?? projects[0];
  const preview = useHoverPreview(true);
  const shorts = getShorts();
  const searching = query.trim().length > 0;

  return (
    <div className="space-y-4 pt-5">
      {!searching && (
        <section aria-label="Channel trailer" className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <button onClick={() => onOpen(trailer)} className="group block rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-solid" aria-label={`Watch ${trailer.title}`}>
            <div className="relative">
              <Thumb project={trailer} preview={preview} big className="rounded-2xl transition group-hover:shadow-[0_16px_40px_-10px_rgba(10,102,194,0.6)]" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black shadow-xl transition group-hover:scale-110">
                  <Play className="h-7 w-7 translate-x-0.5 fill-black" />
                </span>
              </span>
            </div>
          </button>
          <div className="flex flex-col justify-center">
            <p className="font-hand text-2xl text-brand">start here ↓ the channel trailer</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">{trailer.title}</h2>
            <p className="mt-1 text-sm text-ink2">
              {trailer.status} · Updated {fmtUpdated(trailer.updated)}
            </p>
            <p className="mt-3 line-clamp-5 text-[15px] leading-relaxed text-ink/90">{trailer.overview}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => onOpen(trailer)} className="pop-btn inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5">
                <Play className="h-4 w-4 fill-black" /> Watch now
              </button>
              <a href={trailer.repo} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink/10 px-5 text-sm font-bold text-ink hover:bg-ink/15">
                <Github className="h-4 w-4" /> Source
              </a>
              {trailer.demo && (
                <a href={trailer.demo} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink/10 px-5 text-sm font-bold text-ink hover:bg-ink/15">
                  <ExternalLink className="h-4 w-4" /> Live
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {!searching && (
        <Shelf
          title={
            <span className="inline-flex items-center gap-2">
              <Zap className="h-6 w-6 fill-sun text-sun" /> Shorts <span className="font-hand text-2xl font-bold text-brand">(the numbers, fast)</span>
            </span>
          }
          count={shorts.length}
          action={
            <button onClick={() => onTab("shorts")} className="shrink-0 rounded-full px-3 py-1.5 text-sm font-bold text-brand hover:bg-solid/10">
              See all
            </button>
          }
        >
          {shorts.slice(0, 12).map((s, i) => (
            <ShortCard key={`${s.project.slug}-${i}`} short={s} onOpen={onOpen} />
          ))}
        </Shelf>
      )}

      {categories.map((c) => {
        const items = projectsFor(c.id).filter((p) => matches(p, query));
        if (items.length === 0) return null;
        return (
          <Shelf
            key={c.id}
            count={items.length}
            title={
              <span>
                <span className="mr-2">{c.emoji}</span>
                {c.title}
              </span>
            }
            subtitle={c.blurb}
            action={
              <button
                onClick={() => onOpen(items[0])}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink/10 px-3.5 py-2 text-sm font-bold text-ink hover:bg-ink/15"
              >
                <ListVideo className="h-4 w-4" /> Play all
              </button>
            }
          >
            {items.map((p) => (
              <VideoCard key={p.slug} project={p} onOpen={onOpen} className="w-[270px] shrink-0 snap-start sm:w-[300px] 3xl:w-[340px]" />
            ))}
            {c.id !== "featured" && (
              <button
                onClick={() => onPlaylist(c.id)}
                className="grid w-[150px] shrink-0 place-items-center self-start rounded-xl border-2 border-dashed border-line/20 text-center text-sm font-bold text-ink2 hover:border-solid hover:text-brand aspect-video"
              >
                View full playlist →
              </button>
            )}
          </Shelf>
        );
      })}

      {searching && categories.every((c) => projectsFor(c.id).filter((p) => matches(p, query)).length === 0) && (
        <p className="py-20 text-center text-ink2">No projects match “{query}”. Try LangGraph, PyTorch, Qdrant or Docker.</p>
      )}
    </div>
  );
}
