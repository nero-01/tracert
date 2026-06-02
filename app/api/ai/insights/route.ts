import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    insights: [
      {
        topicId: "ipc-4",
        domain: "IP Connectivity",
        title: "OSPF metric and adjacency behavior",
        reason: "High-weight domain with low confidence and limited recent practice.",
        currentConfidence: 2,
        recommendedAdditionalHours: 6,
        priority: "critical",
      },
      {
        topicId: "ap-2",
        domain: "Automation and Programmability",
        title: "REST API request structure",
        reason: "Automation fundamentals are weak and under-practiced.",
        currentConfidence: 1,
        recommendedAdditionalHours: 4,
        priority: "high",
      },
      {
        topicId: "sf-4",
        domain: "Security Fundamentals",
        title: "AAA concepts",
        reason: "Security questions may become inconsistent without targeted review.",
        currentConfidence: 2,
        recommendedAdditionalHours: 3,
        priority: "high",
      },
      {
        topicId: "ips-5",
        domain: "IP Services",
        title: "QoS fundamentals",
        reason: "Low confidence and no recent drills.",
        currentConfidence: 1,
        recommendedAdditionalHours: 2,
        priority: "medium",
      },
      {
        topicId: "na-4",
        domain: "Network Access",
        title: "Wireless architecture modes",
        reason: "Not started and likely to become an exam-day gap.",
        currentConfidence: 2,
        recommendedAdditionalHours: 3,
        priority: "medium",
      },
    ],
  });
}
