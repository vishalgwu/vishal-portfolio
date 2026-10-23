"use client";

import { useState, type ReactNode } from "react";
import confetti from "canvas-confetti";
import { Briefcase, Check, Copy, FileText, FlaskConical, GraduationCap, Mail, Sparkles, Wrench } from "lucide-react";
import { Github, Linkedin } from "../icons";
import { profile } from "@/lib/data";

function Section({ icon, title, children, className }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`card p-5 ${className ?? ""}`}>
      <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-ink">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-solid/10 text-brand">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

const chipColors = ["bg-sky/30", "bg-lime/50", "bg-pink/30", "bg-sun/30", "bg-mint/30"];

export default function AboutTab() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
    setCopied(true);
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 }, colors: ["#0a66c2", "#70b5f9", "#c8f169", "#ff8fc0", "#f5b942"], disableForReducedMotion: true });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-4 pt-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <Section icon={<Sparkles className="h-4 w-4" />} title="About">
          <p className="leading-relaxed text-ink/90">{profile.tagline}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {profile.competencies.map((c) => (
              <li key={c} className="flex gap-2 rounded-xl bg-surface2 p-3 text-sm leading-snug text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {c}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Briefcase className="h-4 w-4" />} title="Experience">
          <ol className="space-y-5">
            {profile.experience.map((e, i) => (
              <li key={e.org} className="flex gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-xl font-extrabold text-black ${i ? "bg-sun" : "bg-lime"}`}>
                  {e.org[0]}
                </span>
                <div>
                  <p className="font-bold text-ink">{e.role}</p>
                  <p className="text-sm text-ink2">{e.org}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/90">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section icon={<FlaskConical className="h-4 w-4" />} title="Research & publications">
          <ul className="space-y-4">
            {profile.research.map((r) => (
              <li key={r.title}>
                <p className="font-bold text-ink">{r.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/90">{r.detail}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="space-y-4">
        <Section icon={<Mail className="h-4 w-4" />} title="Contact info">
          <button
            onClick={copy}
            className="pop-btn flex w-full items-center justify-between gap-2 rounded-xl bg-lime px-4 py-3 text-left text-sm"
          >
            <span className="truncate">{profile.email}</span>
            {copied ? <Check className="h-4 w-4 shrink-0" /> : <Copy className="h-4 w-4 shrink-0" />}
          </button>
          <div className="mt-3 space-y-1">
            {[
              { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin, ext: true },
              { href: profile.github, label: "GitHub", Icon: Github, ext: true },
              { href: "resume/", label: "Resume (print to PDF)", Icon: FileText, ext: false },
            ].map(({ href, label, Icon, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-ink/10"
              >
                <Icon className="h-5 w-5 text-brand" /> {label}
              </a>
            ))}
          </div>
        </Section>

        <Section icon={<GraduationCap className="h-4 w-4" />} title="Education">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky font-display text-xl font-extrabold text-black">G</span>
            <div>
              <p className="font-bold text-ink">{profile.school}</p>
              <p className="text-sm text-ink2">{profile.degree}</p>
            </div>
          </div>
        </Section>

        <Section icon={<Wrench className="h-4 w-4" />} title="Skills">
          <div className="space-y-4">
            {profile.skills.map((g) => (
              <div key={g.group}>
                <p className="mb-2 font-hand text-xl text-ink2">{g.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s, i) => (
                    <span key={s} className={`rounded-full px-2.5 py-1 text-xs font-bold text-black ${chipColors[(i + g.group.length) % chipColors.length]} dark:text-ink`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
