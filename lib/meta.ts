import { projects } from "./data";
import type { Accent, CategoryId, Project } from "./types";

export const emojiBySlug: Record<string, string> = {
  guardmem: "🛡️",
  "resident-os": "🏢",
  "hr-agentic-rag-copilot": "🧑‍💼",
  lid: "🧠",
  "job-globe": "🌍",
  "image-caption-generator": "👗",
  "willdocs-rag": "📄",
  "hgem-research": "🧪",
  "rag-hallucination-detection": "🔍",
  "transformer-percolation": "🕸️",
  "jev-review-classifier": "⭐",
  "hire-ai": "🤝",
  "travel-planner": "✈️",
  "nba-gpt-assistant": "🏀",
  "world-bank-rag": "🌐",
  "dc-crime-analysis": "🗺️",
  "nfl-big-data-bowl": "🏈",
  "loan-performance": "🏦",
  "train-accident-analysis": "🚆",
  "wine-nlp": "🍷",
  "mlops-interview-prep": "🔧",
  "genai-interview-prep": "🎓",
  "mlops-lab": "🧰",
  "sql-netflix": "🎬",
  "maryland-ui-pulse": "📊",
  "ai-engineering-roadmap-2026": "🗺️",
  "technica-ai-finance-assistant": "💸",
  "energy-price-forecasting": "⚡",
  "yawn-detection-cnn-resnet": "😴",
  "langgraph-agent-patterns": "🧩",
  "llmops-interview-prep": "🧱",
};

/** LinkedIn blue stays the hero; the other gradients are sticker-pastel companions. */
export const gradients: Record<Accent, [string, string]> = {
  cyan: ["#0a66c2", "#70b5f9"],
  violet: ["#6d3be8", "#c9a7ff"],
  emerald: ["#057642", "#7fe0b0"],
  rose: ["#d6336c", "#ffb3c7"],
};

export const emoji = (p: Project) => emojiBySlug[p.slug] ?? "✨";

export function thumbTitle(p: Project): string {
  if (p.title.length <= 26) return p.title;
  const short = p.title.split(/[:&(]/)[0].trim();
  return short.length >= 6 ? short : p.title.slice(0, 26);
}

/** YouTube shows a duration badge; we show the project's most quotable number. */
export function badge(p: Project): string {
  const m = p.metrics.find((x) => x.value.length <= 14);
  return m ? m.value : p.language;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtUpdated(iso: string): string {
  const [y, m] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function sticker(p: Project): { text: string; color: string } | null {
  if (p.demo) return { text: "Live", color: "#c8f169" };
  if (/active build|progress|not started|pending/i.test(p.status)) return { text: "WIP", color: "#f5b942" };
  if (p.categories.includes("featured")) return { text: "Flagship", color: "#ff8fc0" };
  return null;
}

export function related(p: Project, limit = 8): Project[] {
  const cats: CategoryId[] = p.categories.filter((c) => c !== "featured");
  const same = projects.filter((x) => x.slug !== p.slug && x.categories.some((c) => cats.includes(c)));
  const rest = projects.filter((x) => x.slug !== p.slug && !same.includes(x));
  return [...same, ...rest].slice(0, limit);
}

export interface Short {
  project: Project;
  value: string;
  label: string;
}

/** Vertical "Shorts": one key number per card, taken from flagship projects. */
export function getShorts(): Short[] {
  const out: Short[] = [];
  for (const p of projects.filter((x) => x.categories.includes("featured"))) {
    for (const m of p.metrics) {
      if (m.value.length <= 18) out.push({ project: p, value: m.value, label: m.label });
    }
  }
  return out;
}

export function topTech(n = 8): string[] {
  const counts = new Map<string, number>();
  for (const p of projects) for (const s of p.stack) counts.set(s, (counts.get(s) ?? 0) + 1);
  return Array.from(counts.entries())
    .filter(([name]) => name.length < 16)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name]) => name);
}

export function matches(p: Project, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    p.title.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.stack.some((s) => s.toLowerCase().includes(q))
  );
}
