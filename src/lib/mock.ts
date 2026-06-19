// Centralized mock data for UTD Nexus prototype
export const agents = [
  { id: "ag_dev", name: "Developer Agent", role: "Senior Engineer", status: "active", intelligence: 94, tasks: 142, tools: 12, knowledge: 8, color: "ember", avatar: "DV", lastActive: "now", model: "nexus-pro-4" },
  { id: "ag_res", name: "Research Agent", role: "Market Analyst", status: "active", intelligence: 89, tasks: 87, tools: 7, knowledge: 14, color: "steel", avatar: "RS", lastActive: "2m", model: "nexus-pro-4" },
  { id: "ag_doc", name: "Documentation Agent", role: "Tech Writer", status: "idle", intelligence: 82, tasks: 54, tools: 5, knowledge: 22, color: "flame", avatar: "DC", lastActive: "12m", model: "nexus-flash" },
  { id: "ag_mkt", name: "Marketing Agent", role: "Growth Lead", status: "active", intelligence: 86, tasks: 63, tools: 9, knowledge: 11, color: "ember", avatar: "MK", lastActive: "now", model: "nexus-pro-4" },
  { id: "ag_fl",  name: "Fleetlify Agent", role: "Ops Specialist", status: "training", intelligence: 78, tasks: 31, tools: 14, knowledge: 6, color: "steel", avatar: "FL", lastActive: "1h", model: "nexus-pro-4" },
  { id: "ag_sec", name: "Security Agent", role: "SecOps", status: "active", intelligence: 91, tasks: 29, tools: 6, knowledge: 9, color: "critical", avatar: "SC", lastActive: "now", model: "nexus-pro-4" },
];

export const workflows = [
  { id: "wf1", name: "Daily Standup Digest", runs: 184, success: 99.4, lastRun: "4m ago", status: "running", nodes: 8 },
  { id: "wf2", name: "Customer Onboarding", runs: 1203, success: 97.1, lastRun: "1m ago", status: "running", nodes: 14 },
  { id: "wf3", name: "Incident Triage", runs: 56, success: 92.8, lastRun: "22m ago", status: "idle", nodes: 11 },
  { id: "wf4", name: "Weekly Investor Brief", runs: 12, success: 100, lastRun: "2h ago", status: "scheduled", nodes: 9 },
  { id: "wf5", name: "PR Review Pipeline", runs: 412, success: 96.2, lastRun: "just now", status: "running", nodes: 17 },
];

export const tools = [
  { id: "github", name: "GitHub", category: "Development", connected: true, calls24h: 1842, icon: "G" },
  { id: "slack", name: "Slack", category: "Communication", connected: true, calls24h: 967, icon: "S" },
  { id: "discord", name: "Discord", category: "Communication", connected: true, calls24h: 312, icon: "D" },
  { id: "notion", name: "Notion", category: "Knowledge", connected: true, calls24h: 754, icon: "N" },
  { id: "pg", name: "PostgreSQL", category: "Data", connected: true, calls24h: 4231, icon: "P" },
  { id: "fleetlify", name: "Fleetlify API", category: "Internal", connected: true, calls24h: 2104, icon: "F" },
  { id: "stripe", name: "Stripe", category: "Payments", connected: false, calls24h: 0, icon: "$" },
  { id: "linear", name: "Linear", category: "Productivity", connected: true, calls24h: 488, icon: "L" },
  { id: "figma", name: "Figma", category: "Design", connected: false, calls24h: 0, icon: "Fg" },
  { id: "aws", name: "AWS", category: "Infrastructure", connected: true, calls24h: 1290, icon: "A" },
];

export const knowledgeBases = [
  { id: "kb1", name: "Engineering Wiki", docs: 412, vectors: "1.2M", retrievals: 8431, freshness: 98 },
  { id: "kb2", name: "Product Specs", docs: 89, vectors: "240K", retrievals: 1209, freshness: 92 },
  { id: "kb3", name: "Customer Contracts", docs: 312, vectors: "780K", retrievals: 524, freshness: 88 },
  { id: "kb4", name: "Brand Guidelines", docs: 47, vectors: "92K", retrievals: 318, freshness: 100 },
  { id: "kb5", name: "Research Papers", docs: 1208, vectors: "4.1M", retrievals: 2104, freshness: 76 },
];

export const recentDecisions = [
  { id: "d1", agent: "Developer Agent", action: "Merged PR #2401", confidence: 96, time: "2m" },
  { id: "d2", agent: "Security Agent", action: "Blocked anomalous token use", confidence: 99, time: "5m" },
  { id: "d3", agent: "Research Agent", action: "Compiled Q3 competitor brief", confidence: 88, time: "11m" },
  { id: "d4", agent: "Marketing Agent", action: "Drafted launch sequence", confidence: 91, time: "18m" },
  { id: "d5", agent: "Fleetlify Agent", action: "Re-routed shipment cluster", confidence: 84, time: "24m" },
  { id: "d6", agent: "Documentation Agent", action: "Updated API reference", confidence: 95, time: "31m" },
];

export const activityStream = [
  { id: "a1", type: "tool", agent: "Developer", text: "github.create_pull_request", time: "now" },
  { id: "a2", type: "knowledge", agent: "Research", text: "retrieved 14 chunks from Research Papers", time: "12s" },
  { id: "a3", type: "decision", agent: "Security", text: "policy escalation → human review", time: "42s" },
  { id: "a4", type: "tool", agent: "Marketing", text: "notion.update_page", time: "1m" },
  { id: "a5", type: "workflow", agent: "System", text: "Customer Onboarding completed (8.2s)", time: "1m" },
  { id: "a6", type: "memory", agent: "Developer", text: "stored long-term memory: deploy_pattern_v3", time: "2m" },
  { id: "a7", type: "tool", agent: "Fleetlify", text: "fleetlify.dispatch_route", time: "2m" },
  { id: "a8", type: "knowledge", agent: "Docs", text: "indexed 28 new documents", time: "3m" },
];

export const conversation = [
  { id: "m1", role: "user", text: "Audit our Q3 deployment pipeline and identify the top 3 reliability risks." },
  { id: "m2", role: "agent", text: "Starting audit. Pulling deployment telemetry from the last 90 days and cross-referencing incident postmortems.", tools: [
    { name: "github.list_workflows", status: "ok", ms: 412 },
    { name: "datadog.query_incidents", status: "ok", ms: 880 },
    { name: "knowledge.search('postmortem')", status: "ok", ms: 240 },
  ], reasoning: [
    "Identified 142 deploys across 6 services",
    "Correlated 11 incidents with deploy windows",
    "Detected pattern: rollback latency exceeds SLO in 3 services",
  ] },
  { id: "m3", role: "agent", text: "Top 3 reliability risks identified:\n\n1. **Rollback latency** in `payments-api` averages 8m 12s (SLO: 3m).\n2. **Untested migrations** ship in 22% of deploys to `core-db`.\n3. **Feature flag sprawl** — 47 stale flags affecting cold-start.\n\nWant me to open Linear tickets and draft mitigation plans?" },
];

export const stats = {
  agentsActive: 142,
  workflowsRunning: 38,
  decisionsToday: 18420,
  knowledgeRetrievals: 91204,
  toolCalls: 412803,
  uptime: 99.98,
};

export const sparkline = [12, 18, 14, 22, 28, 24, 31, 38, 34, 42, 48, 44, 52, 58, 54, 62, 70, 64, 72, 78];
