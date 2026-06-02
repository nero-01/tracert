export type CertLevel = "ccna" | "ccnp" | "ccie" | "ccde";

export type TopicStatus = "not_started" | "in_progress" | "mastered";

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export interface Track {
  id: string;
  name: string;
  level: CertLevel;
  examCode: string;
  examCost: number;
  examDuration: number;
}

export interface BlueprintTopic {
  id: string;
  trackId: string;
  domain: string;
  subdomain?: string;
  title: string;
  weight: number;
}

export interface TopicWithProgress extends BlueprintTopic {
  status: TopicStatus;
  confidence: ConfidenceLevel;
}

export interface UserTopicProgress {
  topicId: string;
  userId: string;
  status: TopicStatus;
  confidence: ConfidenceLevel;
  updatedAt: string;
}

export interface StudySession {
  id: string;
  userId: string;
  trackId: string;
  topicId?: string;
  durationMinutes: number;
  notes?: string;
  createdAt: string;
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;
  freezeTokens: number;
}

export interface Subscription {
  userId: string;
  stripeCustomerId?: string;
  plan: "free" | "pro";
  status: string;
  currentPeriodEnd?: string;
}

export interface Profile {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  activeTrackId?: string;
  examDate?: string;
  weeklyHourGoal: number;
  streakNudgeHour: number;
}
