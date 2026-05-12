import PlaceholderArm from "@/components/PlaceholderArm";
import { Camera } from "lucide-react";

export default function StudioPage() {
  return (
    <PlaceholderArm
      num="05"
      label="BEARTH STUDIO"
      title="Brand. Video. Sound. Story."
      intro="BEARTH STUDIO is the visual/identity arm: covers, thumbnails, sound design, brand templates. Service offerings open after the daily SIGNAL production hits 30 episodes."
      bullets={[
        "Brand identity systems",
        "Thumbnail templates (MrBeast logic)",
        "Short-form & long-form templates",
        "AI-avatar pipelines",
        "Audio / sound design kit",
        "Phase: pre-launch / staged",
      ]}
      Icon={Camera}
      source="studio_waitlist"
    />
  );
}
