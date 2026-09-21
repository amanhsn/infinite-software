import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Locations",
  description: "Canadian head office, Pakistan delivery office.",
  alternates: { canonical: "/company/locations/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Company", href: "/company/" }, { label: "Locations" }]}
      title="Locations"
      lede="Canadian head office, Pakistan delivery office."
      elsewhere={[{ label: "Contact", href: "/contact/" }]}
    />
  );
}
