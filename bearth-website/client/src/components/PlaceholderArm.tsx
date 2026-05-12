/*
  PlaceholderArm — used for Tools, Systems, Studio (still IDLE / pre-launch).
  Honest copy: this arm is staged but not active.
*/
import Module from "@/components/Module";
import EmailCapture from "@/components/EmailCapture";
import { Construction } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Props {
  num: string;
  label: string;
  title: string;
  intro: string;
  bullets: string[];
  Icon: LucideIcon;
  source: string;
}

export default function PlaceholderArm({ num, label, title, intro, bullets, Icon, source }: Props) {
  return (
    <>
      <Module num={num} label={label} status="IDLE" kicker="Sub-brand · pre-launch" title={title}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-white/80 text-lg leading-relaxed">{intro}</p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-6">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 font-mono text-[12px] tracking-wide text-white/85">
                  <span className="mt-1 inline-block w-1.5 h-1.5 bg-[#F5A623] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 inline-flex items-center gap-2 op-badge op-badge-mute">
              <Construction className="w-3 h-3" /> Staged · launches after BEARTH SIGNAL is profitable
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="border border-border bg-[#12121F]/60 p-6">
              <Icon className="w-8 h-8 text-[#F5A623]" />
              <h3 className="font-display text-2xl text-white mt-4">Want this arm first?</h3>
              <p className="text-white/70 mt-2">Drop your email — first activations get hand-picked by Saimen.</p>
              <div className="mt-4">
                <EmailCapture cta="Tag me when it's live" source={source} />
              </div>
            </div>
          </div>
        </div>
      </Module>
    </>
  );
}
