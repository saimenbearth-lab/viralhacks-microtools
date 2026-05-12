/*
  <Module> — operator-style section wrapper.
  Numbered, mono caps label, framed content area with optional corner ticks.
*/
import { ReactNode } from "react";

interface ModuleProps {
  num: string; // e.g. "00", "01"
  label: string; // e.g. "SIGNAL"
  title?: string;
  kicker?: string;
  status?: "LIVE" | "ARMED" | "IDLE";
  children: ReactNode;
  className?: string;
  framed?: boolean;
}

export default function Module({ num, label, title, kicker, status = "ARMED", children, className = "", framed = false }: ModuleProps) {
  return (
    <section className={`relative ${className}`}>
      <div className="container py-16 md:py-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="module-num">MODULE {num}</span>
            <span className="op-divider w-12 hidden sm:block" />
            <span className="module-num text-white/60">{label}</span>
          </div>
          <span
            className={
              status === "LIVE"
                ? "op-badge op-badge-red"
                : status === "IDLE"
                  ? "op-badge op-badge-mute"
                  : "op-badge"
            }
          >
            {status === "LIVE" && <span className="op-pulse" aria-hidden />}
            {status}
          </span>
        </div>

        {kicker && (
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#E94560] mb-3">{kicker}</p>
        )}
        {title && (
          <h2 className="display-xl text-white text-3xl sm:text-5xl md:text-6xl mb-8 max-w-4xl">{title}</h2>
        )}

        {framed ? (
          <div className="relative border border-border bg-[#12121F]/60 op-noise overflow-hidden">
            <span className="corner-tl" />
            <span className="corner-tr" />
            <span className="corner-bl" />
            <span className="corner-br" />
            <div className="p-6 md:p-10 relative">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
