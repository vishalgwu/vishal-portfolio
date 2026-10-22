"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { Github } from "./icons";
import type { Project } from "@/lib/types";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-2 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </section>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-white p-6 shadow-pop sm:rounded-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold text-ink">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-mute">{project.tagline}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-mute hover:bg-chip hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand-soft"
          >
            <Github className="h-4 w-4" /> Repository
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              <ExternalLink className="h-4 w-4" /> Live site
            </a>
          )}
          {project.secondary && (
            <a
              href={project.secondary.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-mute hover:bg-chip"
            >
              {project.secondary.label}
            </a>
          )}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink">{project.overview}</p>

        {project.metrics.length > 0 && (
          <Block title="Results and scope">
            <dl className="grid gap-2 sm:grid-cols-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-chip px-3 py-2">
                  <dt className="text-xs text-mute">{m.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}

        {project.challenges.length > 0 && (
          <Block title="Engineering notes">
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
              {project.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Block>
        )}

        {project.architecture && (
          <Block title="Architecture">
            <pre className="overflow-x-auto rounded-lg bg-chip p-3 font-mono text-xs leading-relaxed text-ink">
              {project.architecture}
            </pre>
          </Block>
        )}

        <Block title="Skills">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full bg-chip px-3 py-1 text-xs font-medium text-ink">
                {s}
              </span>
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}
