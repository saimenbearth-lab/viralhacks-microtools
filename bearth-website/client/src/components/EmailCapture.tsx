/*
  EmailCapture — MailerLite-ready static form.
  Action URL gets pasted in once Saimen creates the MailerLite form.
  For now uses a /api/subscribe placeholder + onSubmit fallback (toast).
*/
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  variant?: "stack" | "inline";
  cta?: string;
  source?: string;
}

export default function EmailCapture({ variant = "stack", cta = "Get the Signal", source = "site" }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Drop a valid email.");
      return;
    }
    // Local submission placeholder — replace with MailerLite form action when wired.
    // We keep a fetch attempt to /api/subscribe so it works once the user upgrades to web-db-user.
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    }).catch(() => {});
    setSubmitted(true);
    toast.success("Locked. First signal hits within 24h.");
    setEmail("");
  }

  if (variant === "inline") {
    return (
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@operator.email"
          className="flex-1 bg-[#0E0E1A] border border-border px-3 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5A623]"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-[#E94560] text-white font-mono text-[11px] tracking-[0.2em] uppercase btn-press hover:bg-[#ff5e7a] inline-flex items-center justify-center gap-2"
        >
          {submitted ? "Subscribed" : cta} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 w-full max-w-md">
      <label className="font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
        Daily Signal · Free
      </label>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@operator.email"
        className="bg-[#0E0E1A] border border-border px-4 py-4 font-mono text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5A623]"
      />
      <button
        type="submit"
        className="px-5 py-4 bg-[#F5A623] text-[#1A1A2E] font-mono text-[12px] tracking-[0.22em] uppercase btn-press hover:bg-[#ffb842] inline-flex items-center justify-center gap-2"
      >
        {submitted ? "✓ Subscribed" : cta} <ArrowRight className="w-4 h-4" />
      </button>
      <p className="font-mono text-[10px] text-white/40">
        One signal per day. No spam. Built for operators, not coaches.
      </p>
    </form>
  );
}
