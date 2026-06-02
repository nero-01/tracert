import type { StudySession } from "@/types";

const today = new Date();

function daysAgo(days: number) {
  const d = new Date(today);
  d.setDate(today.getDate() - days);
  return d;
}

function isoDate(d: Date) {
  return d.toISOString();
}

export const MOCK_STUDY_SESSIONS: StudySession[] = [
  { id: "s-01", userId: "mock-user-001", trackId: "ccna-core", topicId: "ipc-3", durationMinutes: 120, notes: "OSPF area 0 lab", createdAt: isoDate(daysAgo(0)) },
  { id: "s-02", userId: "mock-user-001", trackId: "ccna-core", topicId: "na-2", durationMinutes: 45, notes: "RSTP verification", createdAt: isoDate(daysAgo(0)) },
  { id: "s-03", userId: "mock-user-001", trackId: "ccna-core", topicId: "nf-3", durationMinutes: 90, notes: "VLSM drills", createdAt: isoDate(daysAgo(1)) },
  { id: "s-04", userId: "mock-user-001", trackId: "ccna-core", topicId: "sf-2", durationMinutes: 60, notes: "ACL practice", createdAt: isoDate(daysAgo(2)) },
  { id: "s-05", userId: "mock-user-001", trackId: "ccna-core", topicId: "ips-1", durationMinutes: 75, notes: "NAT overload", createdAt: isoDate(daysAgo(2)) },
  { id: "s-06", userId: "mock-user-001", trackId: "ccna-automation", topicId: "ap-2", durationMinutes: 30, notes: "API fundamentals", createdAt: isoDate(daysAgo(3)) },
  { id: "s-07", userId: "mock-user-001", trackId: "ccna-core", topicId: "na-6", durationMinutes: 110, notes: "WLAN security", createdAt: isoDate(daysAgo(4)) },
  { id: "s-08", userId: "mock-user-001", trackId: "ccna-core", topicId: "ipc-7", durationMinutes: 95, notes: "IPv6 routing", createdAt: isoDate(daysAgo(5)) },
  { id: "s-09", userId: "mock-user-001", trackId: "ccnp-enterprise", topicId: undefined, durationMinutes: 180, notes: "ENCOR mixed review", createdAt: isoDate(daysAgo(6)) },
  { id: "s-10", userId: "mock-user-001", trackId: "ccna-core", topicId: "sf-3", durationMinutes: 50, notes: "DAI and snooping", createdAt: isoDate(daysAgo(7)) },
  { id: "s-11", userId: "mock-user-001", trackId: "ccna-core", topicId: "ips-3", durationMinutes: 40, notes: "NTP and syslog", createdAt: isoDate(daysAgo(8)) },
  { id: "s-12", userId: "mock-user-001", trackId: "ccna-core", topicId: "nf-5", durationMinutes: 65, notes: "TCP/UDP compare", createdAt: isoDate(daysAgo(9)) },
  { id: "s-13", userId: "mock-user-001", trackId: "ccna-cybersecurity", topicId: undefined, durationMinutes: 130, notes: "SOC workflow", createdAt: isoDate(daysAgo(10)) },
  { id: "s-14", userId: "mock-user-001", trackId: "ccna-core", topicId: "ap-4", durationMinutes: 55, notes: "RESTCONF vs NETCONF", createdAt: isoDate(daysAgo(11)) },
  { id: "s-15", userId: "mock-user-001", trackId: "ccna-core", topicId: "ipc-1", durationMinutes: 80, notes: "Route table analysis", createdAt: isoDate(daysAgo(12)) },
  { id: "s-16", userId: "mock-user-001", trackId: "ccna-core", topicId: "na-3", durationMinutes: 70, notes: "LACP bundle test", createdAt: isoDate(daysAgo(13)) },
];
