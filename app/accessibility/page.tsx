import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { accessibility } from "@/content/legal";

export const metadata: Metadata = {
  title: accessibility.title,
  description: accessibility.description,
  alternates: { canonical: "/accessibility/" },
};

export default function Page() {
  return <LegalPage doc={accessibility} trail={[{ label: accessibility.title }]} banner="/img/legal/accessibility" />;
}
