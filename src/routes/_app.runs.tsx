import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { AlertCircle, CheckCircle2, ChevronRight, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/runs")({
  head: () => ({ meta: [{ title: "Run Inspector — UTD Nexus" }] }),
  component: Runs,
});

const timeline = [
  { t: "00:00.000", phase: "boot", text: "Run initiated · workflow PR Review Pipeline v17", status: "ok" },
  { t: "00:00.142", phase: "trigger", text: "Webhook received · github.pull_request #2401", status: "ok" },
  { t: "00:00.480", phase: "agent", text: "Research Agent · classify intent", status: "ok" },
  { t: "00:01.220", phase: "tool", text: "github.get_pull_request → 14 files changed", status: "ok" },
  { t: "00:02.014", phase: "knowledge", text: "Retrieved 8 chunks from Engineering Wiki", status: "ok" },
  { t: "00:03.401", phase: "reason", text: "Classification: refactor · confidence 0.92", status: "ok" },
  { t: "00:04.118", phase: "decision", text: "Routed to auto-merge branch", status: "ok" },
  { t: "00:04.812", phase: "tool", text: "github.run_checks → all passing", status: "ok" },
  { t: "00:06.220", phase: "tool", text: "github.merge → SHA 4f8a2c1", status: "ok" },
  { t: "00:06.541", phase: "tool", text: "slack.send → #eng-merges", status: "warn" },
  { t: "00:06.998", phase: "complete", text: "Run completed · 7 steps · $0.018", status: "ok" },
];

const phaseColors: Record<string, string> = {
  boot: "from-steel/40", trigger: "from-flame/40", agent: "from-ember/50",
  tool: "from-emerald-500/40", knowledge: "from-steel/50", reason: "from-ember/40",
  decision: "from-flame/50", complete: "from-emerald-500/50",
};

function Runs() {
  return (
    <div>
      <PageHeader
        eyebrow="Run Inspector"
        title="Telemetry · Run #r_8a42f1c"
        description="Spacecraft-grade observability for every agent execution. Trace every reasoning step, tool call, and decision."
        actions={
          <>
            <button className="h-9 px-3 rounded-lg glass text-xs">Export trace</button>
            <button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium ember-glow">Replay run</button>
          </>
        }
      />

      <div className="px-8 py-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-4">
          {/* Run summary strip */}
          <div className="panel p-5 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              ["Status", "Completed", "text-emerald-400"],
              ["Duration", "6.998s", ""],
              ["Steps", "11", ""],
              ["Tool calls", "4", ""],
              ["Cost", "$0.018", ""],
            ].map(([l, v, c]) => (
              <div key={l}>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                <div className={`mt-1 text-lg font-semibold ${c}`}>{v}</div>
              </div>
            ))}
          </div>

          {/* Waterfall */}
          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Execution waterfall</div>
            <div className="space-y-1.5">
              {timeline.map((s, i) => (
                <div key={i} className="grid grid-cols-[80px_80px_1fr] items-center gap-3 text-xs">
                  <span className="font-mono text-muted-foreground">{s.t}</span>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded text-center bg-gradient-to-r ${phaseColors[s.phase] ?? "from-white/10"} to-transparent border border-white/5`}>{s.phase}</span>
                  <div className="flex items-center gap-2 min-w-0">
                    {s.status === "ok" ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> : <AlertCircle className="h-3.5 w-3.5 text-flame shrink-0" />}
                    <span className="truncate">{s.text}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logs */}
          <div className="panel overflow-hidden">
            <div className="px-4 py-2 border-b border-white/5 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-orb" /> live logs
            </div>
            <pre className="p-4 font-mono text-[11px] leading-relaxed text-muted-foreground overflow-x-auto">
{`[00:00.000] runner.boot      workflow=pr-review-v17 trace=r_8a42f1c
[00:00.142] trigger.webhook   src=github event=pull_request action=opened
[00:00.480] agent.invoke      id=ag_res model=nexus-pro-4 temp=0.2
[00:01.220] tool.call         github.get_pull_request id=2401 → 200 OK 14 files
[00:02.014] knowledge.search  kb=engineering-wiki q="refactor billing"
[00:02.014]                   → 8 chunks score>=0.74
[00:03.401] reason.step       classification=refactor confidence=0.92
[00:04.118] decision.route    target=auto_merge_branch
[00:04.812] tool.call         github.run_checks → 12/12 passing
[00:06.220] tool.call         github.merge sha=4f8a2c1 ✓
[00:06.541] tool.call         slack.send channel=#eng-merges (rate-limited, retried)
[00:06.998] runner.complete   status=ok steps=11 cost=0.018`}
            </pre>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Output</div>
            <div className="rounded-lg bg-black/30 border border-white/5 p-3 font-mono text-[11px] space-y-1.5">
              <div>{`{`}</div>
              <div className="pl-3"><span className="text-ember">"merged"</span>: <span className="text-emerald-400">true</span>,</div>
              <div className="pl-3"><span className="text-ember">"sha"</span>: <span className="text-flame">"4f8a2c1"</span>,</div>
              <div className="pl-3"><span className="text-ember">"reviewer"</span>: <span className="text-flame">"auto"</span>,</div>
              <div className="pl-3"><span className="text-ember">"notified"</span>: <span className="text-emerald-400">true</span></div>
              <div>{`}`}</div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Recent runs</div>
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 text-xs px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono truncate flex-1">r_{Math.random().toString(36).slice(2, 9)}</span>
                  <span className="text-emerald-400 text-[10px]">ok</span>
                  <span className="text-muted-foreground font-mono text-[10px]">{(Math.random() * 12).toFixed(1)}s</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
