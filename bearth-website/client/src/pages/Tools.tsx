import PlaceholderArm from "@/components/PlaceholderArm";
import { Wrench } from "lucide-react";

export default function ToolsPage() {
  return (
    <PlaceholderArm
      num="03"
      label="BEARTH TOOLS"
      title="Operator-grade tools. Public when battle-tested."
      intro="BEARTH TOOLS is the lab arm: micro-tools, prompt frameworks and small AI utilities. They go public only after BEARTH SIGNAL pays for the runway."
      bullets={[
        "AI micro-tools for solo operators",
        "Prompt packs (Genspark / Perplexity / GPT-5)",
        "Voice-clone & avatar pipelines (HeyGen)",
        "Lightweight calculators and decision sheets",
        "First public release: post BEARTH SIGNAL profitability",
        "Phase: pre-launch / staged",
      ]}
      Icon={Wrench}
      source="tools_waitlist"
    />
  );
}
