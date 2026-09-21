import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PATH_BACK, PATH_FRONT, VIEW_BOX } from "@/lib/logo-geometry";
import { site } from "@/content/site";

/**
 * The shared Open Graph card.
 *
 * Ground is the frame mesh, which brand book §03 reserves for "logo frames,
 * app icons, social" — evenly lit, unlike the light mesh that rises out of
 * white behind page content. The mark and the type sit on it in ink, which
 * is the §02 do: "Ink on the brand gradient". Nothing here is a second
 * lockup; it is the approved one on its approved ground.
 *
 * Satori cannot read woff2, so this reads TTFs out of assets/ rather than
 * reusing public/fonts. They are build-time only and never served.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const [semibold, bold] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Figtree-SemiBold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Figtree-Bold.ttf")),
]);

/**
 * The frame mesh, flattened to one ramp.
 *
 * §03's frame mesh is four radial blooms over a diagonal base. Satori fills
 * a positioned div's bounding box rather than its border-radius when that
 * div carries a radial-gradient, so every bloom laid that way prints a
 * straight seam across the card. A single multi-stop linear gradient runs
 * the same four hues — plus blush, the one warm note — with no artefact.
 */
const FRAME_MESH =
  "linear-gradient(115deg, #4FC7F2 0%, #3F7BF7 26%, #5B7CF6 44%, #8E6BF3 66%, #BC92EF 85%, #F4B2D6 100%)";

export function ogImage({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", position: "relative", overflow: "hidden",
          padding: "72px 80px",
          backgroundImage: FRAME_MESH,
        }}
      >
        {/* mark + wordmark, ink on the gradient */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          {/* The one-tone cut, not the two-tone. §01's receding half is the
              ramp "lifted toward white"; against a gradient there is no white
              to lift toward, and a part-opacity ink reads as dirty grey
              rather than as depth. §02 sanctions ink on the gradient. */}
          <svg width={86} height={53} viewBox={VIEW_BOX}>
            <path d={PATH_BACK} fill="#0A1024" />
            <path d={PATH_FRONT} fill="#0A1024" />
          </svg>
          <span style={{ fontFamily: "Figtree", fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", color: "#0A1024" }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {eyebrow && (
            <span style={{
              fontFamily: "Figtree", fontWeight: 700, fontSize: 19, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#0A1024", opacity: 0.62, marginBottom: 20,
            }}>
              {eyebrow}
            </span>
          )}
          <span style={{
            fontFamily: "Figtree", fontWeight: 700, fontSize: title.length > 64 ? 62 : 76,
            lineHeight: 1.04, letterSpacing: "-0.042em", color: "#0A1024",
            // satori has no text-wrap: balance; the measure does the work
            maxWidth: 940,
          }}>
            {title}
          </span>
          <span style={{
            fontFamily: "Figtree", fontWeight: 600, fontSize: 22, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#0A1024", opacity: 0.55, marginTop: 28,
          }}>
            {site.tagline}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Figtree", data: semibold, style: "normal", weight: 600 },
        { name: "Figtree", data: bold, style: "normal", weight: 700 },
      ],
    },
  );
}
