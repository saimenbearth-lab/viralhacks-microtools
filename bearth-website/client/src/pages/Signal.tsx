/*
  /signal — the active monetizable arm.
  Explains the system, the daily loop, the trojan vault drop, the channels.
*/
import Module from "@/components/Module";
import EmailCapture from "@/components/EmailCapture";
import { ArrowUpRight, ArrowRight, Radio, ShoppingCart, Inbox, MessagesSquare, BarChart3 } from "lucide-react";

const FLOW = [
  { num: "01", t: "Research", d: "Perplexity Deep Research scans the last 24-48h. Pulls the strongest operator signal.", icon: Radio },
  { num: "02", t: "Briefing", d: "10-min YouTube longform. Hook, evidence, operator move. AI-disclosed, GEO-optimized.", icon: BarChart3 },
  { num: "03", t: "Drop", d: "Same signal → $49 Gumroad product. Ready-to-deploy SOP, prompts, templates.", icon: ShoppingCart },
  { num: "04", t: "DM Code", d: "Comment SIGNAL on IG / FB → ManyChat fires the 24h bypass code straight to DM.", icon: MessagesSquare },
  { num: "05", t: "Email", d: "Subscribers get the signal + the drop link before everyone else.", icon: Inbox },
];

const PRICE_TIERS = [
  { name: "Free Briefing", price: "$0", desc: "YouTube longform + free email signal.", cta: "Watch latest", href: "https://www.youtube.com/@bearthsignal", color: "border-border" },
  { name: "Daily Drop", price: "$49", desc: "Today’s ready-to-deploy product on Gumroad.", cta: "Open Gumroad", href: "https://gumroad.com/bearthsignal", color: "border-[#F5A623]", highlight: true },
  { name: "BEARTH Vault", price: "Lifetime", desc: "All drops, all prompts, all systems — stacked.", cta: "Open Vault", href: "/vault", color: "border-[#E94560]" },
];

export default function SignalPage() {
  return (
    <>
      <Module num="01" label="BEARTH SIGNAL" status="LIVE" kicker="Active cashflow arm" title="One signal a day. One ready-to-deploy product. Built in <2h, on a phone.">
        <p className="text-white/80 max-w-3xl text-lg leading-relaxed">
          BEARTH SIGNAL is the daily operator briefing for solo builders, freelancers and digital nomads. It tracks the structural shifts in
          AI, automation and remote-work — and converts each one into a 10-minute briefing, a Gumroad drop, a DM code, and a Vault asset. No
          coach talk. No 9-step funnels. Information, then a move, then a tool you can deploy today.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
          {FLOW.map((s) => (
            <div key={s.num} className="border border-border bg-[#12121F]/60 p-5">
              <div className="flex items-center justify-between">
                <span className="module-num">{s.num}</span>
                <s.icon className="w-4 h-4 text-[#F5A623]" />
              </div>
              <h4 className="font-display text-lg font-bold mt-3 text-white">{s.t}</h4>
              <p className="text-white/70 text-sm mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </Module>

      <div className="op-divider" />

      <Module num="02" label="Pricing" status="ARMED" kicker="Three doors" title="Pick your altitude.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICE_TIERS.map((p) => (
            <div key={p.name} className={`relative border ${p.color} bg-[#12121F]/60 p-6 flex flex-col`}>
              {p.highlight && (
                <span className="absolute -top-3 left-4 op-badge bg-[#1A1A2E]">DAILY DROP</span>
              )}
              <div className="font-mono text-[10px] tracking-[0.22em] text-white/60">{p.name.toUpperCase()}</div>
              <div className="font-display text-5xl font-bold mt-3 text-white">{p.price}</div>
              <p className="text-white/70 mt-3 flex-1">{p.desc}</p>
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5A623] text-[#F5A623] font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:bg-[#F5A623] hover:text-[#1A1A2E]"
              >
                {p.cta} <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] text-white/40 mt-4">
          Comment SIGNAL on Instagram or Facebook to receive a 24h 100%-bypass code on today’s drop via DM.
        </p>
      </Module>

      <div className="op-divider" />

      <Module num="03" label="Today" status="LIVE" kicker="Live drop · Updated daily" title="Today’s signal." framed>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-white/60 mb-2">EPISODE</div>
            <h3 className="font-display text-3xl text-white">Loading the latest BEARTH SIGNAL…</h3>
            <p className="text-white/70 mt-3">
              Today’s briefing, today’s product, today’s code — all live the moment the daily pipeline finishes. Catch it on YouTube and
              Gumroad, or get it pushed to your inbox.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.youtube.com/@bearthsignal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#F5A623] text-[#1A1A2E] font-mono text-[11px] tracking-[0.22em] uppercase btn-press"
              >
                Watch latest <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://gumroad.com/bearthsignal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 border border-[#E94560] text-[#E94560] font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:bg-[#E94560] hover:text-white"
              >
                Today’s Drop <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-white/60 mb-2">SUBSCRIBE</div>
            <EmailCapture cta="Push it to my inbox" source="signal_today" />
          </div>
        </div>
      </Module>
    </>
  );
}
