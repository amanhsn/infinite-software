import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies with real numbers, published without a form in front of them.",
  alternates: { canonical: "/work/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Work" }]}
      title="Work"
      lede="Case studies with real numbers, published without a form in front of them."
      elsewhere={[{ label: "Services", href: "/services/" }, { label: "Industries", href: "/industries/" }]}
    />
  );
}
