"use client";

import { InsightCard, type InsightItem } from "@/components/insights/InsightCard";

const MOCK_INSIGHTS: InsightItem[] = [
  {
    topicId: "ipc-4",
    domain: "IP Connectivity",
    title: "OSPF metric and adjacency behavior",
    reason: "High exam weight domain with low confidence and sparse recent practice sessions.",
    currentConfidence: 2,
    recommendedAdditionalHours: 6,
    priority: "critical",
  },
  {
    topicId: "ap-2",
    domain: "Automation and Programmability",
    title: "REST API request structure",
    reason: "Automation questions are under-practiced and likely to cause avoidable misses.",
    currentConfidence: 1,
    recommendedAdditionalHours: 4,
    priority: "high",
  },
  {
    topicId: "sf-4",
    domain: "Security Fundamentals",
    title: "AAA concepts and workflow",
    reason: "Security fundamentals appear inconsistently in your sessions despite moderate exam weight.",
    currentConfidence: 2,
    recommendedAdditionalHours: 3,
    priority: "high",
  },
  {
    topicId: "ips-5",
    domain: "IP Services",
    title: "QoS fundamentals",
    reason: "Low confidence with no recent dedicated drills suggests weak recall under pressure.",
    currentConfidence: 1,
    recommendedAdditionalHours: 2,
    priority: "medium",
  },
  {
    topicId: "na-4",
    domain: "Network Access",
    title: "Wireless architecture modes",
    reason: "Not-started status and minimal practice indicate this domain can become a scoring gap.",
    currentConfidence: 2,
    recommendedAdditionalHours: 3,
    priority: "medium",
  },
];

export function WeakAreaList() {
  return (
    <div className="space-y-3">
      {MOCK_INSIGHTS.map((insight) => (
        <InsightCard key={insight.topicId} insight={insight} />
      ))}
    </div>
  );
}
