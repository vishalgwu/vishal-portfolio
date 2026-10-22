export type Accent = "cyan" | "violet" | "emerald" | "rose";

export type CategoryId =
  | "featured"
  | "agentic"
  | "bigdata"
  | "deeplearning"
  | "microservices";

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  categories: CategoryId[];
  accent: Accent;
  repo: string;
  demo: string | null;
  language: string;
  stars: number;
  updated: string;
  status: string;
  stack: string[];
  metrics: Metric[];
  challenges: string[];
  architecture: string;
  thumb?: string;
  secondary?: { label: string; url: string };
}

export interface Category {
  id: CategoryId;
  title: string;
  blurb: string;
}
