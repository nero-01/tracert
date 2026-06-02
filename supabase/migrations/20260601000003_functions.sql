-- Database functions and triggers

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );

  INSERT INTO public.user_streaks (user_id)
  VALUES (NEW.id);

  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.calculate_readiness(
  p_user_id uuid,
  p_track_id text
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total integer;
  v_mastered integer;
  v_avg_confidence numeric;
BEGIN
  SELECT
    COUNT(bt.id),
    COUNT(*) FILTER (WHERE utp.status = 'mastered'),
    COALESCE(AVG(COALESCE(utp.confidence, 1)), 1)
  INTO v_total, v_mastered, v_avg_confidence
  FROM blueprint_topics bt
  LEFT JOIN user_topic_progress utp
    ON utp.topic_id = bt.id AND utp.user_id = p_user_id
  WHERE bt.track_id = p_track_id;

  IF v_total = 0 THEN
    RETURN 0;
  END IF;

  RETURN LEAST(
    100,
    GREATEST(
      0,
      ROUND(
        (v_mastered::numeric / v_total) * 0.6 * 100 +
        (v_avg_confidence / 5) * 0.4 * 100
      )
    )::integer
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.check_and_update_streak(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_last date;
  v_freeze integer;
  v_current integer;
  v_longest integer;
  v_gap integer;
BEGIN
  SELECT last_activity_date, freeze_tokens, current_streak, longest_streak
  INTO v_last, v_freeze, v_current, v_longest
  FROM user_streaks
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND OR v_last IS NULL THEN
    RETURN;
  END IF;

  v_gap := CURRENT_DATE - v_last;

  IF v_gap = 1 THEN
    UPDATE user_streaks
    SET
      current_streak = v_current + 1,
      longest_streak = GREATEST(v_longest, v_current + 1),
      updated_at = now()
    WHERE user_id = p_user_id;
  ELSIF v_gap > 1 AND v_freeze > 0 THEN
    UPDATE user_streaks
    SET freeze_tokens = v_freeze - 1, updated_at = now()
    WHERE user_id = p_user_id;
  ELSIF v_gap > 1 THEN
    UPDATE user_streaks
    SET current_streak = 0, updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_leaderboard(
  p_cert_level text,
  p_window text
)
RETURNS TABLE (
  rank bigint,
  display_name text,
  total_hours numeric,
  topics_mastered bigint,
  track_id text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_since date;
BEGIN
  v_since := CASE p_window
    WHEN 'week' THEN CURRENT_DATE - 7
    WHEN 'month' THEN CURRENT_DATE - 30
    ELSE NULL
  END;

  RETURN QUERY
  WITH session_stats AS (
    SELECT
      ss.user_id,
      ss.track_id,
      COALESCE(SUM(ss.duration_minutes), 0)::numeric / 60 AS hours
    FROM study_sessions ss
    JOIN tracks t ON t.id = ss.track_id
    WHERE (p_cert_level = 'all' OR t.level = p_cert_level)
      AND (v_since IS NULL OR ss.session_date >= v_since)
    GROUP BY ss.user_id, ss.track_id
  ),
  topic_stats AS (
    SELECT
      utp.user_id,
      bt.track_id,
      COUNT(*) FILTER (WHERE utp.status = 'mastered') AS mastered
    FROM user_topic_progress utp
    JOIN blueprint_topics bt ON bt.id = utp.topic_id
    JOIN tracks t ON t.id = bt.track_id
    WHERE (p_cert_level = 'all' OR t.level = p_cert_level)
      AND (v_since IS NULL OR utp.updated_at::date >= v_since)
    GROUP BY utp.user_id, bt.track_id
  ),
  combined AS (
    SELECT
      p.id AS user_id,
      COALESCE(s.track_id, ts.track_id) AS track_id,
      COALESCE(s.hours, 0) AS total_hours,
      COALESCE(ts.mastered, 0) AS topics_mastered,
      CASE
        WHEN p.display_name IS NULL OR p.display_name = '' THEN 'Anonymous'
        ELSE split_part(p.display_name, ' ', 1) || ' ' ||
          upper(left(split_part(p.display_name, ' ', 2), 1)) || '.'
      END AS anon_name
    FROM profiles p
    LEFT JOIN session_stats s ON s.user_id = p.id
    LEFT JOIN topic_stats ts ON ts.user_id = p.id AND ts.track_id = s.track_id
    WHERE COALESCE(s.hours, 0) > 0 OR COALESCE(ts.mastered, 0) > 0
  )
  SELECT
    ROW_NUMBER() OVER (ORDER BY c.total_hours DESC, c.topics_mastered DESC) AS rank,
    c.anon_name AS display_name,
    c.total_hours,
    c.topics_mastered,
    c.track_id
  FROM combined c
  ORDER BY c.total_hours DESC, c.topics_mastered DESC
  LIMIT 50;
END;
$$;

GRANT EXECUTE ON FUNCTION public.calculate_readiness(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_and_update_streak(uuid) TO service_role;
