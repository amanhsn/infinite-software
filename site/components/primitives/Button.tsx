import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Arrow";

type Variant = "solid" | "ghost" | "on-ink";

const BASE =
  "inline-flex items-center gap-[14px] rounded-pill font-medium text-[15px] no-underline " +
  "transition-transform duration-300 ease-brand hover:scale-[1.04] motion-reduce:hover:scale-100";

const VARIANT: Record<Variant, string> = {
  solid: "bg-ink text-paper py-[7px] pr-[7px] pl-6",
  ghost: "bg-transparent text-ink border border-rule px-6 py-[11px] hover:bg-ink/4",
  "on-ink": "bg-paper text-ink py-[7px] pr-[7px] pl-6",
};

export function Button({
  href, children, variant = "solid", icon = true, className = "",
}: {
  href?: string; children: ReactNode; variant?: Variant; icon?: boolean; className?: string;
}) {
  const showIcon = icon && variant !== "ghost";
  const content = (
    <>
      {children}
      {showIcon && (
        <span className="grid size-[38px] shrink-0 place-items-center rounded-pill bg-cobalt text-white transition-colors duration-300 ease-brand">
          <Arrow />
        </span>
      )}
    </>
  );
  const cls = `${BASE} ${VARIANT[variant]} ${className}`;
  return href ? <Link href={href} className={cls}>{content}</Link>
              : <button type="button" className={cls}>{content}</button>;
}
