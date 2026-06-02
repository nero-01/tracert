"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Subscription } from "@/types";
import type { User } from "@supabase/supabase-js";

function mapProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    email: row.email as string,
    displayName: (row.display_name as string) ?? undefined,
    avatarUrl: (row.avatar_url as string) ?? undefined,
    activeTrackId: (row.active_track_id as string) ?? undefined,
    examDate: (row.exam_date as string) ?? undefined,
    weeklyHourGoal: (row.weekly_hour_goal as number) ?? 10,
    streakNudgeHour: (row.streak_nudge_hour as number) ?? 20,
  };
}

function mapSubscription(row: Record<string, unknown>): Subscription {
  return {
    userId: row.user_id as string,
    stripeCustomerId: (row.stripe_customer_id as string) ?? undefined,
    plan: (row.plan as "free" | "pro") ?? "free",
    status: (row.status as string) ?? "active",
    currentPeriodEnd: (row.current_period_end as string) ?? undefined,
  };
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfileAndSubscription(userId: string) {
      const [profileResult, subscriptionResult] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("subscriptions").select("*").eq("user_id", userId).single(),
      ]);

      if (profileResult.data) {
        setProfile(mapProfile(profileResult.data));
      } else {
        setProfile(null);
      }

      if (subscriptionResult.data) {
        setSubscription(mapSubscription(subscriptionResult.data));
      } else {
        setSubscription(null);
      }
    }

    async function loadUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      setUser(authUser);

      if (authUser) {
        await loadProfileAndSubscription(authUser.id);
      } else {
        setProfile(null);
        setSubscription(null);
      }

      setIsLoading(false);
    }

    loadUser();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const authUser = session?.user ?? null;
      setUser(authUser);

      if (authUser) {
        await loadProfileAndSubscription(authUser.id);
      } else {
        setProfile(null);
        setSubscription(null);
      }

      setIsLoading(false);
    });

    return () => authSubscription.unsubscribe();
  }, []);

  const isPro =
    subscription?.plan === "pro" && subscription?.status === "active";

  return { user, profile, subscription, isLoading, isPro };
}
