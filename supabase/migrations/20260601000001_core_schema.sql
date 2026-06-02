-- Core schema: reference tables and user data tables

CREATE TABLE tracks (
  id text PRIMARY KEY,
  name text NOT NULL,
  level text NOT NULL CHECK (level IN ('ccna', 'ccnp', 'ccie', 'ccde')),
  exam_code text,
  exam_cost_usd integer,
  exam_duration_minutes integer
);

CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  display_name text,
  avatar_url text,
  active_track_id text REFERENCES tracks(id),
  exam_date date,
  weekly_hour_goal integer DEFAULT 10,
  streak_nudge_hour integer DEFAULT 20,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE blueprint_topics (
  id text PRIMARY KEY,
  track_id text REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  domain text NOT NULL,
  domain_weight integer,
  subdomain text,
  title text NOT NULL,
  sort_order integer DEFAULT 0
);

CREATE TABLE user_topic_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  topic_id text REFERENCES blueprint_topics(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'mastered')),
  confidence integer DEFAULT 1 CHECK (confidence BETWEEN 1 AND 5),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, topic_id)
);

CREATE TABLE study_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  track_id text REFERENCES tracks(id) NOT NULL,
  topic_id text REFERENCES blueprint_topics(id),
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  notes text,
  session_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE user_streaks (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_activity_date date,
  freeze_tokens integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE ai_insights (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  track_id text REFERENCES tracks(id) NOT NULL,
  insight_json jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE ai_insight_usage (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  month_key text NOT NULL,
  count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, month_key)
);

CREATE INDEX idx_blueprint_topics_track_id ON blueprint_topics(track_id);
CREATE INDEX idx_user_topic_progress_user_id ON user_topic_progress(user_id);
CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_session_date ON study_sessions(session_date);
CREATE INDEX idx_ai_insights_user_id ON ai_insights(user_id);
