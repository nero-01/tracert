import { Badge } from "@/components/ui/badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

export interface InsightItem {
  topicId: string;
  domain: string;
  title: string;
  reason: string;
  currentConfidence: number;
  recommendedAdditionalHours: number;
  priority: "critical" | "high" | "medium";
}

const priorityStyles = {
  critical: "border-l-rose-500",
  high: "border-l-amber-500",
  medium: "border-l-slate-400",
};

export function InsightCard({ insight }: { insight: InsightItem }) {
  const badgeText =
    insight.priority === "critical"
      ? "Critical"
      : insight.priority === "high"
        ? "High"
        : "Medium";

  const badgeVariant =
    insight.priority === "critical"
      ? "destructive"
      : insight.priority === "high"
        ? "default"
        : "secondary";

  return (
    <SurfaceCard
      hoverable
      className={cn("border-l-4", priorityStyles[insight.priority])}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <Badge variant={badgeVariant as "default" | "secondary" | "destructive"}>
          {badgeText}
        </Badge>
        <span className="rounded-pill bg-[var(--bg-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
          {insight.domain}
        </span>
      </div>
      <p className="text-sm font-semibold text-[var(--text-primary)]">{insight.title}</p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{insight.reason}</p>
      <p className="mt-2 text-sm text-[var(--text-primary)]">
        Recommended: +{insight.recommendedAdditionalHours} hours
      </p>
      <p className="text-xs text-[var(--text-muted)]">
        Confidence: {insight.currentConfidence}/5
      </p>
    </SurfaceCard>
  );
}
