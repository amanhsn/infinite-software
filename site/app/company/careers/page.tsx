import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles in Canada and Pakistan.",
  alternates: { canonical: "/company/careers/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Company", href: "/company/" }, { label: "Careers" }]}
      title="Careers"
      lede="Open roles in Canada and Pakistan."
      elsewhere={[{ label: "Company", href: "/company/" }]}
    />
  );
}
