"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe2, MessageSquare, Repeat2, Send, ThumbsUp } from "lucide-react";
import Avatar from "../Avatar";
import Thumb from "../Thumb";
import { profile, projects } from "@/lib/data";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostsTabProps {
  onOpen: (p: Project) => void;
}

interface Post {
  id: string;
  kind: string;
  kindColor: string;
  text: string;
  tags: string[];
  project?: Project;
  link: string;
}

const flagship = ["hr-agentic-rag-copilot", "lid", "willdocs-rag", "image-caption-generator", "resident-os"];

function buildPosts(): Post[] {
  const posts: Post[] = [
    {
      id: "edu",
      kind: "Education",
      kindColor: "#70b5f9",
      text: `🎓 ${profile.degree} at ${profile.school}. Building production ML systems, multi-agent AI pipelines and LLM research on the way out the door.`,
      tags: ["datascience", "machinelearning", "genai"],
      link: profile.linkedin,
    },
    {
      id: "xampus",
      kind: "Experience",
      kindColor: "#c8f169",
      text: `📊 ${profile.experience[0].role} @ ${profile.experience[0].org}. ${profile.experience[0].detail}`,
      tags: ["recommendersystems", "abtesting", "tableau"],
      link: profile.linkedin,
    },
    {
      id: "stoffer",
      kind: "Experience",
      kindColor: "#f5b942",
      text: `🚀 ${profile.experience[1].role} @ ${profile.experience[1].org}. ${profile.experience[1].detail}`,
      tags: ["startups", "founder", "saas"],
      link: profile.linkedin,
    },
    {
      id: "research",
      kind: "Research",
      kindColor: "#ff8fc0",
      text: `🧪 ${profile.research[0].title}. ${profile.research[0].detail}`,
      tags: ["llm", "interpretability", "rag"],
      link: profile.github,
    },
    {
      id: "jetir",
      kind: "Publication",
      kindColor: "#ff8fc0",
      text: `📄 ${profile.research[1].title}. ${profile.research[1].detail}`,
      tags: ["nlp", "transformers", "summarization"],
      link: profile.github,
    },
  ];
  for (const slug of flagship) {
    const p = projects.find((x) => x.slug === slug);
    if (!p) continue;
    posts.push({
      id: `proj-${slug}`,
      kind: "Project drop",
      kindColor: "#70b5f9",
      text: `${p.tagline}. ${p.metrics.slice(0, 2).map((m) => `${m.label}: ${m.value}`).join(" · ")}. Full breakdown below 👇`,
      tags: p.stack.slice(0, 3).map((s) => s.toLowerCase().replace(/[^a-z0-9]/g, "")),
      project: p,
      link: p.repo,
    });
  }
  return posts;
}

function PostCard({ post, onOpen }: { post: Post; onOpen: (p: Project) => void }) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);

  const act = "flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-bold text-ink2 transition hover:bg-ink/10";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden"
    >
      <div className="flex items-start gap-3 p-4 pb-2">
        <Avatar size={48} />
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-tight text-ink">{profile.name}</p>
          <p className="line-clamp-1 text-xs text-ink2">{profile.headline}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink2">
            <Globe2 className="h-3 w-3" /> Public
          </p>
        </div>
        <span className="sticker shrink-0 rotate-3" style={{ background: post.kindColor }}>
          {post.kind}
        </span>
      </div>

      <p className="px-4 pb-2 text-[15px] leading-relaxed text-ink">{post.text}</p>
      <p className="px-4 pb-3 text-sm font-semibold text-brand">{post.tags.map((t) => `#${t}`).join("  ")}</p>

      {post.project && (
        <button onClick={() => onOpen(post.project!)} className="block w-full border-y border-line/10 bg-surface2 text-left transition hover:bg-ink/5" aria-label={`Watch ${post.project.title}`}>
          <Thumb project={post.project} className="rounded-none" />
          <div className="px-4 py-3">
            <p className="font-bold text-ink">{post.project.title}</p>
            <p className="text-xs text-ink2">github.com/vishalgwu · Watch the walkthrough</p>
          </div>
        </button>
      )}

      <div className="flex px-2 py-1">
        <button
          onClick={() => {
            setLiked((l) => !l);
            setBurst((b) => b + 1);
          }}
          aria-pressed={liked}
          className={cn(act, "relative", liked && "text-brand")}
        >
          <ThumbsUp className={cn("h-5 w-5", liked && "fill-brand")} /> Like
          <AnimatePresence>
            {liked && (
              <motion.span
                key={burst}
                initial={{ opacity: 1, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, y: -42, scale: 1.5 }}
                transition={{ duration: 0.8 }}
                className="pointer-events-none absolute -top-1 text-xl"
              >
                👏
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Re: ${post.kind}`)}`} className={act}>
          <MessageSquare className="h-5 w-5" /> Comment
        </a>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(post.link);
            } catch {
              /* clipboard unavailable */
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className={act}
        >
          {copied ? <Check className="h-5 w-5 text-mint" /> : <Repeat2 className="h-5 w-5" />} {copied ? "Link copied" : "Repost"}
        </button>
        <a href={`mailto:${profile.email}`} className={act}>
          <Send className="h-5 w-5" /> Send
        </a>
      </div>
    </motion.article>
  );
}

export default function PostsTab({ onOpen }: PostsTabProps) {
  const posts = buildPosts();
  return (
    <div className="mx-auto max-w-2xl space-y-4 pt-5">
      <div className="flex items-baseline gap-3">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">Posts</h2>
        <p className="font-hand text-2xl text-brand">the feed, but it&apos;s all signal</p>
      </div>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onOpen={onOpen} />
      ))}
    </div>
  );
}
