"use client";

import { MOCK_STREAK } from "@/lib/mock/mockUser";

export function useStreak() {
  return {
    currentStreak: MOCK_STREAK.current_streak,
    longestStreak: MOCK_STREAK.longest_streak,
    lastActivityDate: MOCK_STREAK.last_activity_date,
    freezeTokens: MOCK_STREAK.freeze_tokens,
    isLoading: false,
  };
}
