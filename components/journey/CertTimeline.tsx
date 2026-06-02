import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

const levels = [
  { name: "CCNA", state: "active" as const },
  { name: "CCNP", state: "upcoming" as const },
  { name: "CCIE", state: "upcoming" as const },
  { name: "CCDE", state: "upcoming" as const },
];

export function CertTimeline() {
  return (
    <SurfaceCard hoverable>
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Certification timeline
      </p>
      <div className="mt-4 space-y-4">
        {levels.map((level, idx) => (
          <div key={level.name} className="flex items-center gap-3">
            <div
              className={cn(
                "h-3 w-3 shrink-0 rounded-full transition-transform",
                level.state === "active"
                  ? "bg-brand-500 shadow-glow-teal ring-4 ring-brand-500/20"
                  : "bg-[var(--bg-subtle)]"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                level.state === "active"
                  ? "text-brand-500"
                  : "text-[var(--text-muted)]"
              )}
            >
              {level.name}
            </span>
            {idx < levels.length - 1 && (
              <div className="h-px flex-1 bg-[var(--border)]" />
            )}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}
