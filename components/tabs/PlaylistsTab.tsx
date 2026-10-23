"use client";

import { motion } from "framer-motion";
import { ListVideo } from "lucide-react";
import Thumb from "../Thumb";
import { categories, projectsFor } from "@/lib/data";
import type { CategoryId } from "@/lib/types";

export default function PlaylistsTab({ onPlaylist }: { onPlaylist: (c: CategoryId) => void }) {
  return (
    <div className="pt-5">
      <h2 className="mb-5 font-display text-2xl font-extrabold tracking-tight">Playlists</h2>
      <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
        {categories.map((c) => {
          const items = projectsFor(c.id);
          return (
            <motion.button
              key={c.id}
              onClick={() => onPlaylist(c.id)}
              whileHover="hover"
              className="group text-left outline-none"
              aria-label={`Open playlist ${c.title}`}
            >
              <div className="relative pt-4">
                {[2, 1].map((n) => (
                  <motion.div
                    key={n}
                    variants={{ hover: { y: -n * 3 } }}
                    className="absolute inset-x-0 top-0 mx-auto rounded-xl bg-ink/15"
                    style={{ width: `${100 - n * 8}%`, height: 40, top: 16 - n * 7 }}
                  />
                ))}
                <div className="relative">
                  <Thumb project={items[0]} className="rounded-xl" />
                  <div className="absolute inset-y-0 right-0 flex w-[34%] flex-col items-center justify-center rounded-r-xl bg-black/75 text-white backdrop-blur-sm">
                    <span className="font-display text-3xl font-extrabold">{items.length}</span>
                    <ListVideo className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-[15px] font-bold leading-snug text-ink">
                {c.emoji} {c.title}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink2">{c.blurb}</p>
              <p className="mt-1 text-sm font-bold text-ink2 group-hover:text-brand">View full playlist</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
