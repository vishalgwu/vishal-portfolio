"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  draw?: boolean;
  className?: string;
}

/** The VF monogram: a V, and an F built from the same stroke weight. */
export default function Logo({ size = 36, draw = false, className }: LogoProps) {
  const paths = [
    "M8 9 L15 29 L22 9",
    "M27 9 L27 29",
    "M27 9 L34 9",
    "M27 18.5 L32 18.5",
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 38"
      fill="none"
      className={className}
      role="img"
      aria-label="VF monogram"
    >
      <defs>
        <linearGradient id="vf-grad" x1="0" y1="0" x2="42" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      {paths.map((d, i) =>
        draw ? (
          <motion.path
            key={d}
            d={d}
            stroke="url(#vf-grad)"
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.22, ease: "easeInOut" }}
          />
        ) : (
          <path
            key={d}
            d={d}
            stroke="url(#vf-grad)"
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      )}
    </svg>
  );
}
