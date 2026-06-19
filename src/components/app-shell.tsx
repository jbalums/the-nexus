import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Bot, Sparkles, MessageSquare, Workflow, BookOpen,
  Plug, Activity, BarChart3, Settings, Command, Search, Bell, Plus
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/nexus", label: "Command Center", icon: LayoutDashboard, section: "Operate" },
  { to: "/agents", label: "Agent Universe", icon: Bot, section: "Operate" },
  { to: "/studio", label: "Agent Studio", icon: Sparkles, section: "Build" },
  { to: "/chat", label: "Agent Chat", icon: MessageSquare, section: "Build" },
  { to: "/workflows", label: "Workflow Canvas", icon: Workflow, section: "Build" },
  { to: "/knowledge", label: "Knowledge", icon: BookOpen, section: "Intelligence" },
  { to: "/tools", label: "Tool Ecosystem", icon: Plug, section: "Intelligence" },
  { to: "/runs", label: "Run Inspector", icon: Activity, section: "Observe" },
  { to: "/analytics", label: "Analytics", icon: BarChart3, section: "Observe" },
  { to: "/settings", label: "Settings", icon: Settings, section: "System" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sections = Array.from(new Set(nav.map((n) => n.section)));

  return (
    <div className="flex min-h-screen w-full mesh-bg text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/5 bg-navy-deep/60 backdrop-blur-xl">
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-ember to-flame ember-glow flex items-center justify-center">
            <div className="absolute inset-1 rounded-lg bg-navy-deep/40" />
            <span className="relative font-bold text-sm">N</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">UTD Nexus</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Agent OS · v4.2</div>
          </div>
        </div>

        <div className="px-3 mt-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg glass text-muted-foreground hover:text-foreground transition">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search Nexus…</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">⌘K</kbd>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {sections.map((section) => (
            <div key={section}>
              <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">{section}</div>
              <ul className="space-y-0.5">
                {nav.filter((n) => n.section === section).map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          active
                            ? "bg-gradient-to-r from-ember/20 to-transparent text-foreground border border-ember/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${active ? "text-ember" : ""}`} />
                        <span className="flex-1">{item.label}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-orb" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-steel to-navy-elevated flex items-center justify-center text-xs font-semibold">AT</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">Alex Tan</div>
              <div className="text-[10px] text-muted-foreground truncate">Workspace · Helix Labs</div>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-orb" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-14 border-b border-white/5 bg-navy-deep/70 backdrop-blur-xl flex items-center px-5 gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Command className="h-3.5 w-3.5 text-ember" />
            <span className="font-mono">nexus://workspace/helix-labs</span>
          </div>
          <div className="flex-1" />
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-muted-foreground mr-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-orb" />
            All systems nominal · 99.98% uptime
          </div>
          <button className="h-8 w-8 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          <button className="h-8 px-3 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-xs font-medium flex items-center gap-1.5 ember-glow hover:opacity-90 transition">
            <Plus className="h-3.5 w-3.5" /> New Agent
          </button>
        </header>
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: {
  eyebrow?: string; title: string; description?: string; actions?: ReactNode;
}) {
  return (
    <div className="px-8 pt-8 pb-6 flex items-end justify-between gap-6 border-b border-white/5">
      <div>
        {eyebrow && <div className="text-[10px] uppercase tracking-[0.25em] text-ember mb-2">{eyebrow}</div>}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatusOrb({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400/60",
    idle: "bg-steel",
    training: "bg-flame animate-pulse-orb",
    running: "bg-ember animate-pulse-orb shadow-[0_0_12px] shadow-ember/60",
    scheduled: "bg-steel",
  };
  return <span className={`h-2 w-2 rounded-full ${colors[status] ?? "bg-muted-foreground"}`} />;
}
