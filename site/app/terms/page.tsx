import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return <LegalPage doc={terms} trail={[{ label: terms.title }]} />;
}
