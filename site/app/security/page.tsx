import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Security & data residency",
  description: "Where client data lives, who can reach it, and the evidence a third-party risk review asks for.",
  alternates: { canonical: "/security/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Security" }]}
      title="Security & data residency"
      lede="Where client data lives, who can reach it, and the evidence a third-party risk review asks for."
      elsewhere={[{ label: "Contact", href: "/contact/" }]}
    />
  );
}
