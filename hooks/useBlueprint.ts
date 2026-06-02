"use client";

import { useState } from "react";
import type { BlueprintTopic, TopicStatus, ConfidenceLevel } from "@/types";

const MOCK_TOPICS: BlueprintTopic[] = [];

export function useBlueprint() {
  const [topics] = useState(MOCK_TOPICS);
  const [isLoading] = useState(false);

  const domains = Array.from(new Set(topics.map((t) => t.domain)));

  const updateTopic = async (
    _topicId: string,
    _updates: { status?: TopicStatus; confidence?: ConfidenceLevel }
  ) => {
    // Phase 3: Supabase upsert
  };

  return {
    topics,
    domains,
    overallProgress: 0,
    progressByDomain: {} as Record<string, number>,
    updateTopic,
    isLoading,
  };
}
