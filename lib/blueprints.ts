import { createClient } from "@supabase/supabase-js";
import type { BlueprintTopic } from "@/types";

import ccnaCore from "@/data/blueprints/ccna-core.json";

const BLUEPRINT_FILES: Record<string, BlueprintTopic[]> = {
  "ccna-core": ccnaCore as BlueprintTopic[],
};

/**
 * One-time admin utility: batch-insert blueprint topics from local JSON via service role.
 * Not called at runtime.
 */
export async function seedBlueprintTopics(trackId: string): Promise<{
  inserted: number;
  error?: string;
}> {
  const topics = BLUEPRINT_FILES[trackId];
  if (!topics) {
    return { inserted: 0, error: `No blueprint JSON mapped for track: ${trackId}` };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return { inserted: 0, error: "Missing Supabase URL or service role key" };
  }

  const supabase = createClient(url, serviceKey);

  const rows = topics.map((topic, index) => ({
    id: topic.id,
    track_id: trackId,
    domain: topic.domain,
    domain_weight: topic.weight,
    subdomain: topic.subdomain ?? null,
    title: topic.title,
    sort_order: index,
  }));

  const { error } = await supabase.from("blueprint_topics").upsert(rows, {
    onConflict: "id",
  });

  if (error) {
    return { inserted: 0, error: error.message };
  }

  return { inserted: rows.length };
}
