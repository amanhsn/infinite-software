import { ogImage, size, contentType } from "@/lib/og";
import { serviceCategories, getCategory } from "@/content/services";

export { size, contentType };
/* Required by `output: export`: an ImageResponse route is a Route Handler,
   and a static export refuses to build one that has not declared itself
   static. Harmless on the server build, where it was already prerendered. */
export const dynamic = "force-static";
export const alt = "Infinite";

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  return ogImage({ eyebrow: "Services", title: cat?.title ?? "Services" });
}
