"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
}

const COLORS = ["6,182,212", "139,92,246", "16,185,129", "244,63,94"];

export default function BackgroundGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.5,
        hue: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 120 && !reduce) {
          p.x += (dxm / dm) * 0.8;
          p.y += (dym / dm) * 0.8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},0.75)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.hue},${0.14 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian">
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] animate-float rounded-full bg-cyber/20 blur-[120px]" />
      <div
        className="absolute -right-32 top-1/4 h-[32rem] w-[32rem] animate-float rounded-full bg-electric/20 blur-[130px]"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] animate-float rounded-full bg-radiant/10 blur-[130px]"
        style={{ animationDelay: "-9s" }}
      />
      <div className="absolute bottom-1/4 left-0 h-80 w-80 animate-float rounded-full bg-glow/10 blur-[110px]" style={{ animationDelay: "-2s" }} />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,14,0.85)_100%)]" />
    </div>
  );
}
