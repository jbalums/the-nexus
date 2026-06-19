import { createFileRoute } from "@tanstack/react-router";
import { tools } from "@/lib/mock";
import { PageHeader } from "@/components/app-shell";
import { CheckCircle2, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/tools")({
  head: () => ({ meta: [{ title: "Tool Ecosystem — UTD Nexus" }] }),
  component: ToolsPage,
});

const categories = ["All", "Development", "Communication", "Knowledge", "Data", "Internal", "Payments", "Productivity", "Design", "Infrastructure"];

function ToolsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Tool Ecosystem"
        title="Everything your agents can touch"
        description="A live marketplace of capabilities. Connect tools once — every agent in your fleet inherits them with policy-controlled access."
        actions={<button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium ember-glow flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Add custom tool</button>}
      />

      <div className="px-8 py-6 flex items-center gap-2 overflow-x-auto">
        {categories.map((c, i) => (
          <button key={c} className={`h-8 px-3 rounded-md text-xs whitespace-nowrap ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}>{c}</button>
        ))}
      </div>

      <div className="px-8 pb-12 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tools.map((t, i) => (
          <div key={t.id} className="panel p-5 hover:border-ember/30 transition group animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy-elevated to-navy border border-white/10 flex items-center justify-center font-bold text-base">{t.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{t.name}</h3>
                  {t.connected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{t.category}</div>
              </div>
              <div className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${t.connected ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30" : "glass text-muted-foreground"}`}>
                {t.connected ? "Connected" : "Available"}
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              {t.category === "Development" && "Repository operations, PRs, issues, CI checks."}
              {t.category === "Communication" && "Channel messages, threads, DMs and rich blocks."}
              {t.category === "Knowledge" && "Pages, databases, structured documents and search."}
              {t.category === "Data" && "SQL queries, schema introspection, safe writes."}
              {t.category === "Internal" && "Dispatch routes, telemetry, fleet operations."}
              {t.category === "Payments" && "Charges, refunds, customer and product CRUD."}
              {t.category === "Productivity" && "Issues, projects, cycles, and sprint planning."}
              {t.category === "Design" && "Frames, components, comments and exports."}
              {t.category === "Infrastructure" && "EC2, Lambda, S3, RDS and CloudWatch."}
            </p>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Calls 24h</span>
              <span className="font-mono">{t.calls24h.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
