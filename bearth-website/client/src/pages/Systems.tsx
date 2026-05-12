import PlaceholderArm from "@/components/PlaceholderArm";
import { Layers3 } from "lucide-react";

export default function SystemsPage() {
  return (
    <PlaceholderArm
      num="04"
      label="BEARTH SYSTEMS"
      title="Playbooks. Automations. Operator OS."
      intro="BEARTH SYSTEMS turns the daily production stack — research, scripting, video, drop, distribution — into reproducible playbooks others can clone."
      bullets={[
        "Make.com / n8n templates",
        "Notion + Google Sheets control rooms",
        "Daily 2-hour production SOPs",
        "ManyChat & email automations",
        "First public drop: SIGNAL Studio Stack",
        "Phase: pre-launch / staged",
      ]}
      Icon={Layers3}
      source="systems_waitlist"
    />
  );
}
