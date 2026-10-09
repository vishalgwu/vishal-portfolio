"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PrinciplesProps {
  onOpenProject: (slug: string) => void;
}

const principles = [
  {
    n: "01",
    title: "Evidence over vibes",
    body: "Every answer resolves to a cited document, a cited URL, or an explicit refusal.",
    proof: "21 / 21",
    proofLabel: "routing + grading decisions correct",
    slug: "hr-agentic-rag-copilot",
    color: "#10b981",
  },
  {
    n: "02",
    title: "Fail closed, never quiet",
    body: "No verbatim source span, no memory write. Degradation only ever routes toward a human.",
    proof: "No span, no write",
    proofLabel: "design rule, backed by a hash-chained audit log",
    slug: "guardmem",
    color: "#8b5cf6",
  },
  {
    n: "03",
    title: "Measure before you trust",
    body: "Hallucinations flagged a token before they are emitted, compared fairly against 8 reproduced baselines.",
    proof: "0.71 AUROC",
    proofLabel: "at 15-20% overhead on TruthfulQA",
    slug: "lid",
    color: "#f43f5e",
  },
  {
    n: "04",
    title: "Ship it, then make it faster",
    body: "From a notebook to a served system: hybrid retrieval, reranking, caching, streaming.",
    proof: "71 → 84%",
    proofLabel: "recall@5 with hybrid search + rerank",
    slug: "willdocs-rag",
    color: "#06b6d4",
  },
];

export default function Principles({ onOpenProject }: PrinciplesProps) {
  return (
    <section id="principles" className="scroll-mt-16 px-4 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1800px]">
        <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          <span className="h-px w-10 bg-cyber" /> What the brand stands for
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((p, i) => (
            <motion.button
              key={p.n}
              onClick={() => onOpenProject(p.slug)}
              data-cursor="Proof"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              style={{ ["--c" as string]: p.color }}
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-charcoal p-6 text-left transition-[border-color,box-shadow] hover:border-[var(--c)] hover:shadow-[0_0_50px_-10px_var(--c)]"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-70"
                style={{ background: p.color }}
              />
              <div className="relative flex items-start justify-between">
                <span className="font-display text-6xl font-extrabold leading-none text-white/10 transition-colors group-hover:text-[var(--c)]">
                  {p.n}
                </span>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <div className="relative">
                <h3 className="font-display text-2xl font-bold leading-tight text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.body}</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-display text-3xl font-extrabold" style={{ color: p.color }}>
                    {p.proof}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-slate-500">{p.proofLabel}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
