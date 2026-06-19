import { createFileRoute, Link } from "@tanstack/react-router";
import { agents } from "@/lib/mock";
import { PageHeader, StatusOrb } from "@/components/app-shell";
import { Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/agents")({
  head: () => ({ meta: [{ title: "Agent Universe — UTD Nexus" }] }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Agent Universe"
        title="Your digital workforce"
        description="Manage every autonomous worker in your fleet. Each agent has its own intelligence, memory, tools, and knowledge — like a hand-picked employee."
        actions={
          <>
            <button className="h-9 px-3 rounded-lg glass text-xs flex items-center gap-1.5"><Filter className="h-3.5 w-3.5" /> Filter</button>
            <button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium flex items-center gap-1.5 ember-glow"><Plus className="h-3.5 w-3.5" /> Spawn agent</button>
          </>
        }
      />

      <div className="px-8 py-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input placeholder="Search agents by name, role, or capability…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-ember/60" />
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {["All", "Active", "Training", "Idle", "Archived"].map((t, i) => (
            <button key={t} className={`px-3 h-8 rounded-md ${i === 0 ? "bg-white/10 text-foreground" : "hover:bg-white/5"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="px-8 pb-12 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((a, idx) => (
          <Link to="/studio" key={a.id} className="group relative panel p-5 overflow-hidden hover:border-ember/30 transition animate-fade-up" style={{ animationDelay: `${idx * 60}ms` }}>
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-ember/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />

            <div className="flex items-start gap-3">
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-navy-elevated to-navy flex items-center justify-center border border-white/10">
                <span className="text-lg font-semibold">{a.avatar}</span>
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-navy-deep border border-white/20 flex items-center justify-center">
                  <StatusOrb status={a.status} />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold tracking-tight truncate">{a.name}</h3>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{a.role} · {a.model}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md glass">
                  <StatusOrb status={a.status} /> {a.status}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                <span>Intelligence Score</span>
                <span className="font-mono text-ember">{a.intelligence}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-ember to-flame" style={{ width: `${a.intelligence}%` }} />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["Tasks", a.tasks],
                ["Tools", a.tools],
                ["KBs", a.knowledge],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                  <div className="text-sm font-semibold mt-0.5 font-mono">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Last active {a.lastActive}</span>
              <span className="text-ember opacity-0 group-hover:opacity-100 transition">Open studio →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
