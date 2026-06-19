import { createFileRoute } from "@tanstack/react-router";
import { conversation, agents } from "@/lib/mock";
import { ArrowUp, Brain, CheckCircle2, Paperclip, Search, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "Agent Chat — UTD Nexus" }] }),
  component: Chat,
});

function Chat() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] h-[calc(100vh-3.5rem)]">
      {/* Threads */}
      <aside className="border-r border-white/5 bg-navy-deep/40 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Conversation with</div>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-ember to-flame ember-glow flex items-center justify-center text-xs font-semibold">DV</div>
            <div>
              <div className="text-sm font-semibold">Developer Agent</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-orb" /> ready</div>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-1 overflow-y-auto flex-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1.5">Today</div>
          {["Q3 deployment audit", "Refactor billing module", "Migrate auth to passkeys"].map((t, i) => (
            <div key={t} className={`px-3 py-2.5 rounded-lg text-sm cursor-pointer ${i === 0 ? "bg-white/[0.05] border border-white/10" : "hover:bg-white/[0.03] text-muted-foreground"}`}>
              <div className="truncate">{t}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{i === 0 ? "2m ago" : "1h ago"}</div>
            </div>
          ))}
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1.5 mt-2">Yesterday</div>
          {["Database performance review", "Incident #2104 postmortem"].map((t) => (
            <div key={t} className="px-3 py-2.5 rounded-lg text-sm hover:bg-white/[0.03] text-muted-foreground cursor-pointer">
              <div className="truncate">{t}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Conversation */}
      <section className="flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {conversation.map((m) => (
            <div key={m.id} className="animate-fade-up">
              {m.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-br from-ember to-flame text-white text-sm shadow-[0_8px_30px_-10px] shadow-ember/60">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-navy-elevated to-navy border border-white/10 flex items-center justify-center text-[10px] font-semibold">DV</div>
                  <div className="space-y-3 min-w-0">
                    {m.tools && (
                      <div className="panel p-3 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ember mb-1"><Wrench className="h-3 w-3" /> Tool execution</div>
                        {m.tools.map((t) => (
                          <div key={t.name} className="flex items-center justify-between font-mono">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> {t.name}</span>
                            <span className="text-muted-foreground">{t.ms}ms</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {m.reasoning && (
                      <details className="panel p-3 text-xs" open>
                        <summary className="cursor-pointer flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ember"><Brain className="h-3 w-3" /> Reasoning · {m.reasoning.length} steps</summary>
                        <ol className="mt-2 space-y-1.5 list-decimal list-inside text-muted-foreground">
                          {m.reasoning.map((r, i) => (<li key={i}>{r}</li>))}
                        </ol>
                      </details>
                    )}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/95">{m.text}</div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3 max-w-[85%]">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-navy-elevated to-navy border border-white/10 flex items-center justify-center text-[10px] font-semibold">DV</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-orb" /> drafting Linear tickets…</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 p-4">
          <div className="panel p-3 flex items-end gap-2">
            <button className="h-9 w-9 rounded-lg glass flex items-center justify-center text-muted-foreground"><Paperclip className="h-4 w-4" /></button>
            <textarea placeholder="Ask the Developer Agent…" className="flex-1 bg-transparent text-sm resize-none focus:outline-none py-2 min-h-[36px] max-h-32" />
            <button className="h-9 w-9 rounded-lg bg-gradient-to-r from-ember to-flame text-white flex items-center justify-center ember-glow"><ArrowUp className="h-4 w-4" /></button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground px-1">
            <span>Press ⌘↵ to send · Shift↵ for newline</span>
            <span>nexus-pro-4 · context 12,408 / 200,000</span>
          </div>
        </div>
      </section>

      {/* Inspector */}
      <aside className="border-l border-white/5 bg-navy-deep/40 p-4 space-y-4 overflow-y-auto">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ember mb-2">Reasoning timeline</div>
          <div className="space-y-3">
            {[
              { t: "00:00", e: "Plan formulated · 6 steps" },
              { t: "00:02", e: "github.list_workflows → 142 results" },
              { t: "00:04", e: "datadog.query_incidents → 11 incidents" },
              { t: "00:06", e: "Knowledge: searched 'postmortem'" },
              { t: "00:08", e: "Correlation: 3 services at risk" },
              { t: "00:10", e: "Drafted response · awaiting confirmation" },
            ].map((s) => (
              <div key={s.t} className="flex gap-3 text-xs">
                <div className="font-mono text-muted-foreground w-12 shrink-0">{s.t}</div>
                <div className="relative pl-3 border-l border-white/10">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-ember" />
                  {s.e}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Search className="h-3 w-3" /> Knowledge retrieval</div>
          <div className="space-y-1.5 text-xs">
            {["postmortem-2024-q3.md", "rollback-runbook.md", "deploy-slo.md"].map((f) => (
              <div key={f} className="flex items-center justify-between font-mono">
                <span className="truncate">{f}</span>
                <span className="text-ember">0.{(Math.random() * 30 + 70).toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Suggested actions</div>
          <div className="space-y-1.5">
            {["Open Linear tickets", "Schedule review meeting", "Notify on-call"].map((a) => (
              <button key={a} className="w-full text-left text-xs px-2.5 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition">{a}</button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
