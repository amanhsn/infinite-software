import { VIEW_BOX } from "@/lib/logo-geometry";
import type { CSSProperties } from "react";

type LogoProps = {
  /** `on-ink` flips both halves to white for dark grounds. */
  variant?: "gradient" | "on-ink" | "mono";
  className?: string;
};

const VARIANTS: Record<NonNullable<LogoProps["variant"]>, CSSProperties | undefined> = {
  gradient: undefined,
  "on-ink": { "--mark-back": "rgb(255 255 255 / .42)", "--mark-front": "#fff" } as CSSProperties,
  mono: { "--mark-back": "var(--color-ink)", "--mark-front": "var(--color-ink)" } as CSSProperties,
};

export function Logo({ variant = "gradient", className = "h-[34px]" }: LogoProps) {
  return (
    <svg
      role="img"
      aria-label="Infinite"
      viewBox={VIEW_BOX}
      style={VARIANTS[variant]}
      className={`block w-auto ${className}`}
    >
      <use href="#infinite-mark" />
    </svg>
  );
}
