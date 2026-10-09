import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import { profile, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume | Vishal Fulsundar",
};

const flagship = ["guardmem", "resident-os", "hr-agentic-rag-copilot", "lid", "image-caption-generator", "willdocs-rag"];

export default function ResumePage() {
  const picks = flagship
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="mx-auto max-w-3xl bg-white px-6 py-10 text-[13px] leading-relaxed text-slate-800 sm:my-8 sm:rounded-xl sm:px-10 sm:shadow-2xl print:my-0 print:max-w-none print:p-0 print:shadow-none">
      <div className="no-print mb-6 flex items-center justify-between">
        <a href="../" className="text-sm font-medium text-slate-500 hover:text-slate-900">
          ← Back to portfolio
        </a>
        <PrintButton />
      </div>

      <header className="border-b border-slate-300 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{profile.name}</h1>
        <p className="text-base font-medium text-slate-600">{profile.headline}</p>
        <p className="mt-2 text-xs text-slate-600">
          {profile.email} · {profile.linkedin.replace("https://www.", "")} · {profile.github.replace("https://", "")}
        </p>
      </header>

      <section className="mt-5">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Education</h2>
        <p>
          <strong>{profile.school}</strong>: {profile.degree}
        </p>
      </section>

      <section className="mt-5">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Experience</h2>
        {profile.experience.map((e) => (
          <p key={e.org} className="mb-1.5">
            <strong>
              {e.role}, {e.org}.
            </strong>{" "}
            {e.detail}
          </p>
        ))}
      </section>

      <section className="mt-5">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Selected projects</h2>
        {picks.map((p) => (
          <div key={p.slug} className="mb-2.5 break-inside-avoid">
            <p>
              <strong>{p.title}</strong> <span className="text-slate-500">({p.repo.replace("https://", "")})</span>
            </p>
            <p className="text-slate-700">{p.tagline}. {p.metrics.slice(0, 3).map((m) => `${m.label}: ${m.value}`).join("; ")}.</p>
            <p className="text-xs text-slate-500">{p.stack.join(" · ")}</p>
          </div>
        ))}
      </section>

      <section className="mt-5">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Research</h2>
        {profile.research.map((r) => (
          <p key={r.title} className="mb-1.5">
            <strong>{r.title}.</strong> {r.detail}
          </p>
        ))}
      </section>

      <section className="mt-5">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Skills</h2>
        {profile.skills.map((g) => (
          <p key={g.group}>
            <strong>{g.group}:</strong> {g.items.join(", ")}
          </p>
        ))}
      </section>
    </main>
  );
}
