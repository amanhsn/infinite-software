import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "How we work",
  description: "Design, develop, refine. Three phases, and what happens inside each of them.",
  alternates: { canonical: "/how-we-work/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "How we work" }]}
      title="How we work"
      lede="Design, develop, refine. Three phases, and what happens inside each of them."
      elsewhere={[{ label: "Engagement models", href: "/how-we-work/engagement-models/" }, { label: "Services", href: "/services/" }]}
    />
  );
}
