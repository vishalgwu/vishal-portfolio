# Vishal Fulsundar: Cinematic Portfolio

A Netflix-style, dark "Cyber-Obsidian" portfolio for AI systems and data science projects, built with Next.js 14 (App Router), Tailwind CSS, Framer Motion and Lucide icons.

**Live:** https://vishalgwu.github.io/vishal-portfolio/

## What's inside

- **Brand identity**: VF monogram that draws itself in an intro splash, Bricolage Grotesque display type, one gradient signature (cyan, violet, rose) on obsidian.
- **Kinetic hero**: masked headline reveal, rotating word, cursor-following spotlight, magnetic buttons and count-up proof stats.
- **Tech marquee**: two counter-scrolling rows built from the stacks in the dataset.
- **Manifesto**: scroll-linked text that lights up word by word.
- **Four principles**, each backed by a real metric and linked to its project.
- **Recruiter 60-Second Snapshot**: drawer with competencies, metrics, architecture mastery, background and one-click contact.
- **The Catalog**: five Netflix-style rows of poster cards (3D tilt, spotlight, glow), a project modal with architecture diagram, and search.
- **Details**: custom cursor with context labels, scroll progress bar, confetti on copy-email, printable `/resume`.

## Data

All 25 projects live in [`data/projects.json`](data/projects.json), audited from the public repositories of [@vishalgwu](https://github.com/vishalgwu). Every metric is copied from the project's own README. Figures a README labels as targets or provisional (for example GuardMem's AUROC) are labelled that way here too. To add a project, append an object with the same shape and list the row ids it belongs to in `categories`.

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
