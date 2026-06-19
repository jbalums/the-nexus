import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Bell, CreditCard, Cpu, Globe, Key, Palette, Shield, Users } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — UTD Nexus" }] }),
  component: SettingsPage,
});

const groups = [
  { icon: Users, label: "Workspace", desc: "Members, roles, invitations" },
  { icon: Shield, label: "Security", desc: "Passkeys, SSO, audit log" },
  { icon: Key, label: "API & Tokens", desc: "Programmatic access" },
  { icon: Cpu, label: "Models", desc: "Defaults & routing" },
  { icon: Bell, label: "Notifications", desc: "Alerts & escalation" },
  { icon: CreditCard, label: "Billing", desc: "Plan & usage" },
  { icon: Palette, label: "Appearance", desc: "Theme, density" },
  { icon: Globe, label: "Regions", desc: "Residency & latency" },
];

function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="System Preferences" title="Tune your operating system" description="Configure every layer of UTD Nexus — from inference fabric down to keyboard shortcuts." />

      <div className="px-8 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-1">
          {groups.map((g, i) => (
            <button key={g.label} className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${i === 0 ? "bg-white/[0.05] border border-white/10" : "hover:bg-white/[0.03]"}`}>
              <g.icon className={`h-4 w-4 ${i === 0 ? "text-ember" : "text-muted-foreground"}`} />
              <div className="min-w-0">
                <div className="text-sm font-medium">{g.label}</div>
                <div className="text-[10px] text-muted-foreground truncate">{g.desc}</div>
              </div>
            </button>
          ))}
        </aside>

        <section className="space-y-5">
          <div className="panel p-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-ember mb-2">Workspace</div>
            <h2 className="text-lg font-semibold">Helix Labs</h2>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <Field label="Workspace name" value="Helix Labs" />
              <Field label="Slug" value="helix-labs" mono />
              <Field label="Primary region" value="us-ord-1" mono />
              <Field label="Time zone" value="America/Los_Angeles" />
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">Members</div>
                <div className="text-[11px] text-muted-foreground">12 humans · 6 agents · 3 service accounts</div>
              </div>
              <button className="h-9 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium ember-glow">Invite</button>
            </div>
            <div className="space-y-1.5">
              {[
                ["Alex Tan", "alex@helix.io", "Owner", "now"],
                ["Maya Okafor", "maya@helix.io", "Admin", "12m"],
                ["Jin Park", "jin@helix.io", "Operator", "1h"],
                ["Liv Sørensen", "liv@helix.io", "Viewer", "3d"],
              ].map(([n, e, r, t]) => (
                <div key={e} className="grid grid-cols-[1fr_1fr_120px_60px] items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-steel to-navy-elevated text-[10px] font-semibold flex items-center justify-center">{n.split(" ").map(s => s[0]).join("")}</div>
                    <span>{n}</span>
                  </div>
                  <span className="text-muted-foreground font-mono text-xs">{e}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md glass w-fit">{r}</span>
                  <span className="text-[11px] text-muted-foreground text-right">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="text-sm font-semibold mb-4">Autonomy guardrails</div>
            <div className="space-y-3">
              {[
                ["Allow agents to make production writes", true],
                ["Require human review for tier-0 services", true],
                ["Allow long-term memory consolidation", true],
                ["Allow cross-workspace tool sharing", false],
              ].map(([label, on]) => (
                <div key={label as string} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                  <span>{label}</span>
                  <div className={`h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-gradient-to-r from-ember to-flame" : "bg-white/10"}`}>
                    <div className={`h-4 w-4 rounded-full bg-white transition ${on ? "translate-x-4" : ""}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      <input defaultValue={value} className={`w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-ember/60 ${mono ? "font-mono" : ""}`} />
    </label>
  );
}
