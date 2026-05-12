/*
  Operator Terminal SiteShell.
  - Top live ticker (mono, gold) with pulse dot
  - Header with nav (mono caps)
  - Mobile menu via shadcn Sheet
  - Footer with legal + email capture mini block
*/
import { ReactNode, useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "Signal", href: "/signal", num: "01" },
  { label: "Vault", href: "/vault", num: "02" },
  { label: "Tools", href: "/tools", num: "03" },
  { label: "Systems", href: "/systems", num: "04" },
  { label: "Studio", href: "/studio", num: "05" },
  { label: "About", href: "/about", num: "06" },
  { label: "Contact", href: "/contact", num: "07" },
];

function todayUTC() {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi} UTC`;
}

function Ticker() {
  const [now, setNow] = useState(todayUTC());
  useEffect(() => {
    const t = setInterval(() => setNow(todayUTC()), 30_000);
    return () => clearInterval(t);
  }, []);
  const items = useMemo(
    () => [
      `SIGNAL // LIVE // ${now}`,
      "TODAY: ONE AI SIGNAL → ONE READY-TO-DEPLOY PRODUCT",
      "VAULT: STACKING DAILY DROPS",
      "GUMROAD DROP $49 // 24H BYPASS CODE",
      "BEARTH // BE EARTH // STAY GROUNDED",
      "FREE BRIEFING ON YOUTUBE @bearthsignal",
      `SIGNAL // LIVE // ${now}`,
      "TODAY: ONE AI SIGNAL → ONE READY-TO-DEPLOY PRODUCT",
      "VAULT: STACKING DAILY DROPS",
      "GUMROAD DROP $49 // 24H BYPASS CODE",
      "BEARTH // BE EARTH // STAY GROUNDED",
      "FREE BRIEFING ON YOUTUBE @bearthsignal",
    ],
    [now],
  );

  return (
    <div className="border-b border-border bg-[#12121F] text-[#F5A623]">
      <div className="overflow-hidden relative">
        <div className="flex items-center gap-3 px-4 py-2">
          <span className="op-pulse shrink-0" aria-hidden />
          <div className="overflow-hidden flex-1">
            <div className="ticker font-mono text-[11px] tracking-widest">
              {items.map((t, i) => (
                <span key={i} className="opacity-90">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ label, href, num, onNavigate }: { label: string; href: string; num: string; onNavigate?: () => void }) {
  const [loc] = useLocation();
  const active = loc === href || (href !== "/" && loc.startsWith(href));
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-150 ${
        active ? "text-[#F5A623]" : "text-white/70 hover:text-white"
      }`}
    >
      <span className="text-white/30 group-hover:text-[#F5A623]">{num}</span>
      <span>{label}</span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#1A1A2E]/80 bg-[#1A1A2E] border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-block w-8 h-8 rounded-sm bg-[#1A1A2E] border border-[#F5A623]/40 grid place-items-center">
            <svg viewBox="0 0 64 64" className="w-5 h-5">
              <circle cx="32" cy="32" r="18" fill="none" stroke="#F5A623" strokeWidth="2.5" />
              <ellipse cx="32" cy="32" rx="18" ry="7" fill="none" stroke="#F5A623" strokeWidth="1.5" />
              <line x1="14" y1="32" x2="50" y2="32" stroke="#F5A623" strokeWidth="1.5" />
              <line x1="32" y1="14" x2="32" y2="50" stroke="#F5A623" strokeWidth="1.5" />
              <circle cx="46" cy="22" r="3" fill="#E94560" />
            </svg>
          </span>
          <div className="leading-none">
            <div className="font-display font-bold text-[#F5A623] text-lg tracking-tight">BEARTH</div>
            <div className="font-mono text-[9px] tracking-[0.22em] text-white/60 mt-0.5">BE EARTH · STAY GROUNDED</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink key={n.href} {...n} />
          ))}
        </nav>

        <Link
          href="/signal"
          className="hidden md:inline-flex items-center gap-2 px-3 py-2 border border-[#E94560] text-[#E94560] font-mono text-[11px] tracking-[0.18em] uppercase btn-press hover:bg-[#E94560] hover:text-white"
        >
          <span className="op-pulse" aria-hidden />
          Today’s Signal
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-border text-white/80"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#1A1A2E] border-border p-0 w-[88%] sm:w-[420px]">
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#F5A623]">MENU</span>
              <button onClick={() => setOpen(false)} className="text-white/70" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-5">
              {NAV.map((n) => (
                <NavLink key={n.href} {...n} onNavigate={() => setOpen(false)} />
              ))}
              <Link
                href="/signal"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#E94560] text-[#E94560] font-mono text-[11px] tracking-[0.18em] uppercase btn-press"
              >
                <span className="op-pulse" aria-hidden />
                Today’s Signal
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function FooterEmail() {
  // Static MailerLite-ready form. Action is wired to a placeholder; the
  // real action URL gets pasted in once Saimen connects MailerLite.
  return (
    <form
      action="https://assets.mailerlite.com/jsonp/REPLACE_ACCOUNT/forms/REPLACE_FORM/subscribe"
      method="post"
      className="flex flex-col sm:flex-row gap-2"
    >
      <input
        type="email"
        name="fields[email]"
        required
        placeholder="you@operator.email"
        className="flex-1 bg-[#12121F] border border-border px-3 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5A623]"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-[#F5A623] text-[#1A1A2E] font-mono text-[11px] tracking-[0.2em] uppercase btn-press hover:bg-[#ffb842]"
      >
        Get Daily Signal
      </button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-[#12121F]">
      <div className="container py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-display text-2xl font-bold text-[#F5A623]">BEARTH</div>
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/60 mt-1">BE EARTH · STAY GROUNDED</div>
          <p className="text-white/70 text-sm mt-5 max-w-sm">
            Operator-grade home for solo builders, freelancers and digital nomads. One signal a day. One ready-to-deploy product.
          </p>
          <div className="mt-6">
            <div className="font-mono text-[10px] tracking-[0.22em] text-white/50 mb-2">DAILY SIGNAL · FREE</div>
            <FooterEmail />
            <p className="font-mono text-[10px] text-white/40 mt-2">No spam. No coach talk. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/50 mb-3">NAVIGATE</div>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/80 hover:text-[#F5A623]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/50 mb-3">CHANNELS</div>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.youtube.com/@bearthsignal" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#F5A623]">YouTube · @bearthsignal</a></li>
            <li><a href="https://www.instagram.com/bearthsignal" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#F5A623]">Instagram · @bearthsignal</a></li>
            <li><a href="https://www.tiktok.com/@bearthsignal" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#F5A623]">TikTok · @bearthsignal</a></li>
            <li><a href="https://www.facebook.com/bearthsignal" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#F5A623]">Facebook · BEARTH SIGNAL</a></li>
            <li><a href="https://gumroad.com/bearthsignal" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#F5A623]">Gumroad · gumroad.com/bearthsignal</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/50 mb-3">LEGAL</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal/imprint" className="text-white/80 hover:text-[#F5A623]">Imprint</Link></li>
            <li><Link href="/legal/privacy" className="text-white/80 hover:text-[#F5A623]">Privacy</Link></li>
            <li><Link href="/legal/terms" className="text-white/80 hover:text-[#F5A623]">Terms</Link></li>
            <li><a href="mailto:saimen@bearth.io" className="text-white/80 hover:text-[#F5A623]">saimen@bearth.io</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/40">
            © {new Date().getFullYear()} BEARTH · SAIMEN BEARTH · BASEL / KENYA
          </div>
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/40">v1.0 · OPERATOR TERMINAL</div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A2E] text-white">
      <Ticker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
