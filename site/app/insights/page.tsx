import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Insights",
  description: "What we have learned shipping this, written up when it is worth someone's time.",
  alternates: { canonical: "/insights/" },
};

export default function Page() {
  return (
    <ComingSoon
      trail={[{ label: "Insights" }]}
      title="Insights"
      lede="What we have learned shipping this, written up when it is worth someone's time."
      elsewhere={[{ label: "Services", href: "/services/" }, { label: "Start a conversation", href: "/contact/" }]}
    />
  );
}
