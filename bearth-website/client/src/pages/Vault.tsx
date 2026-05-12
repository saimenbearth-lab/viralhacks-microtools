/*
  /vault — compounding library teaser. Real catalog ships when first 7 drops exist.
*/
import Module from "@/components/Module";
import EmailCapture from "@/components/EmailCapture";
import { Lock, ArrowUpRight } from "lucide-react";

const SAMPLE = [
  { code: "EP_001", title: "AI Pilot Failure → Operator Salvage Pack", date: "Coming up" },
  { code: "EP_002", title: "Bossware Bypass · Async Workflow Kit", date: "Coming up" },
  { code: "EP_003", title: "Skill Commoditization · Premium Repositioning SOP", date: "Coming up" },
  { code: "EP_004", title: "Permanent Establishment Trap · Nomad Tax Sheet", date: "Coming up" },
];

export default function VaultPage() {
  return (
    <>
      <Module num="02" label="BEARTH VAULT" status="ARMED" kicker="Compounding library" title="Every signal. Every system. Stacked.">
        <p className="text-white/80 max-w-3xl text-lg leading-relaxed">
          The BEARTH Vault is the long-term archive of every BEARTH SIGNAL drop. One door. One growing arsenal. Today’s drop is tomorrow’s
          cornerstone — and Vault holders get it all without paying $49 per day.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border bg-[#12121F]/60 p-6">
            <Lock className="w-6 h-6 text-[#F5A623]" />
            <h4 className="font-display text-xl mt-4 text-white">Single key</h4>
            <p className="text-white/70 text-sm mt-2">One purchase. Every past + future drop. No subscription churn.</p>
          </div>
          <div className="border border-border bg-[#12121F]/60 p-6">
            <Lock className="w-6 h-6 text-[#F5A623]" />
            <h4 className="font-display text-xl mt-4 text-white">Operator-only</h4>
            <p className="text-white/70 text-sm mt-2">No coach material. Only deploy-ready prompts, SOPs, sheets and playbooks.</p>
          </div>
          <div className="border border-border bg-[#12121F]/60 p-6">
            <Lock className="w-6 h-6 text-[#F5A623]" />
            <h4 className="font-display text-xl mt-4 text-white">Compounding</h4>
            <p className="text-white/70 text-sm mt-2">Each daily drop pushes the Vault’s value forward. Early access = best price.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="https://gumroad.com/bearthsignal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#E94560] text-white font-mono text-[12px] tracking-[0.22em] uppercase btn-press hover:bg-[#ff5e7a]"
          >
            Open the Vault on Gumroad <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </Module>

      <div className="op-divider" />

      <Module num="02.1" label="Catalog Preview" status="ARMED" kicker="First 4 slots" title="Catalog (preview)." framed>
        <ul className="divide-y divide-border">
          {SAMPLE.map((s) => (
            <li key={s.code} className="grid grid-cols-12 items-center gap-4 py-4">
              <span className="col-span-3 sm:col-span-2 font-mono text-[11px] tracking-[0.22em] text-[#F5A623]">{s.code}</span>
              <span className="col-span-9 sm:col-span-8 text-white">{s.title}</span>
              <span className="col-span-12 sm:col-span-2 font-mono text-[10px] tracking-[0.22em] text-white/50 sm:text-right">{s.date.toUpperCase()}</span>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[10px] text-white/40 mt-6">
          Catalog populates as soon as the daily pipeline ships its first batch.
        </p>
      </Module>

      <div className="op-divider" />

      <Module num="02.2" label="Email Lock-In" status="LIVE" kicker="Vault waitlist" title="Lock the Vault price.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-white/80 text-lg">
            The Vault price climbs as the catalog grows. Drop your email to lock the founder price the day it opens.
          </p>
          <EmailCapture cta="Lock founder price" source="vault_waitlist" />
        </div>
      </Module>
    </>
  );
}
