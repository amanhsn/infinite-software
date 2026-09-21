import { ogImage, size, contentType } from "@/lib/og";
import { serviceCategories, getCategory } from "@/content/services";

export { size, contentType };
export const alt = "Infinite";

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  return ogImage({ eyebrow: "Services", title: cat?.title ?? "Services" });
}
