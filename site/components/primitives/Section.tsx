import type { ReactNode } from "react";

export function Section({
  children, ground = "paper", className = "",
}: { children: ReactNode; ground?: "paper" | "mist"; className?: string }) {
  return (
    <section className={`${ground === "mist" ? "bg-mist" : ""} py-sec ${className}`}>
      <div className="mx-auto max-w-shell px-gut">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow, title, body, action, measure = "measure-base",
}: {
  eyebrow: string; title: string; body?: string; action?: ReactNode;
  measure?: "measure-tight" | "measure-base" | "measure-wide";
}) {
  return (
    <div className={`mb-sec-gap ${action ? "flex flex-wrap items-end justify-between gap-6" : ""}`}>
      <div>
        <p className="text-eyebrow text-cobalt uppercase">{eyebrow}</p>
        <h2 className={`mt-[14px] text-h2 ${measure}`}>{title}</h2>
        {body && <p className="mt-4 max-w-[58ch] text-ink-60">{body}</p>}
      </div>
      {action}
    </div>
  );
}
