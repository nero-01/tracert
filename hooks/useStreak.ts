"use client";

import { useState } from "react";

export function useStreak() {
  const [isLoading] = useState(false);

  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: undefined as string | undefined,
    freezeTokens: 0,
    isLoading,
  };
}
