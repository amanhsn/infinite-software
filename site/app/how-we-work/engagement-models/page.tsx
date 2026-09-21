import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Engagement models",
  description: "Dedicated squad, embedded engineers, or a fixed-scope build — and how we price each.",
  alternates: { canonical: "/how-we-work/engagement-models/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "How we work", href: "/how-we-work/" }, { label: "Engagement models" }]}
      title="Engagement models"
      lede="Dedicated squad, embedded engineers, or a fixed-scope build — and how we price each."
      elsewhere={[{ label: "How we work", href: "/how-we-work/" }, { label: "Start a conversation", href: "/contact/" }]}
    />
  );
}
