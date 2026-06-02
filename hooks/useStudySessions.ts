"use client";

import { useState } from "react";
import type { StudySession } from "@/types";

export function useStudySessions() {
  const [sessions] = useState<StudySession[]>([]);
  const [isLoading] = useState(false);

  const addSession = async (_data: Omit<StudySession, "id" | "userId" | "createdAt">) => {
    // Phase 4: Supabase insert
  };

  return {
    sessions,
    weeklyHours: 0,
    weeklyTarget: 10,
    addSession,
    isLoading,
  };
}
