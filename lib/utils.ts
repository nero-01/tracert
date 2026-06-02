import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ConfidenceLevel, TopicStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHours(minutes: number): string {
  const hours = minutes / 60;
  if (hours < 1) return `${minutes}m`;
  const whole = Math.floor(hours);
  const remainder = Math.round((hours - whole) * 60);
  if (remainder === 0) return `${whole}h`;
  return `${whole}h ${remainder}m`;
}

export function calculateReadiness(
  topics: Array<{ status: TopicStatus; confidence: ConfidenceLevel }>
): number {
  if (topics.length === 0) return 0;

  const mastered = topics.filter((t) => t.status === "mastered").length;
  const avgConfidence =
    topics.reduce((sum, t) => sum + t.confidence, 0) / topics.length;

  const masteryScore = (mastered / topics.length) * 0.6;
  const confidenceScore = (avgConfidence / 5) * 0.4;

  return Math.round((masteryScore + confidenceScore) * 100);
}
