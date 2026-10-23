"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Bell, BellRing, Check, MessageCircle, Plus } from "lucide-react";
import Avatar from "./Avatar";
import { profile, projects } from "@/lib/data";
import type { TabId } from "@/lib/types";

const stickers = [
  { text: "🧠 LLM infra", color: "#c8f169", x: "6%", y: "58%", r: -8 },
  { text: "📈 0.71 AUROC", color: "#ff8fc0", x: "34%", y: "14%", r: 5 },
  { text: "🛡️ fail closed", color: "#f5b942", x: "60%", y: "62%", r: -4 },
  { text: "🎓 GWU '26", color: "#ffffff", x: "78%", y: "16%", r: 7 },
];

export default function ChannelHeader({ onTab }: { onTab: (t: TabId) => void }) {
  const banner = useRef<HTMLDivElement>(null);
  const [following, setFollowing] = useState(false);

  const follow = () => {
    const next = !following;
    setFollowing(next);
    if (next) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.35, x: 0.3 },
        colors: ["#0a66c2", "#70b5f9", "#c8f169", "#ff8fc0", "#f5b942"],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <section aria-label="Profile">
      <div
        ref={banner}
        className="relative h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-solid via-[#1f7ad6] to-sky sm:h-48 lg:h-60"
      >
        <div className="dots absolute inset-0 opacity-50" />
        <div className="absolute -left-10 top-0 h-56 w-56 animate-float rounded-full bg-lime/50 blur-3xl" />
        <div className="absolute right-10 top-10 h-64 w-64 animate-float rounded-full bg-pink/50 blur-3xl [animation-delay:-4s]" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 animate-float rounded-full bg-sun/40 blur-3xl [animation-delay:-8s]" />

        <p
          aria-hidden
          className="text-outline pointer-events-none absolute -bottom-3 left-4 font-display text-[clamp(2.4rem,9vw,8.5rem)] font-extrabold uppercase leading-none tracking-tight opacity-90"
        >
          AI systems, governed.
        </p>

        {stickers.map((s, i) => (
          <motion.span
            key={s.text}
            drag
            dragConstraints={banner}
            dragElastic={0.2}
            whileDrag={{ scale: 1.15, rotate: 0, cursor: "grabbing" }}
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, scale: 0.4, rotate: s.r - 20 }}
            animate={{ opacity: 1, scale: 1, rotate: s.r }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 260, damping: 14 }}
            style={{ left: s.x, top: s.y, background: s.color }}
            className="sticker absolute hidden cursor-grab select-none text-xs sm:inline-flex sm:text-sm"
          >
            {s.text}
          </motion.span>
        ))}
        <span className="absolute right-3 top-3 hidden font-hand text-xl text-white/90 sm:block">drag the stickers ↗</span>
      </div>

      <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-end">
        <div className="-mt-12 shrink-0 sm:-mt-16 sm:ml-4">
          <div className="hidden sm:block">
            <Avatar size={128} ring />
          </div>
          <div className="ml-3 sm:hidden">
            <Avatar size={84} ring />
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
            <span className="sticker -rotate-3 bg-sky">AI · Data</span>
          </div>
          <p className="mt-1 text-base font-semibold text-ink sm:text-lg">{profile.headline}</p>
          <p className="text-sm text-ink2">
            @vishalgwu · {projects.length} projects · 47 public repos · {profile.school}
          </p>
          <p className="mt-1.5 max-w-3xl text-sm text-ink2">
            {profile.tagline.slice(0, 118)}…{" "}
            <button onClick={() => onTab("about")} className="font-bold text-brand hover:underline">
              more
            </button>
          </p>
        </div>

        <div className="relative flex flex-wrap items-center gap-2 pb-1">
          <span aria-hidden className="pointer-events-none absolute -top-9 right-2 hidden rotate-[8deg] font-hand text-2xl text-brand xl:block">
            say hi 👋
          </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="pop-btn inline-flex h-10 items-center gap-1.5 rounded-full bg-solid px-5 !text-white"
          >
            <Plus className="h-4 w-4" /> Connect
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border-2 border-solid px-5 text-sm font-bold text-brand transition hover:bg-solid/10"
          >
            <MessageCircle className="h-4 w-4" /> Message
          </a>
          <button
            onClick={follow}
            aria-pressed={following}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-bold transition ${
              following ? "bg-ink/10 text-ink" : "bg-ink text-bg hover:opacity-90"
            }`}
          >
            {following ? <BellRing className="h-4 w-4 animate-wiggle" /> : <Bell className="h-4 w-4" />}
            {following ? "Following" : "Follow"}
            {following && <Check className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
