import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Team",
  description: "The engineers you would actually work with, named.",
  alternates: { canonical: "/company/team/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Company", href: "/company/" }, { label: "Team" }]}
      title="Team"
      lede="The engineers you would actually work with, named."
      elsewhere={[{ label: "Careers", href: "/company/careers/" }]}
    />
  );
}
