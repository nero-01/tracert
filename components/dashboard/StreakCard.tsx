"use client";

import { useStreak } from "@/hooks/useStreak";
import { useUser } from "@/hooks/useUser";

export function StreakCard() {
  const { currentStreak, longestStreak, freezeTokens } = useStreak();
  const { isPro } = useUser();

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-2xl font-semibold">🔥 {currentStreak} days</p>
      <p className="mt-1 text-sm text-muted-foreground">Longest streak: {longestStreak} days</p>
      {isPro && <p className="mt-1 text-sm text-muted-foreground">❄️ Freeze tokens: {freezeTokens}</p>}
      {currentStreak === 0 ? (
        <p className="mt-2 text-sm">Start your streak today</p>
      ) : (
        <p className="mt-2 text-sm">Log a session to keep your streak!</p>
      )}
    </div>
  );
}
