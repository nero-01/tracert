import ccnaCore from "@/data/blueprints/ccna-core.json";
import ccnpEnterprise from "@/data/blueprints/ccnp-enterprise.json";
import ccieEnterprise from "@/data/blueprints/ccie-enterprise.json";
import type { BlueprintTopic, ConfidenceLevel, TopicStatus, TopicWithProgress } from "@/types";

export type BlueprintComponent = "written" | "lab" | "both";

export interface RawBlueprintTopic {
  id: string;
  trackId: string;
  domain: string;
  domainWeight?: number;
  weight?: number;
  subdomain?: string;
  title: string;
  sortOrder?: number;
  component?: BlueprintComponent;
}

const TRACK_FILES: Record<string, RawBlueprintTopic[]> = {
  "ccna-core": ccnaCore as RawBlueprintTopic[],
  "ccnp-enterprise": ccnpEnterprise as RawBlueprintTopic[],
  "ccie-enterprise": ccieEnterprise as RawBlueprintTopic[],
};

const CCNA_PROGRESS: Partial<
  Record<string, { status: TopicStatus; confidence: ConfidenceLevel }>
> = {
  "ccna-core-nf-01": { status: "mastered", confidence: 4 },
  "ccna-core-nf-02": { status: "in_progress", confidence: 3 },
  "ccna-core-nf-06": { status: "mastered", confidence: 5 },
  "ccna-core-na-01": { status: "mastered", confidence: 4 },
  "ccna-core-na-02": { status: "in_progress", confidence: 3 },
  "ccna-core-ipc-02": { status: "mastered", confidence: 4 },
  "ccna-core-ipc-03": { status: "in_progress", confidence: 3 },
  "ccna-core-ap-08": { status: "mastered", confidence: 4 },
};

function normalizeRaw(raw: RawBlueprintTopic): BlueprintTopic & { component?: BlueprintComponent } {
  const domainWeight = raw.domainWeight ?? raw.weight ?? 0;
  return {
    id: raw.id,
    trackId: raw.trackId,
    domain: raw.domain,
    subdomain: raw.subdomain,
    title: raw.title,
    weight: domainWeight,
    component: raw.component,
  };
}

export function getBlueprintByTrack(trackId: string): TopicWithProgress[] {
  const rows = TRACK_FILES[trackId] ?? TRACK_FILES["ccna-core"];
  return rows
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((raw) => {
      const base = normalizeRaw(raw);
      const progress = CCNA_PROGRESS[raw.id] ?? {
        status: "not_started" as TopicStatus,
        confidence: 1 as ConfidenceLevel,
      };
      return { ...base, ...progress };
    });
}

export function getAllSeededBlueprintTopics(): TopicWithProgress[] {
  return (["ccna-core", "ccnp-enterprise", "ccie-enterprise"] as const).flatMap(
    getBlueprintByTrack
  );
}

export function getBlueprintTopicsForTrack(trackId: string): BlueprintTopic[] {
  return getBlueprintByTrack(trackId).map((t) => ({
    id: t.id,
    trackId: t.trackId,
    domain: t.domain,
    subdomain: t.subdomain,
    title: t.title,
    weight: t.weight,
    component: t.component,
  }));
}
