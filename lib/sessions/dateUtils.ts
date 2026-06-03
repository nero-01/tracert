import {
  differenceInDays,
  format,
  isToday,
  isYesterday,
  parseISO,
  startOfWeek,
} from "date-fns";

export function getSessionDate(session: { sessionDate?: string; createdAt: string }): string {
  return session.sessionDate ?? session.createdAt.slice(0, 10);
}

export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function isSameISOWeek(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() && getISOWeekNumber(a) === getISOWeekNumber(b)
  );
}

export function formatSessionDateLabel(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEE d MMM");
}

export function getLast8WeeksBuckets(
  sessions: Array<{ durationMinutes: number; sessionDate?: string; createdAt: string }>,
  weeklyTarget: number
) {
  const now = new Date();
  const buckets: { weekLabel: string; actual: number; target: number }[] = [];

  for (let i = 7; i >= 0; i--) {
    const weekStart = startOfWeek(new Date(now), { weekStartsOn: 1 });
    weekStart.setDate(weekStart.getDate() - i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const label = `W${getISOWeekNumber(weekStart)}`;
    const minutes = sessions
      .filter((s) => {
        const d = parseISO(getSessionDate(s));
        return d >= weekStart && d <= weekEnd;
      })
      .reduce((sum, s) => sum + s.durationMinutes, 0);

    buckets.push({
      weekLabel: label,
      actual: Math.round((minutes / 60) * 10) / 10,
      target: weeklyTarget,
    });
  }

  return buckets;
}

export function daysBetweenExam(examDateIso: string): number {
  return Math.max(0, differenceInDays(parseISO(examDateIso), new Date()));
}
