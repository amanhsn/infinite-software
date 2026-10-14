import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return <LegalPage doc={privacy} trail={[{ label: privacy.title }]} banner="/img/legal/privacy" />;
}
