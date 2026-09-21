"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/primitives/Logo";
import { Arrow } from "@/components/primitives/Arrow";
import { primaryNav, megaColumns, type NavEntry } from "@/content/navigation";

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"
         className="size-[11px] transition-transform duration-200 ease-brand group-aria-expanded:rotate-180">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);   // desktop panel
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(null), []);

  /* A static <a> could not do this: without it the menu stays open across a
     client-side navigation. */
  useEffect(() => { close(); setMobile(false); }, [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) { close(); document.getElementById(`navbtn-${open}`)?.focus(); }
      else if (mobile) setMobile(false);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) { close(); setMobile(false); }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open, mobile, close]);

  /* Hover opens, but with a grace period so crossing a gap between the
     trigger and the panel does not shut it. */
  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(close, 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href) && href !== "/";

  return (
    <div className="sticky top-0 z-50 px-gut pt-[calc(14px+env(safe-area-inset-top,0px))]">
      <nav
        ref={navRef}
        aria-label="Primary"
        onMouseLeave={hoverClose}
        className="relative mx-auto flex max-w-shell items-center gap-5 rounded-pill border border-glass-light-edge bg-glass-light py-[10px] pr-[10px] pl-[22px] backdrop-blur-[20px]"
      >
        <Link href="/" className="flex items-center gap-[11px] no-underline">
          <Logo className="h-[30px]" />
          <span className="text-[23px] font-semibold tracking-[-0.052em] text-ink">Infinite</span>
        </Link>

        <button
          type="button"
          aria-expanded={mobile}
          aria-controls={`${panelId}-mobile`}
          aria-label="Menu"
          onClick={() => setMobile((v) => !v)}
          className="ml-auto cursor-pointer p-[10px] text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d={mobile ? "M5 5l12 12M17 5L5 17" : "M3 7h16M3 15h16"}
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── desktop ── */}
        <div className="ml-auto hidden items-center gap-[2px] md:flex">
          {primaryNav.map((item) => (
            <NavTrigger
              key={item.label}
              item={item}
              open={open === item.label}
              active={isActive(item.href)}
              panelId={panelId}
              onOpen={() => hoverOpen(item.label)}
              onClose={hoverClose}
              onToggle={() => setOpen((v) => (v === item.label ? null : item.label))}
            />
          ))}
          <Link
            href="/contact/"
            className="ml-[10px] inline-flex items-center gap-[14px] rounded-pill bg-ink py-[7px] pr-[7px] pl-6 text-[15px] font-medium text-paper no-underline transition-transform duration-300 ease-brand hover:scale-[1.04] motion-reduce:hover:scale-100"
          >
            Start a conversation
            <span className="grid size-[38px] shrink-0 place-items-center rounded-pill bg-cobalt text-white">
              <Arrow />
            </span>
          </Link>
        </div>

        {/* ── desktop panels ── */}
        {primaryNav.map((item) =>
          open === item.label ? (
            <div
              key={`${item.label}-panel`}
              id={`${panelId}-${item.label}`}
              onMouseEnter={() => hoverOpen(item.label)}
              className="absolute inset-x-0 top-[calc(100%+10px)] hidden overflow-hidden rounded-section border border-rule bg-paper shadow-[0_24px_60px_-20px_rgb(10_16_36_/_0.18)] md:block"
            >
              {item.kind === "mega" ? <MegaPanel /> : item.kind === "menu" ? <MenuPanel item={item} /> : null}
            </div>
          ) : null,
        )}
      </nav>

      {/* ── mobile ── */}
      {mobile && (
        <div
          id={`${panelId}-mobile`}
          className="mx-auto mt-[10px] max-w-shell overflow-hidden rounded-card border border-rule bg-paper md:hidden"
        >
          <MobileMenu />
        </div>
      )}
    </div>
  );
}

function NavTrigger({
  item, open, active, panelId, onOpen, onClose, onToggle,
}: {
  item: NavEntry; open: boolean; active: boolean; panelId: string;
  onOpen: () => void; onClose: () => void; onToggle: () => void;
}) {
  const cls =
    `rounded-pill px-[15px] py-[9px] text-[14.5px] font-medium no-underline transition-colors duration-300 ease-brand ` +
    (active ? "text-ink" : "text-ink-60 hover:bg-ink/6 hover:text-ink");

  if (item.kind === "link") {
    return <Link href={item.href} className={cls}>{item.label}</Link>;
  }
  return (
    <button
      type="button"
      id={`navbtn-${item.label}`}
      aria-expanded={open}
      aria-controls={`${panelId}-${item.label}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onClick={onToggle}
      className={`group flex cursor-pointer items-center gap-[6px] ${cls} ${open ? "bg-ink/6 text-ink" : ""}`}
    >
      {item.label}
      <Chevron />
    </button>
  );
}

function MegaPanel() {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-2 p-8">
      {megaColumns.map((cat) => (
        <div key={cat.slug}>
          <Link href={`/services/${cat.slug}/`}
                className="mb-1 block text-[15px] font-semibold tracking-[-0.02em] text-ink no-underline hover:text-cobalt">
            {cat.title}
          </Link>
          <p className="mb-4 text-[12.5px] leading-[1.5] text-ink-40">{cat.leaves.length} services</p>
          <ul className="m-0 flex list-none flex-col gap-[2px] p-0">
            {cat.leaves.map((leaf) => (
              <li key={leaf.slug}>
                <Link href={`/services/${cat.slug}/${leaf.slug}/`}
                      className="-mx-[10px] block rounded-inner px-[10px] py-[7px] text-[13.5px] text-ink-60 no-underline transition-colors duration-200 ease-brand hover:bg-mist hover:text-ink">
                  {leaf.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="col-span-4 mt-2 flex items-center justify-between border-t border-rule-soft pt-5">
        <p className="m-0 max-w-[52ch] text-[13.5px] text-ink-60">
          Whichever practice an engagement starts in, it is staffed from the same bench and reports the same numbers.
        </p>
        <Link href="/services/"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-cobalt no-underline">
          All services <Arrow className="size-[13px]" />
        </Link>
      </div>
    </div>
  );
}

function MenuPanel({ item }: { item: Extract<NavEntry, { kind: "menu" }> }) {
  return (
    <div className="grid grid-cols-3 gap-2 p-6">
      {item.items.map((l) => (
        <Link key={l.href} href={l.href}
              className="rounded-card p-4 no-underline transition-colors duration-200 ease-brand hover:bg-mist">
          <span className="block text-[15px] font-semibold tracking-[-0.018em] text-ink">{l.label}</span>
          {l.summary && <span className="mt-1 block text-[13px] leading-[1.5] text-ink-60">{l.summary}</span>}
        </Link>
      ))}
    </div>
  );
}

function MobileMenu() {
  return (
    <div className="flex flex-col p-3">
      {primaryNav.map((item) => (
        <div key={item.label} className="border-b border-rule-soft last:border-b-0">
          <Link href={item.href}
                className="block px-3 py-[13px] text-[15px] font-semibold text-ink no-underline">
            {item.label}
          </Link>
          {item.kind === "mega" && (
            <ul className="m-0 list-none px-3 pb-3 pl-5">
              {megaColumns.map((c) => (
                <li key={c.slug} className="py-[6px]">
                  <Link href={`/services/${c.slug}/`} className="text-[14px] text-ink-60 no-underline">{c.title}</Link>
                </li>
              ))}
            </ul>
          )}
          {item.kind === "menu" && (
            <ul className="m-0 list-none px-3 pb-3 pl-5">
              {item.items.map((l) => (
                <li key={l.href} className="py-[6px]">
                  <Link href={l.href} className="text-[14px] text-ink-60 no-underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <Link href="/contact/"
            className="mt-3 flex items-center justify-center gap-3 rounded-pill bg-ink px-6 py-[13px] text-[15px] font-medium text-paper no-underline">
        Start a conversation <Arrow />
      </Link>
    </div>
  );
}
