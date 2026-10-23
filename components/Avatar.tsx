import { cn } from "@/lib/utils";

interface AvatarProps {
  size?: number;
  ring?: boolean;
  className?: string;
}

/** VF initials on the LinkedIn-blue gradient. `ring` adds the "live story" ring. */
export default function Avatar({ size = 36, ring = false, className }: AvatarProps) {
  const inner = (
    <span
      className={cn(
        "grid shrink-0 select-none place-items-center rounded-full bg-gradient-to-br from-solid via-[#2f86d9] to-sky font-display font-extrabold text-white",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      VF
    </span>
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
