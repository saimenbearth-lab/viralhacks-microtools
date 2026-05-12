import Module from "@/components/Module";

export default function PrivacyPage() {
  return (
    <Module num="L2" label="Privacy" status="IDLE" kicker="GDPR / Swiss DPA" title="Privacy.">
      <div className="prose prose-invert max-w-3xl space-y-4">
        <p className="text-white/80">
          BEARTH collects the minimum data needed to deliver the daily SIGNAL: the email you submit and basic, anonymized analytics on which
          pages are viewed.
        </p>
        <h3 className="text-white">What we collect</h3>
        <ul className="text-white/80">
          <li>Your email address (only when you submit a form)</li>
          <li>Anonymous page views (Umami, no cookies, no IP storage)</li>
          <li>Optional: replies you send to saimen@bearth.io</li>
        </ul>
        <h3 className="text-white">Where it sits</h3>
        <ul className="text-white/80">
          <li>Email service: MailerLite (or Brevo) — EU servers</li>
          <li>Site hosting: Cloudflare Pages / EU edge</li>
          <li>Payments: Gumroad (separate processor, see their policy)</li>
        </ul>
        <h3 className="text-white">Your rights</h3>
        <p className="text-white/80">
          You can unsubscribe with one click on any email and request deletion at any time by writing to{" "}
          <a className="text-[#F5A623]" href="mailto:saimen@bearth.io">saimen@bearth.io</a>.
        </p>
        <p className="text-white/50 text-sm">
          Placeholder copy — final, lawyer-checked policy ships before public DACH launch.
        </p>
      </div>
    </Module>
  );
}
