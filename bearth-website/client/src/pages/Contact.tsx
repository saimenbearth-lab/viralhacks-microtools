/*
  /contact — operator-friendly: clear "no calls / no coaching" disclaimer, email + DM channels, basic form.
*/
import Module from "@/components/Module";
import { Mail, Instagram, Youtube, Globe } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || message.length < 10) {
      toast.error("Drop a valid email and at least 10 chars.");
      return;
    }
    const subject = encodeURIComponent(`BEARTH contact · ${name || "no-name"}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:saimen@bearth.io?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <Module num="07" label="Contact" status="ARMED" kicker="Operator inbox" title="One door. One inbox. No calls.">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-white/80 text-lg leading-relaxed">
              BEARTH does not run consulting calls, coaching sessions or client services. The fastest path is asynchronous: drop a clear
              message, get a reply when one is due. For licensing, partnerships or press, write the same address with the right subject
              line.
            </p>

            <form onSubmit={onSubmit} className="mt-8 grid gap-3 max-w-xl">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-[#0E0E1A] border border-border px-4 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5A623]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@operator.email"
                className="bg-[#0E0E1A] border border-border px-4 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5A623]"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                placeholder="What’s the move?"
                className="bg-[#0E0E1A] border border-border px-4 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5A623] resize-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#F5A623] text-[#1A1A2E] font-mono text-[11px] tracking-[0.22em] uppercase btn-press hover:bg-[#ffb842]"
              >
                Send to saimen@bearth.io
              </button>
              <p className="font-mono text-[10px] text-white/40">
                Submit opens your default mail client. No data is stored on this site.
              </p>
            </form>
          </div>

          <div className="col-span-12 lg:col-span-5 grid gap-3">
            {[
              { Icon: Mail, l: "Email", v: "saimen@bearth.io", h: "mailto:saimen@bearth.io" },
              { Icon: Youtube, l: "YouTube", v: "@bearthsignal", h: "https://www.youtube.com/@bearthsignal" },
              { Icon: Instagram, l: "Instagram", v: "@bearthsignal", h: "https://www.instagram.com/bearthsignal" },
              { Icon: Globe, l: "Web", v: "bearth.io", h: "https://bearth.io" },
            ].map((c) => (
              <a
                key={c.l}
                href={c.h}
                target={c.h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="border border-border bg-[#12121F]/60 p-5 hover:border-[#F5A623] btn-press flex items-center gap-4"
              >
                <c.Icon className="w-6 h-6 text-[#F5A623]" />
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] text-white/60">{c.l.toUpperCase()}</div>
                  <div className="text-white">{c.v}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Module>
    </>
  );
}
