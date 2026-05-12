/*
  BEARTH Home — Operator Terminal layout.
  - Asymmetric hero with hero image, ticker bar already in shell.
  - Sub-brand grid (SIGNAL active, others as armed placeholders).
  - Cashflow loop diagram.
  - Vault teaser, channels, capture, FAQ.
*/
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight, Radio, Lock, Wrench, Layers3, Camera, Globe2, Mail } from "lucide-react";
import Module from "@/components/Module";
import EmailCapture from "@/components/EmailCapture";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663095701931/KKEf4HjxHjPetyAmfPGZS5/bearth_hero-8D9h5TKQncU4sRttcpZ2Dp.webp";
const VAULT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663095701931/KKEf4HjxHjPetyAmfPGZS5/bearth_vault-jq9a8UcaAeSfSTFtNN5HFH.webp";
const SIGNAL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663095701931/KKEf4HjxHjPetyAmfPGZS5/bearth_signal_module-CXZS9tLyTE5Ym5bJNSmXYi.webp";
const OPERATOR_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663095701931/KKEf4HjxHjPetyAmfPGZS5/bearth_operator_portrait-hK5xKJwhL69nGpJZoBguj7.webp";

const SUB_BRANDS = [
  { num: "01", name: "BEARTH SIGNAL", tag: "Connect & Amplify", desc: "Daily AI / operator signal → ready-to-deploy product.", href: "/signal", status: "LIVE", Icon: Radio, color: "#F5A623" },
  { num: "02", name: "BEARTH VAULT", tag: "Compounding Library", desc: "Every drop, archived. Operators only.", href: "/vault", status: "ARMED", Icon: Lock, color: "#E94560" },
  { num: "03", name: "BEARTH TOOLS", tag: "Equip & Empower", desc: "Operator tools. Public when battle-tested.", href: "/tools", status: "IDLE", Icon: Wrench, color: "#E94560" },
  { num: "04", name: "BEARTH SYSTEMS", tag: "Organize & Optimize", desc: "Playbooks, automations, control sheets.", href: "/systems", status: "IDLE", Icon: Layers3, color: "#22D3EE" },
  { num: "05", name: "BEARTH STUDIO", tag: "Create & Inspire", desc: "Brand, video, sound, story.", href: "/studio", status: "IDLE", Icon: Camera, color: "#A78BFA" },
];

const LOOP = [
  { step: "01", title: "Signal in", text: "Find one structural AI / operator signal in <30 min." },
  { step: "02", title: "Translate", text: "Cut it into a 3-act briefing + ROI for solo operators." },
  { step: "03", title: "Productize", text: "Wrap the playbook into a $49 Gumroad drop." },
  { step: "04", title: "Distribute", text: "YouTube long, TikTok / Reels / Shorts, ManyChat DM." },
  { step: "05", title: "Capture", text: "Email list grows. Vault grows. Cashflow compounds." },
];

const FAQ = [
  {
    q: "What exactly is BEARTH?",
    a: "BEARTH is the master brand. Five sub-brands (SIGNAL, TOOLS, SYSTEMS, STUDIO, plus the BEARTH Vault) sit underneath. Today, only BEARTH SIGNAL is live — that is the active cashflow arm.",
  },
  {
    q: "Who is this for?",
    a: "Solo operators, freelancers and digital nomads who want today’s AI / remote-work shift translated into one move they can ship today — not next quarter.",
  },
  {
    q: "What does it cost?",
    a: "Free briefing on YouTube + free email signal. Daily Gumroad drops at $49. The BEARTH Vault is the compounding archive of every drop.",
  },
  {
    q: "Why dark and operator-style?",
    a: "Because the brand is built for builders, not for audiences. No coach talk, no vibes. Information density first.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 op-grid-bg opacity-60" aria-hidden />
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E] via-[#1A1A2E]/70 to-transparent" aria-hidden />
        <div className="relative container py-20 md:py-32 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="op-badge op-badge-red">
                <span className="op-pulse" aria-hidden /> Signal Live
              </span>
              <span className="op-badge op-badge-mute">v1.0 · Operator Terminal</span>
            </div>
            <h1 className="display-xl text-white text-5xl sm:text-7xl md:text-8xl">
              Be Earth.<br />
              <span className="text-[#F5A623]">Stay Grounded.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-white/80 text-lg md:text-xl leading-relaxed">
              <span className="text-white">BEARTH</span> is the operator-grade home for solo builders, freelancers and digital nomads.{" "}
              <span className="text-[#F5A623]">BEARTH SIGNAL</span> turns one current AI / remote-work signal — every day — into one
              ready-to-deploy product, one briefing, one move you can ship before lunch.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signal"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#E94560] text-white font-mono text-[12px] tracking-[0.22em] uppercase btn-press hover:bg-[#ff5e7a]"
              >
                <span className="op-pulse" aria-hidden /> Open BEARTH SIGNAL <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="https://gumroad.com/bearthsignal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#F5A623] text-[#F5A623] font-mono text-[12px] tracking-[0.22em] uppercase btn-press hover:bg-[#F5A623] hover:text-[#1A1A2E]"
              >
                Today’s $49 Drop <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
              {[
                { k: "Daily", v: "1 Signal" },
                { k: "Drop", v: "$49" },
                { k: "Vault", v: "All in" },
                { k: "Stack", v: "5 Brands" },
              ].map((s) => (
                <div key={s.k} className="border border-border bg-[#12121F]/70 p-4">
                  <div className="font-mono text-[10px] tracking-[0.22em] text-white/50">{s.k.toUpperCase()}</div>
                  <div className="font-display text-2xl font-bold text-[#F5A623] mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 00 — BRAND SYSTEM */}
      <Module num="00" label="Brand System" status="ARMED" kicker="Master brand · 5 arms" title="One brand. Five operating modes. One active cashflow arm.">
        <div className="grid grid-cols-12 gap-4">
          {SUB_BRANDS.map((b) => (
            <Link
              key={b.num}
              href={b.href}
              className="col-span-12 sm:col-span-6 lg:col-span-4 group relative border border-border bg-[#12121F]/70 p-6 hover:border-[#F5A623] btn-press"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="module-num">{b.num}</span>
                <span className={b.status === "LIVE" ? "op-badge op-badge-red" : b.status === "ARMED" ? "op-badge" : "op-badge op-badge-mute"}>
                  {b.status === "LIVE" && <span className="op-pulse" aria-hidden />} {b.status}
                </span>
              </div>
              <b.Icon className="w-8 h-8 mb-4" style={{ color: b.color }} />
              <h3 className="font-display text-2xl font-bold text-white">{b.name}</h3>
              <div className="font-mono text-[10px] tracking-[0.22em] text-white/50 mt-1">{b.tag.toUpperCase()}</div>
              <p className="text-white/70 text-sm mt-4">{b.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#F5A623] group-hover:text-white">
                Enter <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </Module>

      <div className="op-divider" />

      {/* MODULE 01 — SIGNAL */}
      <Module num="01" label="BEARTH SIGNAL" status="LIVE" kicker="Daily · Free briefing + $49 drop" title="One AI signal. One operator move. One drop. Every day.">
        <div className="grid grid-cols-12 gap-8 items-stretch">
          <div className="col-span-12 lg:col-span-7 space-y-5 text-white/80 leading-relaxed">
            <p>
              Most creators repackage hype. <span className="text-white">BEARTH SIGNAL</span> tracks the structural shifts in AI,
              automation and remote-work that actually change a freelancer’s P&amp;L — and translates them into one move you can deploy
              the same day.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-2">
              {[
                "1 free briefing on YouTube",
                "1 free signal in your inbox",
                "1 ready-to-deploy $49 drop",
                "24h bypass code via DM (SIGNAL)",
                "All drops compound in the Vault",
                "Built on Android, in <2h/day",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 font-mono text-[12px] tracking-wide text-white/85">
                  <span className="mt-1 inline-block w-1.5 h-1.5 bg-[#F5A623] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/signal"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F5A623] text-[#1A1A2E] font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:bg-[#ffb842]"
              >
                See the System <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://www.youtube.com/@bearthsignal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-white font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:border-[#F5A623]"
              >
                Watch Today’s Briefing <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-square overflow-hidden border border-border">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={SIGNAL_IMG} alt="BEARTH SIGNAL daily module" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Module>

      <div className="op-divider" />

      {/* MODULE 02 — CASHFLOW LOOP */}
      <Module num="02" label="Cashflow Loop" status="ARMED" kicker="Production system" title="Signal → Briefing → Drop → Vault → Cash.">
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {LOOP.map((l) => (
            <li key={l.step} className="relative border border-border bg-[#12121F]/60 p-5">
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#F5A623]">{l.step}</span>
              <h4 className="font-display text-lg font-bold mt-2 text-white">{l.title}</h4>
              <p className="text-white/70 text-sm mt-2">{l.text}</p>
            </li>
          ))}
        </ol>
      </Module>

      <div className="op-divider" />

      {/* MODULE 03 — VAULT */}
      <section className="relative overflow-hidden border-y border-border bg-[#12121F]">
        <div className="container py-20 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={VAULT_IMG} alt="BEARTH Vault" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="module-num">MODULE 03</span>
              <span className="op-divider w-12" />
              <span className="module-num text-white/60">VAULT</span>
            </div>
            <h2 className="display-xl text-3xl sm:text-5xl text-white">The BEARTH Vault.</h2>
            <p className="text-white/80 mt-5 text-lg">
              Every daily drop, every prompt, every system — stacked. One subscription, one address, one armed library that compounds with every
              signal. Built for operators who want the whole arsenal, not single shots.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/vault"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E94560] text-white font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:bg-[#ff5e7a]"
              >
                Open the Vault <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://gumroad.com/bearthsignal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5A623] text-[#F5A623] font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:bg-[#F5A623] hover:text-[#1A1A2E]"
              >
                Browse Gumroad <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 04 — CAPTURE + CHANNELS */}
      <Module num="04" label="Channels & Capture" status="LIVE" kicker="Distribution stack" title="Catch the signal where you live." framed>
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-6">
            <h3 className="font-display text-2xl text-white mb-4">Drop your email. Get the daily signal.</h3>
            <p className="text-white/70 mb-6">
              No coach talk. No 9-step funnels. One signal a day, plus the Gumroad drop link before everyone else.
            </p>
            <EmailCapture cta="Get the Daily Signal" source="home_module04" />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { l: "YouTube · @bearthsignal", h: "https://www.youtube.com/@bearthsignal", k: "LONGFORM BRIEFING" },
                { l: "Instagram · @bearthsignal", h: "https://www.instagram.com/bearthsignal", k: "REELS · DM SIGNAL" },
                { l: "TikTok · @bearthsignal", h: "https://www.tiktok.com/@bearthsignal", k: "DAILY SHORTS" },
                { l: "Facebook · BEARTH SIGNAL", h: "https://www.facebook.com/bearthsignal", k: "DM SIGNAL" },
                { l: "Gumroad · /bearthsignal", h: "https://gumroad.com/bearthsignal", k: "$49 DAILY DROP" },
                { l: "X · @bearthsignal", h: "https://x.com/bearthsignal", k: "POST · PINNED THREAD" },
              ].map((c) => (
                <a
                  key={c.l}
                  href={c.h}
                  target="_blank"
                  rel="noreferrer"
                  className="group border border-border bg-[#0E0E1A] p-4 hover:border-[#F5A623] btn-press flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.22em] text-[#F5A623]">{c.k}</div>
                    <div className="text-white text-sm mt-1">{c.l}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#F5A623]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Module>

      <div className="op-divider" />

      {/* MODULE 05 — ABOUT TEASER */}
      <section className="relative overflow-hidden">
        <div className="container py-20 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-7">
            <span className="module-num">MODULE 05 — OPERATOR</span>
            <h2 className="display-xl text-3xl sm:text-5xl text-white mt-4">
              Built by Saimen. Basel ↔ Kenya. <span className="text-[#F5A623]">Handwerk meets AI.</span>
            </h2>
            <p className="text-white/80 mt-5 max-w-2xl">
              Carpenter, builder, bar operator, global nomad. BEARTH is the translation of that craftsman DNA into a 21st-century cashflow stack —
              powered by AI, run from a phone, shipped daily.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F5A623] hover:text-white">
                Read the operator brief <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[3/2] overflow-hidden border border-border">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={OPERATOR_IMG} alt="Solo operator at console" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 06 — FAQ */}
      <Module num="06" label="FAQ" status="ARMED" title="Operator FAQ.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ.map((f) => (
            <div key={f.q} className="border border-border bg-[#12121F]/60 p-6">
              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-lg font-bold text-white">{f.q}</h4>
                  <p className="text-white/75 text-sm mt-2 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Module>

      {/* MODULE 07 — FINAL CTA */}
      <section className="relative overflow-hidden border-t border-border bg-[#0E0E1A]">
        <div className="absolute inset-0 op-scanlines opacity-60" aria-hidden />
        <div className="relative container py-20 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 lg:col-span-7">
            <span className="op-badge op-badge-red">
              <span className="op-pulse" aria-hidden /> SIGNAL LIVE
            </span>
            <h2 className="display-xl text-4xl sm:text-6xl text-white mt-5">
              Don’t miss the next move. <span className="text-[#F5A623]">Lock the signal.</span>
            </h2>
            <p className="text-white/75 mt-5 max-w-2xl">
              Free email. One signal a day. Drops, codes, vault updates. Unsubscribe anytime — no funnels, no follow-up calls.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="border border-border bg-[#12121F]/80 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-[#F5A623]" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/60">SUBSCRIBE</span>
              </div>
              <EmailCapture variant="stack" source="home_final_cta" cta="Lock the signal" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
