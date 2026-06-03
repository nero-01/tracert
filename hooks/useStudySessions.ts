"use client";

import { useMemo } from "react";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { useStudySessionsStore } from "@/lib/stores/studySessionsStore";
import {
  getLast8WeeksBuckets,
  getSessionDate,
  isSameISOWeek,
} from "@/lib/sessions/dateUtils";

export function useStudySessions() {
  const sessions = useStudySessionsStore((s) => s.sessions);
  const addSession = useStudySessionsStore((s) => s.addSession);
  const deleteSession = useStudySessionsStore((s) => s.deleteSession);
  const restoreSession = useStudySessionsStore((s) => s.restoreSession);

  const weeklyTarget = MOCK_USER.weekly_hour_goal;

  const weeklyHours = useMemo(() => {
    const now = new Date();
    const minutes = sessions
      .filter((s) => isSameISOWeek(new Date(getSessionDate(s)), now))
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    return Math.round((minutes / 60) * 10) / 10;
  }, [sessions]);

  const monthlyHours = useMemo(() => {
    const now = new Date();
    const minutes = sessions
      .filter((s) => new Date(getSessionDate(s)).getMonth() === now.getMonth())
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    return Math.round((minutes / 60) * 10) / 10;
  }, [sessions]);

  const totalHours = useMemo(() => {
    const minutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    return Math.round((minutes / 60) * 10) / 10;
  }, [sessions]);

  const last8Weeks = useMemo(
    () => getLast8WeeksBuckets(sessions, weeklyTarget),
    [sessions, weeklyTarget]
  );

  return {
    sessions,
    weeklyHours,
    weeklyTarget,
    monthlyHours,
    totalHours,
    last8Weeks,
    addSession,
    deleteSession,
    restoreSession,
    isLoading: false,
  };
}
