"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value?: number;
  size?: number;
  className?: string;
  label?: string;
}

export function ProgressRing({
  value = 0,
  size = 112,
  className,
  label = "Ready",
}: ProgressRingProps) {
  const [mounted, setMounted] = useState(false);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={cn(
        "group relative inline-flex items-center justify-center transition-all duration-200 hover:drop-shadow-[0_0_8px_var(--brand-primary)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-subtle)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? offset : circumference}
          className="transition-[stroke-dashoffset] ease-out [transition-duration:800ms]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[var(--text-primary)] transition-transform duration-200 group-hover:scale-105">
          {clamped}%
        </span>
        <span className="mt-0.5 text-xs text-[var(--text-muted)]">{label}</span>
      </div>
    </div>
  );
}
