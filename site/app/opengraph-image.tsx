import { ogImage, size, contentType } from "@/lib/og";

export const alt = "Infinite — Design. Develop. Refine.";
export { size, contentType };

export default function Image() {
  return ogImage({ title: "The team that scoped it is the team that ships it." });
}
