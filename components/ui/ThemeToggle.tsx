"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]",
          className
        )}
      />
    );
  }

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const label =
    theme === "system"
      ? "System theme"
      : theme === "light"
        ? "Light mode"
        : "Dark mode";

  const Icon =
    theme === "system" ? Monitor : theme === "light" ? Sun : Moon;

  const iconClass =
    theme === "system"
      ? "text-[var(--text-muted)]"
      : theme === "light"
        ? "text-amber-500"
        : "text-brand-500";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={cycle}
            aria-label={label}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-200",
              "hover:scale-105 hover:border-brand-500 hover:shadow-glow-teal",
              "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]",
              className
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 transition-all duration-150",
                iconClass,
                resolvedTheme === "dark" && theme === "dark" && "drop-shadow-[0_0_6px_rgba(26,176,164,0.5)]"
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
