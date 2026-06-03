export const SEEDED_TRACK_IDS = ["ccna-core", "ccnp-enterprise", "ccie-enterprise"] as const;

export function isTrackSeeded(trackId: string): boolean {
  return (SEEDED_TRACK_IDS as readonly string[]).includes(trackId);
}
