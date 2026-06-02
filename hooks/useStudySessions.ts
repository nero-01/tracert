"use client";

import { useMemo, useState } from "react";
import { MOCK_STUDY_SESSIONS } from "@/lib/mock/mockSessions";
import { MOCK_USER } from "@/lib/mock/mockUser";
import type { StudySession } from "@/types";

function sameWeek(a: Date, b: Date) {
  const oneJan = new Date(a.getFullYear(), 0, 1);
  const aWeek = Math.floor(((a.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay()) / 7);
  const bWeek = Math.floor(((b.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay()) / 7);
  return a.getFullYear() === b.getFullYear() && aWeek === bWeek;
}

export function useStudySessions() {
  const [sessions, setSessions] = useState<StudySession[]>(MOCK_STUDY_SESSIONS);

  const weeklyHours = useMemo(() => {
    const now = new Date();
    const minutes = sessions
      .filter((s) => sameWeek(new Date(s.createdAt), now))
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    return Math.round((minutes / 60) * 10) / 10;
  }, [sessions]);

  const weeklyTarget = MOCK_USER.weekly_hour_goal;

  const addSession = async (
    data: Omit<StudySession, "id" | "userId" | "createdAt"> & { createdAt?: string }
  ) => {
    const session: StudySession = {
      id: `s-${Date.now()}`,
      userId: MOCK_USER.id,
      trackId: data.trackId,
      topicId: data.topicId,
      durationMinutes: data.durationMinutes,
      notes: data.notes,
      createdAt: data.createdAt ?? new Date().toISOString(),
    };

    setSessions((prev) => [session, ...prev]);
  };

  return {
    sessions,
    weeklyHours,
    weeklyTarget,
    addSession,
    isLoading: false,
  };
}
