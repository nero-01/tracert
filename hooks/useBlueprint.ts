"use client";

import { useMemo, useState } from "react";
import { getAllSeededBlueprintTopics } from "@/lib/blueprint/loadBlueprint";
import type { ConfidenceLevel, TopicStatus, TopicWithProgress } from "@/types";

export function useBlueprint(activeTrackId?: string) {
  const [allTopics, setAllTopics] = useState<TopicWithProgress[]>(() =>
    getAllSeededBlueprintTopics()
  );

  const trackId = activeTrackId ?? "ccna-core";

  const topics = useMemo(
    () => allTopics.filter((t) => t.trackId === trackId),
    [allTopics, trackId]
  );

  const domains = useMemo(
    () => Array.from(new Set(topics.map((t) => t.domain))),
    [topics]
  );

  const overallProgress = useMemo(() => {
    if (topics.length === 0) return 0;
    const score = topics.reduce((sum, topic) => {
      if (topic.status === "mastered") return sum + 1;
      if (topic.status === "in_progress") return sum + 0.5;
      return sum;
    }, 0);
    return Math.round((score / topics.length) * 100);
  }, [topics]);

  const progressByDomain = useMemo(() => {
    const result: Record<string, number> = {};
    for (const domain of domains) {
      const dTopics = topics.filter((t) => t.domain === domain);
      const score = dTopics.reduce((sum, topic) => {
        if (topic.status === "mastered") return sum + 1;
        if (topic.status === "in_progress") return sum + 0.5;
        return sum;
      }, 0);
      result[domain] = dTopics.length ? Math.round((score / dTopics.length) * 100) : 0;
    }
    return result;
  }, [domains, topics]);

  const updateTopic = (
    topicId: string,
    updates: { status?: TopicStatus; confidence?: ConfidenceLevel }
  ) => {
    setAllTopics((prev) =>
      prev.map((topic) => (topic.id === topicId ? { ...topic, ...updates } : topic))
    );
  };

  return {
    topics,
    domains,
    overallProgress,
    progressByDomain,
    updateTopic,
    isLoading: false,
  };
}
