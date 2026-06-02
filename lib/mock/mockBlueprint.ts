import type { TopicWithProgress } from "@/types";

type MockBlueprintTopic = TopicWithProgress & { domainWeight: number };

export const MOCK_BLUEPRINT_TOPICS: MockBlueprintTopic[] = [
  { id: "nf-1", trackId: "ccna-core", domain: "Network Fundamentals", domainWeight: 20, weight: 20, title: "Explain network components and their roles", status: "mastered", confidence: 4 },
  { id: "nf-2", trackId: "ccna-core", domain: "Network Fundamentals", domainWeight: 20, weight: 20, title: "Compare physical cabling and interfaces", status: "in_progress", confidence: 3 },
  { id: "nf-3", trackId: "ccna-core", domain: "Network Fundamentals", domainWeight: 20, weight: 20, title: "Configure IPv4 subnetting with VLSM", status: "mastered", confidence: 5 },
  { id: "nf-4", trackId: "ccna-core", domain: "Network Fundamentals", domainWeight: 20, weight: 20, title: "Describe IPv6 addressing and types", status: "in_progress", confidence: 2 },
  { id: "nf-5", trackId: "ccna-core", domain: "Network Fundamentals", domainWeight: 20, weight: 20, title: "Interpret TCP and UDP behavior", status: "not_started", confidence: 1 },
  { id: "nf-6", trackId: "ccna-core", domain: "Network Fundamentals", domainWeight: 20, weight: 20, title: "Identify virtualization concepts", status: "in_progress", confidence: 3 },

  { id: "na-1", trackId: "ccna-core", domain: "Network Access", domainWeight: 20, weight: 20, title: "Configure VLANs and trunks", status: "mastered", confidence: 4 },
  { id: "na-2", trackId: "ccna-core", domain: "Network Access", domainWeight: 20, weight: 20, title: "Verify STP and RSTP operations", status: "in_progress", confidence: 3 },
  { id: "na-3", trackId: "ccna-core", domain: "Network Access", domainWeight: 20, weight: 20, title: "Configure EtherChannel with LACP", status: "in_progress", confidence: 2 },
  { id: "na-4", trackId: "ccna-core", domain: "Network Access", domainWeight: 20, weight: 20, title: "Describe wireless architecture modes", status: "not_started", confidence: 1 },
  { id: "na-5", trackId: "ccna-core", domain: "Network Access", domainWeight: 20, weight: 20, title: "Explain AP and WLC connectivity", status: "in_progress", confidence: 3 },
  { id: "na-6", trackId: "ccna-core", domain: "Network Access", domainWeight: 20, weight: 20, title: "Configure WLAN SSID security", status: "mastered", confidence: 4 },

  { id: "ipc-1", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Interpret routing table entries", status: "in_progress", confidence: 2 },
  { id: "ipc-2", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Configure static routes", status: "mastered", confidence: 4 },
  { id: "ipc-3", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Configure single-area OSPFv2", status: "in_progress", confidence: 3 },
  { id: "ipc-4", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Describe OSPF metric and adjacency", status: "not_started", confidence: 1 },
  { id: "ipc-5", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Configure first hop redundancy", status: "in_progress", confidence: 2 },
  { id: "ipc-6", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Configure policy-based routing", status: "not_started", confidence: 1 },
  { id: "ipc-7", trackId: "ccna-core", domain: "IP Connectivity", domainWeight: 25, weight: 25, title: "Verify IPv6 routing basics", status: "mastered", confidence: 5 },

  { id: "ips-1", trackId: "ccna-core", domain: "IP Services", domainWeight: 10, weight: 10, title: "Configure NAT overload", status: "in_progress", confidence: 3 },
  { id: "ips-2", trackId: "ccna-core", domain: "IP Services", domainWeight: 10, weight: 10, title: "Configure DHCP relay", status: "in_progress", confidence: 2 },
  { id: "ips-3", trackId: "ccna-core", domain: "IP Services", domainWeight: 10, weight: 10, title: "Describe NTP and syslog use", status: "mastered", confidence: 4 },
  { id: "ips-4", trackId: "ccna-core", domain: "IP Services", domainWeight: 10, weight: 10, title: "Configure SSH management", status: "mastered", confidence: 4 },
  { id: "ips-5", trackId: "ccna-core", domain: "IP Services", domainWeight: 10, weight: 10, title: "Explain QoS fundamentals", status: "not_started", confidence: 1 },

  { id: "sf-1", trackId: "ccna-core", domain: "Security Fundamentals", domainWeight: 15, weight: 15, title: "Describe security threats and mitigations", status: "mastered", confidence: 4 },
  { id: "sf-2", trackId: "ccna-core", domain: "Security Fundamentals", domainWeight: 15, weight: 15, title: "Configure ACL basics", status: "in_progress", confidence: 3 },
  { id: "sf-3", trackId: "ccna-core", domain: "Security Fundamentals", domainWeight: 15, weight: 15, title: "Configure DHCP snooping and DAI", status: "in_progress", confidence: 2 },
  { id: "sf-4", trackId: "ccna-core", domain: "Security Fundamentals", domainWeight: 15, weight: 15, title: "Explain AAA architecture", status: "not_started", confidence: 1 },
  { id: "sf-5", trackId: "ccna-core", domain: "Security Fundamentals", domainWeight: 15, weight: 15, title: "Describe wireless security protocols", status: "in_progress", confidence: 3 },

  { id: "ap-1", trackId: "ccna-core", domain: "Automation and Programmability", domainWeight: 10, weight: 10, title: "Describe controller-based networking", status: "in_progress", confidence: 2 },
  { id: "ap-2", trackId: "ccna-core", domain: "Automation and Programmability", domainWeight: 10, weight: 10, title: "Interpret REST API requests", status: "not_started", confidence: 1 },
  { id: "ap-3", trackId: "ccna-core", domain: "Automation and Programmability", domainWeight: 10, weight: 10, title: "Read JSON and YANG structures", status: "in_progress", confidence: 3 },
  { id: "ap-4", trackId: "ccna-core", domain: "Automation and Programmability", domainWeight: 10, weight: 10, title: "Compare NETCONF and RESTCONF", status: "mastered", confidence: 4 },
  { id: "ap-5", trackId: "ccna-core", domain: "Automation and Programmability", domainWeight: 10, weight: 10, title: "Explain automation tooling choices", status: "not_started", confidence: 2 },
];
