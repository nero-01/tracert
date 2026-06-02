-- Row Level Security policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insight_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprint_topics ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- user_topic_progress
CREATE POLICY "Users can read own topic progress"
  ON user_topic_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topic progress"
  ON user_topic_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topic progress"
  ON user_topic_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own topic progress"
  ON user_topic_progress FOR DELETE
  USING (auth.uid() = user_id);

-- study_sessions
CREATE POLICY "Users can read own study sessions"
  ON study_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study sessions"
  ON study_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study sessions"
  ON study_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own study sessions"
  ON study_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- user_streaks
CREATE POLICY "Users can read own streak"
  ON user_streaks FOR SELECT
  USING (auth.uid() = user_id);

-- subscriptions
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ai_insights
CREATE POLICY "Users can read own ai insights"
  ON ai_insights FOR SELECT
  USING (auth.uid() = user_id);

-- ai_insight_usage
CREATE POLICY "Users can read own ai insight usage"
  ON ai_insight_usage FOR SELECT
  USING (auth.uid() = user_id);

-- reference tables: public read
CREATE POLICY "Anyone can read tracks"
  ON tracks FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read blueprint topics"
  ON blueprint_topics FOR SELECT
  USING (true);
