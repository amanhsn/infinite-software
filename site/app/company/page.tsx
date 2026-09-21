import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Company",
  description: "A Canadian software house with a delivery team in Pakistan.",
  alternates: { canonical: "/company/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Company" }]}
      title="Company"
      lede="A Canadian software house with a delivery team in Pakistan."
      elsewhere={[{ label: "Team", href: "/company/team/" }, { label: "Careers", href: "/company/careers/" }]}
    />
  );
}
