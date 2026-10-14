import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Arrow";

type Variant = "solid" | "ghost" | "glass" | "on-ink";

const BASE =
  "inline-flex items-center gap-[14px] rounded-pill font-medium text-[15px] no-underline " +
  "transition-transform duration-300 ease-brand hover:scale-[1.04] motion-reduce:hover:scale-100";

const VARIANT: Record<Variant, string> = {
  solid: "bg-ink text-paper py-[7px] pr-[7px] pl-6",
  ghost: "bg-transparent text-ink border border-rule px-6 py-[11px] hover:bg-ink/4",
  // For the mesh. The light glass needs its own edge token: a rule-coloured
  // border disappears into the near-white top of the ramp and only shows
  // where it darkens, which reads as a button with one side missing.
  glass:
    "bg-glass-light text-ink border border-glass-light-edge px-6 py-[11px] " +
    "backdrop-blur-[12px] shadow-[0_2px_10px_-4px_rgb(10_16_36/0.10)] hover:bg-paper/85",
  "on-ink": "bg-paper text-ink py-[7px] pr-[7px] pl-6",
};

export function Button({
  href, children, variant = "solid", icon = true, className = "",
  type = "button", disabled = false,
}: {
  href?: string; children: ReactNode; variant?: Variant; icon?: boolean; className?: string;
  /** `submit` for the one real form on the site; the rest are links. */
  type?: "button" | "submit"; disabled?: boolean;
}) {
  const showIcon = icon && variant !== "ghost" && variant !== "glass";
  const content = (
    <>
      {children}
      {showIcon && (
        <span className="grid size-[38px] shrink-0 place-items-center rounded-pill bg-cobalt text-paper transition-colors duration-300 ease-brand">
          <Arrow />
        </span>
      )}
    </>
  );
  const cls = `${BASE} ${VARIANT[variant]} ${className}`;
  return href ? <Link href={href} className={cls}>{content}</Link>
              : <button type={type} disabled={disabled}
                        className={`${cls} disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:scale-100`}>
                  {content}
                </button>;
}
