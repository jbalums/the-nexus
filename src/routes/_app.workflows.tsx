import { createFileRoute } from "@tanstack/react-router";
import { workflows } from "@/lib/mock";
import { Bot, Database, GitBranch, Mail, Play, Plus, Search, Webhook, Wrench, Zap } from "lucide-react";

export const Route = createFileRoute("/_app/workflows")({
  head: () => ({ meta: [{ title: "Workflow Canvas — UTD Nexus" }] }),
  component: Workflows,
});

const nodes = [
  { id: "n1", x: 60, y: 120, type: "trigger", label: "Webhook", sub: "github.pull_request", icon: Webhook },
  { id: "n2", x: 260, y: 80, type: "agent", label: "Research Agent", sub: "Classify intent", icon: Bot },
  { id: "n3", x: 260, y: 220, type: "knowledge", label: "Query Wiki", sub: "engineering-wiki", icon: Database },
  { id: "n4", x: 480, y: 150, type: "logic", label: "Decision Router", sub: "if confidence > 0.8", icon: GitBranch },
  { id: "n5", x: 700, y: 80, type: "tool", label: "Auto-merge", sub: "github.merge", icon: Wrench },
  { id: "n6", x: 700, y: 220, type: "notify", label: "Notify reviewer", sub: "slack.send", icon: Mail },
];

const edges = [
  ["n1", "n2"], ["n1", "n3"], ["n2", "n4"], ["n3", "n4"], ["n4", "n5"], ["n4", "n6"],
] as const;

function Workflows() {
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] h-[calc(100vh-3.5rem)]">
      {/* Node library */}
      <aside className="border-r border-white/5 bg-navy-deep/40 p-4 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[0.2em] text-ember mb-3">Node Library</div>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input placeholder="Search nodes" className="w-full h-9 pl-8 pr-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs focus:outline-none" />
        </div>
        {[
          { group: "Triggers", items: [["Webhook", Webhook], ["Schedule", Zap], ["Email arrival", Mail]] },
          { group: "Agents", items: [["Research Agent", Bot], ["Developer Agent", Bot], ["Marketing Agent", Bot]] },
          { group: "Tools", items: [["GitHub", Wrench], ["Slack", Wrench], ["PostgreSQL", Database]] },
          { group: "Logic", items: [["Decision", GitBranch], ["Loop", GitBranch], ["Wait", GitBranch]] },
        ].map((sec) => (
          <div key={sec.group} className="mb-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">{sec.group}</div>
            <div className="space-y-1">
              {sec.items.map(([label, Icon]) => {
                const I = Icon as React.ComponentType<{className?:string}>;
                return (
                  <div key={label as string} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-grab text-xs">
                    <I className="h-3.5 w-3.5 text-ember" />
                    <span>{label as string}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      {/* Canvas */}
      <section className="relative grid-bg overflow-hidden">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="glass rounded-lg px-3 py-2 text-xs">
            <span className="text-muted-foreground">Workflow</span> · <span className="font-medium">PR Review Pipeline</span> · <span className="text-emerald-400">v17 published</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 rounded-lg glass text-xs">Test run</button>
            <button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium flex items-center gap-1.5 ember-glow"><Play className="h-3.5 w-3.5" /> Deploy</button>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="oklch(0.68 0.19 38)" />
            </marker>
          </defs>
          {edges.map(([from, to]) => {
            const f = byId[from], t = byId[to];
            const x1 = f.x + 180, y1 = f.y + 32;
            const x2 = t.x, y2 = t.y + 32;
            const mx = (x1 + x2) / 2;
            return (
              <path key={`${from}-${to}`} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke="oklch(0.68 0.19 38 / 0.6)" strokeWidth="1.5" markerEnd="url(#arr)" />
            );
          })}
        </svg>

        {nodes.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="absolute panel p-3 w-[180px] hover:border-ember/40 transition cursor-pointer" style={{ left: n.x, top: n.y }}>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-ember/30 to-flame/20 border border-ember/30 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-ember" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{n.label}</div>
                  <div className="text-[10px] text-muted-foreground font-mono truncate">{n.sub}</div>
                </div>
              </div>
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-navy-deep border border-ember" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-navy-deep border border-ember" />
            </div>
          );
        })}

        <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 text-[11px] font-mono text-muted-foreground">
          412 runs · 96.2% success · avg 8.4s
        </div>
      </section>

      {/* Inspector */}
      <aside className="border-l border-white/5 bg-navy-deep/40 p-4 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[0.2em] text-ember mb-2">Selected Node</div>
        <div className="panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-ember/30 to-flame/20 border border-ember/30 flex items-center justify-center"><GitBranch className="h-4 w-4 text-ember" /></div>
            <div>
              <div className="text-sm font-semibold">Decision Router</div>
              <div className="text-[10px] text-muted-foreground">logic.branch</div>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Condition</div>
              <div className="font-mono p-2 rounded bg-black/30 border border-white/5">classification.confidence &gt; 0.8</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">On true</div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">→ Auto-merge</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">On false</div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">→ Notify reviewer</div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">All workflows</div>
          <div className="space-y-1.5">
            {workflows.map((w) => (
              <div key={w.id} className="text-xs px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="truncate">{w.name}</span>
                <span className="font-mono text-muted-foreground">{w.runs}</span>
              </div>
            ))}
            <button className="w-full mt-2 h-9 rounded-lg glass text-xs flex items-center justify-center gap-1.5"><Plus className="h-3.5 w-3.5" /> New workflow</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
