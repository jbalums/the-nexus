import { createFileRoute } from "@tanstack/react-router";
import { tools, knowledgeBases } from "@/lib/mock";
import { Brain, Cpu, Database, Save, Sparkles, Wand2, Wrench } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/studio")({
  head: () => ({ meta: [{ title: "Agent Studio — UTD Nexus" }] }),
  component: Studio,
});

const defaultPrompt = `You are the Developer Agent for Helix Labs.

Operate with the precision of a staff engineer. You write production-grade code,
ship pull requests through GitHub, and coordinate with the Documentation Agent
when changes affect public APIs.

Always reason before acting. Prefer the smallest correct change.`;

function Studio() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [temp, setTemp] = useState(0.4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] min-h-[calc(100vh-3.5rem)]">
      {/* Left rail */}
      <aside className="border-r border-white/5 bg-navy-deep/40 p-5">
        <div className="text-[10px] uppercase tracking-[0.25em] text-ember mb-2">Building</div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-ember to-flame ember-glow flex items-center justify-center font-semibold">DV</div>
          <div>
            <div className="font-semibold">Developer Agent</div>
            <div className="text-[11px] text-muted-foreground">v3.4 · published</div>
          </div>
        </div>

        <div className="space-y-1.5 text-sm">
          {[
            { icon: Sparkles, label: "Identity & Prompt", active: true },
            { icon: Wrench, label: "Tool Access" },
            { icon: Database, label: "Knowledge" },
            { icon: Brain, label: "Memory" },
            { icon: Cpu, label: "Model & Limits" },
            { icon: Wand2, label: "Evaluations" },
          ].map((s) => (
            <div key={s.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer ${s.active ? "bg-white/[0.05] border border-white/10" : "text-muted-foreground hover:bg-white/[0.03]"}`}>
              <s.icon className="h-4 w-4" />
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 panel p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Agent Card</div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Model</span><span className="font-mono">nexus-pro-4</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Context</span><span className="font-mono">200K</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cost / 1K</span><span className="font-mono">$0.014</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Avg latency</span><span className="font-mono">1.8s</span></div>
          </div>
        </div>
      </aside>

      {/* Editor */}
      <section className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-ember">Identity</div>
            <h2 className="text-xl font-semibold mt-0.5">System Prompt</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 rounded-lg glass text-xs">Preview run</button>
            <button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium flex items-center gap-1.5 ember-glow"><Save className="h-3.5 w-3.5" /> Publish v3.5</button>
          </div>
        </div>

        <div className="relative panel overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
              <span className="h-2 w-2 rounded-full bg-flame" />
              <span className="h-2 w-2 rounded-full bg-ember" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-2">prompt.md</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">{prompt.length} chars · ~{Math.round(prompt.length/4)} tokens</div>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            spellCheck={false}
            className="w-full h-64 p-4 bg-transparent font-mono text-[13px] leading-relaxed resize-none focus:outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="panel p-4">
            <div className="flex items-center justify-between text-sm font-semibold mb-3">
              <span className="flex items-center gap-2"><Wrench className="h-4 w-4 text-ember" /> Tool Access</span>
              <span className="text-[11px] font-normal text-muted-foreground">12 enabled</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tools.filter(t => t.connected).map((t) => (
                <span key={t.id} className="text-[11px] px-2.5 py-1 rounded-md glass flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded bg-gradient-to-br from-steel to-navy-elevated flex items-center justify-center text-[9px] font-bold">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
          <div className="panel p-4">
            <div className="flex items-center justify-between text-sm font-semibold mb-3">
              <span className="flex items-center gap-2"><Database className="h-4 w-4 text-ember" /> Knowledge</span>
              <span className="text-[11px] font-normal text-muted-foreground">3 attached</span>
            </div>
            <div className="space-y-2">
              {knowledgeBases.slice(0, 3).map((k) => (
                <div key={k.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span>{k.name}</span>
                  <span className="font-mono text-muted-foreground">{k.docs} docs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right inspector */}
      <aside className="border-l border-white/5 bg-navy-deep/40 p-5 space-y-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-ember mb-3">Tuning</div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Temperature</span>
                <span className="font-mono">{temp.toFixed(2)}</span>
              </div>
              <input type="range" min={0} max={1} step={0.05} value={temp} onChange={e => setTemp(+e.target.value)} className="w-full accent-[oklch(0.68_0.19_38)]" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Max steps</span>
                <span className="font-mono">12</span>
              </div>
              <input type="range" min={1} max={30} defaultValue={12} className="w-full accent-[oklch(0.68_0.19_38)]" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Autonomy level</span>
                <span className="font-mono text-flame">elevated</span>
              </div>
              <input type="range" min={0} max={3} defaultValue={2} className="w-full accent-[oklch(0.68_0.19_38)]" />
            </div>
          </div>
        </div>

        <div className="panel p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Memory</div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span>Short-term</span><span className="font-mono">42 items</span></div>
            <div className="flex justify-between"><span>Long-term</span><span className="font-mono">1,284 items</span></div>
            <div className="flex justify-between"><span>Episodic</span><span className="font-mono">312 traces</span></div>
            <button className="mt-3 w-full h-8 rounded-lg glass text-[11px]">Inspect memory graph</button>
          </div>
        </div>

        <div className="panel p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Last evaluation</div>
          <div className="text-2xl font-semibold ember-text">A+</div>
          <div className="text-[11px] text-muted-foreground mt-1">94/100 across 48 scenarios</div>
          <div className="mt-3 space-y-1.5">
            {[["Accuracy", 96], ["Helpfulness", 92], ["Safety", 99]].map(([l, v]) => (
              <div key={l as string}>
                <div className="flex justify-between text-[11px] mb-0.5"><span className="text-muted-foreground">{l}</span><span className="font-mono">{v}</span></div>
                <div className="h-1 rounded-full bg-white/5"><div className="h-full bg-gradient-to-r from-ember to-flame rounded-full" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
