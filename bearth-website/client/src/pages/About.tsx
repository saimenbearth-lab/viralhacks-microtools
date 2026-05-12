/*
  /about — operator brief on Saimen + BEARTH master brand.
*/
import Module from "@/components/Module";
import { Globe2, Hammer, Cpu } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";

export default function AboutPage() {
  return (
    <>
      <Module num="06" label="Operator Brief" status="ARMED" kicker="Who runs BEARTH" title="Saimen Bearth. Basel ↔ Kenya. Handwerker meets AI.">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-5 text-white/85 text-lg leading-relaxed">
            <p>
              BEARTH is built by Saimen Bearth — carpenter, builder, bar operator, global nomade. The brand is the translation of that
              craftsman DNA into a 21st-century cashflow stack: powered by AI, run from a phone, shipped daily.
            </p>
            <p>
              No coaching, no calls, no client services. The operator stays inside the workshop. The output ships through YouTube, Gumroad
              and the BEARTH Vault. The audience is global: solo builders, freelancers and digital nomads who need today’s shift translated
              into one move they can deploy before lunch.
            </p>
            <p className="text-white">
              Goal: turn AI / remote-work signals into recurring, compounding cashflow — without ever leaving the operator seat.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-3">
            {[
              { Icon: Hammer, t: "Background", d: "Bau, Schreinerei, Bar-Operator. Hands-on craft." },
              { Icon: Globe2, t: "Geography", d: "Basel + Kenya base. Global nomade by default." },
              { Icon: Cpu, t: "Stack", d: "Android-only. Perplexity, HeyGen, CapCut, Genspark." },
            ].map((b) => (
              <div key={b.t} className="border border-border bg-[#12121F]/60 p-5">
                <b.Icon className="w-5 h-5 text-[#F5A623]" />
                <h4 className="font-display text-lg mt-3 text-white">{b.t}</h4>
                <p className="text-white/70 text-sm mt-1">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Module>

      <div className="op-divider" />

      <Module num="06.1" label="Brand System" status="ARMED" kicker="One brand. Five modes." title="The BEARTH brand stack." framed>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 space-y-3 text-white/80">
            <p>BEARTH is the master brand. Five operating modes share one identity, one voice and one colour palette.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 font-mono text-[12px] text-white/85">
              <li>01 · BEARTH SIGNAL — Connect &amp; Amplify</li>
              <li>02 · BEARTH VAULT — Stack &amp; Compound</li>
              <li>03 · BEARTH TOOLS — Equip &amp; Empower</li>
              <li>04 · BEARTH SYSTEMS — Organize &amp; Optimize</li>
              <li>05 · BEARTH STUDIO — Create &amp; Inspire</li>
            </ul>
            <div className="mt-6">
              <div className="font-mono text-[10px] tracking-[0.22em] text-white/60 mb-2">PALETTE</div>
              <div className="flex gap-3">
                {[
                  { c: "#1A1A2E", n: "Navy" },
                  { c: "#F5A623", n: "Gold" },
                  { c: "#E94560", n: "Signal Red" },
                  { c: "#FFFFFF", n: "White" },
                ].map((p) => (
                  <div key={p.c} className="text-center">
                    <div className="w-12 h-12 border border-border" style={{ background: p.c }} />
                    <div className="font-mono text-[9px] tracking-[0.18em] text-white/60 mt-1">{p.n.toUpperCase()}</div>
                    <div className="font-mono text-[9px] text-white/40">{p.c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="border border-border bg-[#0E0E1A] p-4 grid place-items-center">
              <img
                src="/manus-storage/bearth_brand_system_c170bb73.jpg"
                alt="BEARTH brand system overview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Module>

      <div className="op-divider" />

      <Module num="06.2" label="Subscribe" status="LIVE" kicker="Lock the signal" title="Ride along with the operator.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-white/80 text-lg">
            The fastest way to follow the build is the daily signal. Email is the only channel that survives platform changes.
          </p>
          <EmailCapture cta="Get the daily signal" source="about_page" />
        </div>
      </Module>
    </>
  );
}
