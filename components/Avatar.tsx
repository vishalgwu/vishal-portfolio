import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface AvatarProps {
  size?: number;
  ring?: boolean;
  className?: string;
}

/** Profile photo. `ring` adds the "live story" ring. */
export default function Avatar({ size = 36, ring = false, className }: AvatarProps) {
  const inner = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(size > 56 ? "vishal.jpg" : "vishal-small.jpg")}
      alt="Vishal Fulsundar"
      width={size}
      height={size}
      className={cn("shrink-0 select-none rounded-full bg-solid object-cover object-top", className)}
      style={{ width: size, height: size }}
    />
  );
  if (!ring) return inner;
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full bg-[conic-gradient(from_180deg,#0a66c2,#70b5f9,#c8f169,#ff8fc0,#f5b942,#0a66c2)] p-[3px]"
      style={{ width: size + 12, height: size + 12 }}
    >
      <span className="grid place-items-center rounded-full bg-bg p-[3px]">{inner}</span>
    </span>
  );
}
