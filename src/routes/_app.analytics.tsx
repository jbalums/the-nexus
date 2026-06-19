import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { agents, tools, stats } from "@/lib/mock";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — UTD Nexus" }] }),
  component: Analytics,
});

const series = Array.from({ length: 30 }, (_, i) => ({
  x: i,
  a: 40 + Math.sin(i / 3) * 12 + i,
  b: 30 + Math.cos(i / 4) * 10 + i * 0.7,
}));

function AreaChart() {
  const max = Math.max(...series.map(s => Math.max(s.a, s.b)));
  const toPts = (key: "a" | "b") => series.map((s) => `${(s.x / 29) * 100},${100 - (s[key] / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-56">
      <defs>
        <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.19 38)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.68 0.19 38)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.58 0.05 245)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.58 0.05 245)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="oklch(1 0 0 / 0.05)" strokeWidth="0.3" />
      ))}
      <polygon points={`0,100 ${toPts("b")} 100,100`} fill="url(#bG)" />
      <polyline points={toPts("b")} fill="none" stroke="oklch(0.58 0.05 245)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <polygon points={`0,100 ${toPts("a")} 100,100`} fill="url(#aG)" />
      <polyline points={toPts("a")} fill="none" stroke="oklch(0.68 0.19 38)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Analytics() {
  return (
    <div>
      <PageHeader
        eyebrow="Executive Analytics"
        title="The story of your agent workforce"
        description="Visual storytelling for leadership. Track agent utilization, workflow health, knowledge demand, and tool gravity over time."
        actions={
          <div className="flex items-center gap-1 glass rounded-lg p-1">
            {["7d", "30d", "90d", "All"].map((r, i) => (
              <button key={r} className={`px-3 h-7 rounded-md text-xs ${i === 1 ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}>{r}</button>
            ))}
          </div>
        }
      />

      <div className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Decisions", stats.decisionsToday.toLocaleString(), "+18%"],
            ["Retrievals", stats.knowledgeRetrievals.toLocaleString(), "+22%"],
            ["Tool calls", stats.toolCalls.toLocaleString(), "+9%"],
            ["Cost", "$12,418", "−4%"],
          ].map(([l, v, d]) => (
            <div key={l} className="panel p-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
              <div className="text-2xl font-semibold mt-2 tracking-tight">{v}</div>
              <div className={`text-[11px] mt-1 ${d?.toString().startsWith("−") ? "text-emerald-400" : "text-ember"}`}>{d} vs last period</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <div className="panel p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Workflow throughput vs. tool calls</div>
                <div className="text-sm font-semibold mt-0.5">30-day operations volume</div>
              </div>
              <div className="flex gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm bg-ember" /> Workflows</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm bg-steel" /> Tool calls</span>
              </div>
            </div>
            <AreaChart />
          </div>

          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Agent utilization</div>
            <div className="space-y-3">
              {agents.map((a) => (
                <div key={a.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{a.name}</span>
                    <span className="font-mono text-muted-foreground">{a.tasks}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-ember to-flame" style={{ width: `${Math.min(100, a.tasks / 1.5)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Top tools by gravity</div>
            <div className="space-y-2">
              {[...tools].sort((a, b) => b.calls24h - a.calls24h).slice(0, 6).map((t) => (
                <div key={t.id} className="grid grid-cols-[24px_1fr_60px] items-center gap-3 text-xs">
                  <div className="h-6 w-6 rounded bg-gradient-to-br from-steel to-navy-elevated flex items-center justify-center text-[10px] font-bold">{t.icon}</div>
                  <div>
                    <div>{t.name}</div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden mt-1">
                      <div className="h-full bg-gradient-to-r from-ember to-flame" style={{ width: `${(t.calls24h / 4231) * 100}%` }} />
                    </div>
                  </div>
                  <div className="font-mono text-right text-muted-foreground">{t.calls24h.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Knowledge retrieval heatmap</div>
            <div className="grid grid-cols-24 gap-[3px]" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
              {Array.from({ length: 24 * 7 }).map((_, i) => {
                const v = Math.random();
                return <div key={i} className="aspect-square rounded-sm" style={{ background: `oklch(${0.25 + v * 0.5} ${v * 0.2} 38)`, opacity: 0.3 + v * 0.7 }} />;
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
