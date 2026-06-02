export const MOCK_USER = {
  id: 'mock-user-001',
  email: 'dev@tracert.app',
  display_name: 'Dev User',
  avatar_url: null,
  active_track_id: 'ccna-core',
  exam_date: '2026-10-15',
  weekly_hour_goal: 10,
  streak_nudge_hour: 20,
  created_at: new Date().toISOString(),
}

export const MOCK_SUBSCRIPTION = {
  user_id: 'mock-user-001',
  plan: 'pro' as const,
  status: 'active' as const,
  stripe_customer_id: null,
  stripe_subscription_id: null,
  current_period_end: null,
}

export const MOCK_STREAK = {
  user_id: 'mock-user-001',
  current_streak: 7,
  longest_streak: 21,
  last_activity_date: new Date().toISOString().split('T')[0],
  freeze_tokens: 2,
}
