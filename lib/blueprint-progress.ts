import type { ConfidenceLevel, TopicStatus } from "@/types";

export function computeTopicProgress(
  topics: Array<{ status: TopicStatus }>
): number {
  if (topics.length === 0) return 0;

  const score = topics.reduce((sum, topic) => {
    if (topic.status === "mastered") return sum + 1;
    if (topic.status === "in_progress") return sum + 0.5;
    return sum;
  }, 0);

  return Math.round((score / topics.length) * 100);
}

export function countMastered(topics: Array<{ status: TopicStatus }>): number {
  return topics.filter((t) => t.status === "mastered").length;
}

export function estimateHoursRemaining(
  topics: Array<{ status: TopicStatus }>,
  minutesPerTopic = 45
): number {
  const unmastered = topics.filter((t) => t.status !== "mastered").length;
  return Math.round((unmastered * minutesPerTopic) / 60);
}

export function topicsForReadiness(
  topics: Array<{ status: TopicStatus; confidence: ConfidenceLevel }>
) {
  return topics.map((t) => ({ status: t.status, confidence: t.confidence }));
}
