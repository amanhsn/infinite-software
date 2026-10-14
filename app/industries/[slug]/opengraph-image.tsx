import { ogImage, size, contentType } from "@/lib/og";
import { industries, getIndustry } from "@/content/industries";

export { size, contentType };
/* Required by `output: export`: an ImageResponse route is a Route Handler,
   and a static export refuses to build one that has not declared itself
   static. Harmless on the server build, where it was already prerendered. */
export const dynamic = "force-static";
export const alt = "Infinite";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  return ogImage({ eyebrow: "Industries", title: ind?.name ?? "Industries" });
}
