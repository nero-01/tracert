import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-[var(--bg-elevated)] via-[var(--bg-subtle)] to-[var(--bg-elevated)] bg-[length:200%_100%] animate-shimmer",
        className
      )}
    />
  );
}
