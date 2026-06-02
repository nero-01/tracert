"use client";

import { InsightCard } from "@/components/insights/InsightCard";
import { MOCK_INSIGHTS } from "@/lib/mock/mockInsights";

export function WeakAreaList() {
  return (
    <div className="space-y-3">
      {MOCK_INSIGHTS.map((insight) => (
        <InsightCard key={insight.topicId} insight={insight} />
      ))}
    </div>
  );
}
