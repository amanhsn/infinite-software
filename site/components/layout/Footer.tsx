import Link from "next/link";
import { Logo } from "@/components/primitives/Logo";
import { serviceCategories } from "@/content/services";
import { footerColumns, legalLinks } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink pt-[clamp(3rem,6vw,5rem)] pb-[34px] text-on-ink-70">
      <div className="mx-auto max-w-shell px-gut">
        <div className="grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.75rem)] sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-[11px] text-on-ink">
              <Logo variant="on-ink" className="h-[30px]" />
              <span className="text-[23px] font-semibold tracking-[-0.052em]">{site.name}</span>
            </div>
            <p className="mt-4 max-w-[26ch] text-[13px] text-on-ink-55">{site.tagline}</p>
          </div>

          <FooterCol heading="Services"
                     links={serviceCategories.map((c) => ({ label: c.title, href: `/services/${c.slug}/` }))} />
          {footerColumns.map((col) => (
            <FooterCol key={col.heading} heading={col.heading} links={[...col.links]} />
          ))}
          <FooterCol heading="Contact" links={[
            { label: site.email, href: `mailto:${site.email}` },
            { label: "Start a conversation", href: "/contact/" },
            { label: "LinkedIn", href: "https://www.linkedin.com/" },
          ]} />
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap gap-x-[26px] gap-y-2 border-t border-paper/12 pt-6 text-[13px] text-on-ink-55">
          <span>&copy; {new Date().getFullYear()} {site.legalName}</span>
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-on-ink-70 no-underline hover:text-on-ink">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-eyebrow font-bold tracking-[0.2em] text-on-ink-55 uppercase">{heading}</h2>
      <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-small text-on-ink-70 no-underline hover:text-on-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
