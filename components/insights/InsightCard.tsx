import { Badge } from "@/components/ui/badge";

export interface InsightItem {
  topicId: string;
  domain: string;
  title: string;
  reason: string;
  currentConfidence: number;
  recommendedAdditionalHours: number;
  priority: "critical" | "high" | "medium";
}

export function InsightCard({ insight }: { insight: InsightItem }) {
  const badgeText =
    insight.priority === "critical"
      ? "🔴 Critical"
      : insight.priority === "high"
      ? "🟠 High"
      : "🟡 Medium";

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Badge>{badgeText}</Badge>
        <span className="text-xs text-muted-foreground">{insight.domain}</span>
      </div>
      <p className="text-sm font-semibold">{insight.title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{insight.reason}</p>
      <p className="mt-2 text-sm">Recommended: +{insight.recommendedAdditionalHours} hours</p>
      <p className="text-xs text-muted-foreground">Confidence: {insight.currentConfidence}/5</p>
    </div>
  );
}
