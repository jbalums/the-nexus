import { createFileRoute, Link } from "@tanstack/react-router";
import { agents, workflows, recentDecisions, activityStream, stats, sparkline } from "@/lib/mock";
import { StatusOrb } from "@/components/app-shell";
import { Activity, Brain, Cpu, Database, Gauge, GitBranch, Layers, Radio, Sparkles, Workflow as WfIcon } from "lucide-react";

export const Route = createFileRoute("/_app/nexus")({
  head: () => ({ meta: [{ title: "Command Center — UTD Nexus" }] }),
  component: Nexus,
});

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16">
      <defs>
        <linearGradient id="sparkG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.19 38)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.68 0.19 38)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="oklch(0.68 0.19 38)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <polygon points={`0,100 ${pts} 100,100`} fill="url(#sparkG)" />
    </svg>
  );
}

function Nexus() {
  return (
    <div className="px-6 py-6 space-y-6">
      {/* Hero strip */}
      <section className="relative panel p-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-ember/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-ember mb-2">Nexus Command Center</div>
            <h1 className="text-2xl font-semibold tracking-tight">Good afternoon, Alex.</h1>
            <p className="text-sm text-muted-foreground mt-1">6 agent fleets active · 38 workflows running · 18,420 decisions made today</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass rounded-xl px-4 py-2 text-xs">
              <div className="text-muted-foreground">Workspace load</div>
              <div className="font-mono text-ember mt-0.5">62%</div>
            </div>
            <div className="glass rounded-xl px-4 py-2 text-xs">
              <div className="text-muted-foreground">Latency</div>
              <div className="font-mono text-emerald-400 mt-0.5">142ms</div>
            </div>
            <div className="glass rounded-xl px-4 py-2 text-xs">
              <div className="text-muted-foreground">Budget</div>
              <div className="font-mono mt-0.5">$2,841 / $5,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Agents Active", value: stats.agentsActive, delta: "+12", icon: Cpu },
          { label: "Workflows Running", value: stats.workflowsRunning, delta: "+3", icon: WfIcon },
          { label: "Decisions / 24h", value: stats.decisionsToday.toLocaleString(), delta: "+18%", icon: Brain },
          { label: "Tool Calls / 24h", value: stats.toolCalls.toLocaleString(), delta: "+9%", icon: Radio },
        ].map((k) => (
          <div key={k.label} className="panel p-5 group hover:border-ember/30 transition">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k.label}</div>
                <div className="text-2xl font-semibold mt-2 tracking-tight">{k.value}</div>
              </div>
              <div className="h-9 w-9 rounded-lg glass flex items-center justify-center">
                <k.icon className="h-4 w-4 text-ember" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400">{k.delta} vs yesterday</span>
              <div className="w-24"><Spark data={sparkline} /></div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        {/* Active Agents */}
        <div className="panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Active Fleet</div>
              <div className="text-sm font-semibold mt-0.5">Live agent telemetry</div>
            </div>
            <Link to="/agents" className="text-xs text-ember hover:underline">Open Agent Universe →</Link>
          </div>
          <div className="space-y-2">
            {agents.slice(0, 5).map((a) => (
              <div key={a.id} className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-ember/20 transition">
                <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-navy-elevated to-navy flex items-center justify-center text-xs font-semibold border border-white/10">
                  {a.avatar}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-navy-deep border border-white/20 flex items-center justify-center">
                    <StatusOrb status={a.status} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground">{a.role} · {a.tasks} tasks today</div>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[11px]">
                  <div>
                    <div className="text-muted-foreground">IQ</div>
                    <div className="font-mono text-ember">{a.intelligence}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Tools</div>
                    <div className="font-mono">{a.tools}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last</div>
                    <div className="font-mono">{a.lastActive}</div>
                  </div>
                </div>
                <div className="w-24 hidden lg:block">
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-ember to-flame" style={{ width: `${a.intelligence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System health */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">System Health</div>
            <Gauge className="h-4 w-4 text-ember" />
          </div>
          <div className="space-y-4">
            {[
              { label: "Inference fabric", value: 98, color: "from-ember to-flame" },
              { label: "Knowledge index", value: 92, color: "from-steel to-ember" },
              { label: "Tool gateways", value: 96, color: "from-emerald-500 to-ember" },
              { label: "Memory cache", value: 78, color: "from-flame to-critical" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-mono">{s.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-3 text-center">
            <div>
              <div className="text-lg font-semibold text-emerald-400">99.98%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">uptime</div>
            </div>
            <div>
              <div className="text-lg font-semibold">142ms</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">p50</div>
            </div>
            <div>
              <div className="text-lg font-semibold">412ms</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">p99</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        {/* Workflows */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold flex items-center gap-2"><WfIcon className="h-4 w-4 text-ember" /> Workflows</div>
            <Link to="/workflows" className="text-xs text-ember hover:underline">All</Link>
          </div>
          <div className="space-y-2.5">
            {workflows.slice(0, 4).map((w) => (
              <div key={w.id} className="flex items-center gap-3 text-sm">
                <StatusOrb status={w.status} />
                <div className="flex-1 min-w-0 truncate">{w.name}</div>
                <span className="text-[11px] font-mono text-muted-foreground">{w.lastRun}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent decisions */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-ember" /> Recent Decisions</div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">last 30m</span>
          </div>
          <div className="space-y-3">
            {recentDecisions.slice(0, 5).map((d) => (
              <div key={d.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="truncate">{d.action}</span>
                  <span className="text-[11px] font-mono text-ember">{d.confidence}%</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{d.agent} · {d.time} ago</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity stream */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-ember" /> Live Activity</div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-orb" /> streaming</span>
          </div>
          <div className="space-y-2 max-h-56 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-navy/60 to-transparent pointer-events-none z-10" />
            {activityStream.map((a) => {
              const Icon = a.type === "tool" ? Plug : a.type === "knowledge" ? Database : a.type === "decision" ? Brain : a.type === "memory" ? Layers : GitBranch;
              return (
                <div key={a.id} className="flex items-start gap-2 text-[12px]">
                  <Icon className="h-3.5 w-3.5 mt-0.5 text-steel shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-foreground/90 truncate">{a.text}</div>
                    <div className="text-[10px] text-muted-foreground">{a.agent} · {a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Plug(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M9 7V2M15 7V2M5 7h14v6a5 5 0 0 1-10 0M12 18v4" /></svg>;
}
