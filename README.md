# Vishal Fulsundar: Cinematic Portfolio

A Netflix-style, dark "Cyber-Obsidian" portfolio for AI systems and data science projects, built with Next.js 14 (App Router), Tailwind CSS, Framer Motion and Lucide icons.

**Live:** https://vishalgwu.github.io/vishal-portfolio/

## What's inside

- **Hero** with ambient neon aura, particle canvas background and a terminal typewriter of the real tech stack.
- **Recruiter 60-Second Snapshot**: a drawer with core competencies, headline metrics, architecture mastery, background and one-click contact (with a countdown bar).
- **Five Netflix-style rows**: Featured Flagship Systems, Agentic AI / RAG / LLM Infrastructure, Big Data & Analytics, Deep Learning / CV / NLP, Production Microservices & Tools.
- **Poster cards** with 3D tilt, `scale-105` hover, neon glow and a fading description preview.
- **Project modal** with a shared-layout transition: overview, metrics, ASCII architecture diagram, engineering challenges, tech pills and repo / demo links.
- **Search** across titles and tech stack, and a printable **/resume** page (Save as PDF).

## Data

All 24 projects live in [`data/projects.json`](data/projects.json), audited from the public repositories of [@vishalgwu](https://github.com/vishalgwu). Every metric is copied from the project's own README. Figures a README labels as targets or provisional (for example GuardMem's AUROC) are labelled that way here too. To add a project, append an object with the same shape and list the row ids it belongs to in `categories`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to ./out
```

The site is a static export. When served from a sub-path (GitHub Pages), set `NEXT_PUBLIC_BASE_PATH=/vishal-portfolio` before building; the included workflow does this on every push to `main`.

## Layout

```
app/               layout, home page, /resume
components/        Hero, Navbar, ProjectRow, ProjectCard, ProjectModal, RecruiterMode, BackgroundGlow
data/projects.json audited project dataset
lib/               types, data helpers, profile, cn()
```
