"use client";

import { useMemo } from "react";
import {
  addDays,
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfWeek,
  subDays,
} from "date-fns";
import { useStudySessions } from "@/hooks/useStudySessions";
import { MOCK_USER } from "@/lib/mock/mockUser";
import { getSessionDate } from "@/lib/sessions/dateUtils";

function dateKey(d: Date) {
  return format(d, "yyyy-MM-dd");
}

function computeStreaks(sessionDates: Set<string>) {
  const sorted = Array.from(sessionDates).sort();
  if (sorted.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = parseISO(sorted[i - 1]);
    const curr = parseISO(sorted[i]);
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      run += 1;
      longest = Math.max(longest, run);
    } else if (diff > 1) {
      run = 1;
    }
  }

  let current = 0;
  const today = new Date();
  let cursor = sessionDates.has(dateKey(today)) ? today : subDays(today, 1);

  while (sessionDates.has(dateKey(cursor))) {
    current += 1;
    cursor = subDays(cursor, 1);
  }

  return { current, longest };
}

export function useStreak() {
  const { sessions } = useStudySessions();

  return useMemo(() => {
    const minutesByDate = new Map<string, number>();
    const sessionDates = new Set<string>();

    sessions.forEach((s) => {
      const key = getSessionDate(s);
      sessionDates.add(key);
      minutesByDate.set(key, (minutesByDate.get(key) ?? 0) + s.durationMinutes);
    });

    const { current, longest } = computeStreaks(sessionDates);
    const sortedDates = Array.from(sessionDates).sort();
    const lastActivityDate = sortedDates[sortedDates.length - 1];
    const todayKey = dateKey(new Date());
    const studiedToday = sessionDates.has(todayKey);

    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const thisWeekDays = Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(weekStart, i);
      const key = dateKey(date);
      return {
        date: key,
        label: format(date, "EEEEE").slice(0, 1),
        hasSession: sessionDates.has(key),
        minutes: minutesByDate.get(key) ?? 0,
        isToday: isSameDay(date, new Date()),
        isFuture: isAfter(date, new Date()),
      };
    });

    const gridStart = startOfWeek(subDays(new Date(), 83), { weekStartsOn: 1 });
    const calendarData = Array.from({ length: 84 }).map((_, i) => {
      const date = addDays(gridStart, i);
      const key = dateKey(date);
      return { date: key, minutes: minutesByDate.get(key) ?? 0 };
    });

    return {
      currentStreak: current,
      longestStreak: longest,
      lastActivityDate,
      freezeTokens: 2,
      studiedToday,
      thisWeekDays,
      calendarData,
      isLoading: false,
    };
  }, [sessions]);
}
