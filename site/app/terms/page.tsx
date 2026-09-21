import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms that apply to this site.",
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Terms" }]}
      title="Terms"
      lede="The terms that apply to this site."
      elsewhere={[]}
    />
  );
}
