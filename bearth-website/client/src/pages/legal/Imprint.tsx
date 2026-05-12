/*
  Legal placeholder. Real entity details fill in once Saimen confirms business form.
*/
import Module from "@/components/Module";

export default function ImprintPage() {
  return (
    <Module num="L1" label="Imprint" status="IDLE" kicker="Section 5 TMG / Art. 13 Swiss DPA" title="Imprint.">
      <div className="prose prose-invert max-w-3xl">
        <p className="text-white/80">
          <strong>Operator:</strong> Saimen Bearth<br />
          <strong>Brand:</strong> BEARTH (master brand) · BEARTH SIGNAL (active arm)<br />
          <strong>Base:</strong> Basel, Switzerland · Kenya<br />
          <strong>Contact:</strong> <a className="text-[#F5A623]" href="mailto:saimen@bearth.io">saimen@bearth.io</a><br />
          <strong>Web:</strong> bearth.io
        </p>
        <p className="text-white/60 text-sm">
          This page is a placeholder. Final imprint details (legal entity, registration number, VAT ID, responsible person according to
          §55 RStV, EU online dispute resolution link) get filled in once the business form is finalized. Do not rely on this page for
          legal compliance until then.
        </p>
      </div>
    </Module>
  );
}
