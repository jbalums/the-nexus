import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Fingerprint, Github, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "UTD Nexus — The AI Operating System for Intelligent Work" }] }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="relative min-h-screen mesh-bg overflow-hidden">
      {/* Ambient visual */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-ember/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-steel/30 blur-3xl animate-float-slow" />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-ember to-flame ember-glow flex items-center justify-center">
            <span className="font-bold text-sm">N</span>
          </div>
          <div>
            <div className="text-sm font-semibold">UTD Nexus</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Agent Operating System</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground hidden md:flex items-center gap-6">
          <span>Platform</span><span>Agents</span><span>Workflows</span><span>Enterprise</span>
        </div>
        <div className="text-xs text-muted-foreground">v4.2 · Aurora</div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-10 pb-20 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        {/* Hero */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-orb" />
            Now boarding · Q4 Aurora release
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            The Agent OS for <br />
            <span className="ember-text">intelligent work.</span>
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-xl leading-relaxed">
            Orchestrate fleets of autonomous agents, knowledge systems, and workflows from a single command center.
            UTD Nexus is the connective tissue between your team and the machines that work alongside them.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/nexus" className="group inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-ember to-flame text-white text-sm font-medium ember-glow hover:opacity-95 transition">
              Enter Command Center
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition">
              Request a private demo
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["142", "Agents online"],
              ["38", "Workflows running"],
              ["99.98%", "Uptime"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-semibold tracking-tight">{v}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth panel */}
        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-ember/40 via-transparent to-steel/30 blur-xl opacity-60" />
          <div className="relative panel p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-ember">Secure Access</div>
                <div className="text-lg font-semibold mt-1">Sign in to your workspace</div>
              </div>
              <ShieldCheck className="h-5 w-5 text-steel" />
            </div>

            <div className="space-y-3">
              <label className="block">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">Workspace</div>
                <input defaultValue="helix-labs" className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-ember/60 transition" />
              </label>
              <label className="block">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">Email</div>
                <input defaultValue="alex@helix.io" className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-ember/60 transition" />
              </label>

              <Link to="/nexus" className="mt-2 w-full h-11 rounded-lg bg-gradient-to-r from-ember to-flame text-white text-sm font-medium flex items-center justify-center gap-2 ember-glow hover:opacity-95 transition">
                <Fingerprint className="h-4 w-4" /> Continue with Passkey
              </Link>

              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button className="w-full h-10 rounded-lg glass text-sm flex items-center justify-center gap-2 hover:bg-white/[0.06] transition">
                <Github className="h-4 w-4" /> Continue with SSO
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>SOC 2 · ISO 27001 · HIPAA</span>
              <span className="font-mono">node ord-1 · 12ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
