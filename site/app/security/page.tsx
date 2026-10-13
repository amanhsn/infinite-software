import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { security } from "@/content/legal";

export const metadata: Metadata = {
  title: security.title,
  description: security.description,
  alternates: { canonical: "/security/" },
};

export default function Page() {
  return <LegalPage doc={security} trail={[{ label: security.title }]} banner="/img/legal/security" />;
}
