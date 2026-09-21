import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How we handle personal data.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Privacy" }]}
      title="Privacy"
      lede="How we handle personal data."
      elsewhere={[]}
    />
  );
}
