import { ogImage, size, contentType } from "@/lib/og";

/* Required by `output: export`: an ImageResponse route is a Route Handler,
   and a static export refuses to build one that has not declared itself
   static. Harmless on the server build, where it was already prerendered. */
export const dynamic = "force-static";
export const alt = "Infinite — Design. Develop. Refine.";
export { size, contentType };

export default function Image() {
  return ogImage({ title: "The team that scoped it is the team that ships it." });
}
