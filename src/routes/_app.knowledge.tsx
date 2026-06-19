import { createFileRoute } from "@tanstack/react-router";
import { knowledgeBases } from "@/lib/mock";
import { PageHeader } from "@/components/app-shell";
import { FileText, Search, Sparkles, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Intelligence — UTD Nexus" }] }),
  component: Knowledge,
});

const recentDocs = [
  { name: "deploy-runbook-q4.md", kb: "Engineering Wiki", chunks: 42, accessed: "2m ago" },
  { name: "pricing-model-2026.pdf", kb: "Product Specs", chunks: 18, accessed: "11m ago" },
  { name: "msa-acme-corp.pdf", kb: "Customer Contracts", chunks: 96, accessed: "1h ago" },
  { name: "brand-tone-v3.md", kb: "Brand Guidelines", chunks: 12, accessed: "3h ago" },
  { name: "transformer-survey.pdf", kb: "Research Papers", chunks: 204, accessed: "6h ago" },
];

function Knowledge() {
  return (
    <div>
      <PageHeader
        eyebrow="Knowledge Intelligence"
        title="Living memory for your fleet"
        description="A semantic operating system for everything your agents know. Connect sources, watch retrievals in real time, and trace every answer back to its source."
        actions={
          <>
            <button className="h-9 px-3 rounded-lg glass text-xs flex items-center gap-1.5"><Upload className="h-3.5 w-3.5" /> Ingest source</button>
            <button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium ember-glow">+ New Knowledge Base</button>
          </>
        }
      />

      <div className="px-8 py-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {/* Search */}
          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-ember mb-2 flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Semantic search</div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-black/30 border border-white/10">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input defaultValue="how do we roll back a failed payment deploy?" className="flex-1 bg-transparent text-sm focus:outline-none" />
              <kbd className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10">⌘↵</kbd>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { f: "rollback-runbook.md", s: 0.94, snippet: "For payments-api, the canonical rollback path uses the `revert-to-stable` job…" },
                { f: "postmortem-2024-q3.md", s: 0.89, snippet: "Rollback latency exceeded SLO during incident #2104 because of stale migration locks…" },
                { f: "deploy-slo.md", s: 0.82, snippet: "Rollback must complete within 3 minutes for tier-0 services…" },
              ].map((r) => (
                <div key={r.f} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-ember/30 transition">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono">{r.f}</span>
                    <span className="text-ember font-mono">{r.s}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{r.snippet}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KB grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {knowledgeBases.map((k) => (
              <div key={k.id} className="panel p-5 hover:border-ember/30 transition group">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">{k.name}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{k.docs} documents · {k.vectors} vectors</div>
                  </div>
                  <div className="text-[10px] px-2 py-0.5 rounded-md glass">freshness {k.freshness}%</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Retrievals</div>
                    <div className="font-mono text-sm mt-0.5">{k.retrievals.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Docs</div>
                    <div className="font-mono text-sm mt-0.5">{k.docs}</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Vectors</div>
                    <div className="font-mono text-sm mt-0.5">{k.vectors}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Retrieval & relationships */}
        <aside className="space-y-4">
          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Knowledge graph</div>
            <svg viewBox="0 0 300 220" className="w-full">
              {[
                { x: 150, y: 110, r: 28, l: "Wiki" },
                { x: 60, y: 60, r: 18, l: "Specs" },
                { x: 240, y: 60, r: 16, l: "Brand" },
                { x: 70, y: 170, r: 22, l: "Contracts" },
                { x: 230, y: 180, r: 24, l: "Research" },
              ].map((n, i) => (
                <g key={i}>
                  <line x1={150} y1={110} x2={n.x} y2={n.y} stroke="oklch(0.68 0.19 38 / 0.3)" strokeWidth="1" />
                  <circle cx={n.x} cy={n.y} r={n.r} fill="oklch(0.28 0.05 250)" stroke="oklch(0.68 0.19 38 / 0.6)" />
                  <text x={n.x} y={n.y + 3} textAnchor="middle" className="fill-white text-[9px] font-mono">{n.l}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="panel p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Recent retrievals</div>
            <div className="space-y-2.5">
              {recentDocs.map((d) => (
                <div key={d.name} className="flex items-start gap-2.5 text-xs">
                  <FileText className="h-3.5 w-3.5 mt-0.5 text-steel shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono truncate">{d.name}</div>
                    <div className="text-[10px] text-muted-foreground">{d.kb} · {d.chunks} chunks · {d.accessed}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
