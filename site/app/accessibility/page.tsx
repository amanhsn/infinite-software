import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our accessibility commitment and how to report a barrier.",
  alternates: { canonical: "/accessibility/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Accessibility" }]}
      title="Accessibility"
      lede="Our accessibility commitment and how to report a barrier."
      elsewhere={[]}
    />
  );
}
