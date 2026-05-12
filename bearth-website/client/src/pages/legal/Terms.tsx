import Module from "@/components/Module";

export default function TermsPage() {
  return (
    <Module num="L3" label="Terms" status="IDLE" kicker="Use of bearth.io" title="Terms.">
      <div className="prose prose-invert max-w-3xl space-y-4">
        <p className="text-white/80">
          By using bearth.io, the BEARTH SIGNAL email list, the BEARTH Vault or any digital product purchased on Gumroad, you agree to the
          following terms.
        </p>
        <h3 className="text-white">Operator-grade output, not advice</h3>
        <p className="text-white/80">
          BEARTH SIGNAL provides operational frameworks, prompts and playbooks. It is not legal, tax, financial or medical advice. You stay
          responsible for what you ship.
        </p>
        <h3 className="text-white">Licensing</h3>
        <p className="text-white/80">
          All BEARTH content is © Saimen Bearth. You may use purchased products inside your own business. You may not resell, sublicense
          or repackage BEARTH products.
        </p>
        <h3 className="text-white">Refunds</h3>
        <p className="text-white/80">
          Daily Gumroad drops follow Gumroad’s policy. Vault access is non-refundable once delivered, since each Vault drop is digital and
          immediately accessible.
        </p>
        <p className="text-white/50 text-sm">
          Placeholder copy — final, lawyer-checked terms ship before public DACH launch.
        </p>
      </div>
    </Module>
  );
}
