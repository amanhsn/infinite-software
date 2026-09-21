import { ogImage, size, contentType } from "@/lib/og";
import { industries, getIndustry } from "@/content/industries";

export { size, contentType };
export const alt = "Infinite";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  return ogImage({ eyebrow: "Industries", title: ind?.name ?? "Industries" });
}
