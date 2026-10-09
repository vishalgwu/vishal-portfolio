import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const stackCounts = new Map<string, number>();
for (const p of projects) for (const s of p.stack) stackCounts.set(s, (stackCounts.get(s) ?? 0) + 1);

const ranked = Array.from(stackCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .map(([name]) => name)
  .filter((n) => n.length < 18)
  .slice(0, 32);

const rowA = ranked.filter((_, i) => i % 2 === 0);
const rowB = ranked.filter((_, i) => i % 2 === 1);

function Row({ items, reverse, outline }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn("flex shrink-0 animate-marquee items-center gap-8 pr-8", reverse && "[animation-direction:reverse]")}
        aria-hidden={reverse || undefined}
      >
        {loop.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-8">
            <span
              className={cn(
                "whitespace-nowrap font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl lg:text-7xl",
                outline ? "text-outline" : "text-white",
              )}
            >
              {t}
            </span>
            <span className="text-2xl text-electric">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technology I build with" className="space-y-3 overflow-hidden border-y border-white/10 py-8">
      <Row items={rowA} />
      <Row items={rowB} reverse outline />
    </section>
  );
}
