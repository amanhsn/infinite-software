"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { serviceCategories } from "@/content/services";
import { site } from "@/content/site";
import { HONEYPOT, validate, type ContactSubmission, type FieldErrors } from "@/lib/contact";

/**
 * The one form on the site. Previously three copies of the same markup
 * with no endpoint behind any of them; now one component, posting to
 * /api/contact.
 *
 * Works without JavaScript: it is a real <form> with an action and a
 * method, and the route handler answers a plain post with a 303 to
 * /contact/thanks/. With JavaScript it submits in place and reports per
 * field, which is better but is not the only path.
 *
 * `full` adds the role field and the service checkboxes — the /contact/
 * page has the room for them, the band at the foot of other pages does
 * not.
 */
export function ContactForm({ full = false, idPrefix }: { full?: boolean; idPrefix?: string }) {
  const reactId = useId();
  const uid = (name: string) => `${idPrefix ?? reactId}-${name}`;

  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failure, setFailure] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const data = new FormData(event.currentTarget);
    const submission: ContactSubmission = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      role: String(data.get("role") ?? ""),
      interests: data.getAll("interests").map(String),
      brief: String(data.get("brief") ?? ""),
    };

    const found = validate(submission);
    setErrors(found);
    setFailure("");
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ ...submission, [HONEYPOT]: String(data.get(HONEYPOT) ?? "") }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setState("idle");
        if (body.errors) setErrors(body.errors as FieldErrors);
        setFailure(body.error ?? `Something went wrong. Email ${site.email} and it will reach us.`);
        return;
      }
      setState("sent");
    } catch {
      setState("idle");
      setFailure(`We could not reach the server. Email ${site.email} and it will reach us.`);
    }
  }

  if (state === "sent") {
    return (
      <div role="status"
           className="rounded-card border border-rule bg-paper p-[clamp(1.5rem,3vw,2.25rem)]">
        <p className="text-eyebrow text-cobalt uppercase">Sent</p>
        <h3 className="mt-3 mb-2 text-h3">That reached us.</h3>
        <p className="m-0 max-w-measure text-ink-60">
          You will get a reply from an engineer within one business day. If it is urgent before
          then, <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>{" "}
          goes to the same people.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action="/api/contact/" method="post" onSubmit={onSubmit} noValidate
          className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id={uid("name")} name="name" label="Name" autoComplete="name" error={errors.name} required />
        <Field id={uid("email")} name="email" label="Work email" type="email" autoComplete="email"
               error={errors.email} required />
      </div>

      <div className={full ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : undefined}>
        <Field id={uid("company")} name="company" label="Company" autoComplete="organization"
               error={errors.company} />
        {full && (
          <Field id={uid("role")} name="role" label="Your role" autoComplete="organization-title"
                 error={errors.role} />
        )}
      </div>

      {full && (
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-[10px] p-0 text-[13px] font-semibold text-ink-60">
            What is this about?
          </legend>
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((c, i) => (
              <span key={c.slug} className="relative">
                <input type="checkbox" id={uid(c.slug)} name="interests" value={c.slug}
                       defaultChecked={i === 0} className="peer absolute size-0 opacity-0" />
                <label htmlFor={uid(c.slug)}
                       className="inline-flex cursor-pointer items-center rounded-pill border border-[rgb(10_16_36/0.10)] bg-paper/70 px-4 py-[9px] text-[14px] text-ink-60
                                  transition-colors duration-200 ease-brand peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-paper
                                  peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt">
                  {c.title}
                </label>
              </span>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-[7px]">
        <label htmlFor={uid("brief")} className="text-[13px] font-semibold text-ink-60">
          What are you building? <Required />
        </label>
        <textarea id={uid("brief")} name="brief" rows={full ? 5 : 4}
          placeholder={full ? "A payments platform we cannot deploy during business hours…" : undefined}
          aria-invalid={errors.brief ? true : undefined}
          aria-describedby={errors.brief ? `${uid("brief")}-error` : undefined}
          className={`glass-field w-full resize-y rounded-inner px-[15px] py-[13px] text-[15px] text-ink placeholder:text-ink-25
                      ${errors.brief ? "outline outline-2 outline-offset-[-2px] outline-warn" : ""}`} />
        <FieldError id={`${uid("brief")}-error`} message={errors.brief} />
      </div>

      {/* Hidden from people and from assistive technology; bots fill it anyway. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={uid(HONEYPOT)}>Leave this empty</label>
        <input id={uid(HONEYPOT)} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send it"}
        </Button>
        <span className="text-[13px] text-ink-40">
          Or email <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>
        </span>
      </div>

      {failure && (
        <p role="alert" className="m-0 text-[14px] font-semibold text-warn">{failure}</p>
      )}
    </form>
  );
}

function Required() {
  return <span className="font-normal text-ink-40" title="Required">*</span>;
}

function Field({
  id, name, label, type = "text", autoComplete, error, required = false,
}: {
  id: string; name: string; label: string; type?: string;
  autoComplete?: string; error?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink-60">
        {label} {required && <Required />}
      </label>
      <input id={id} name={name} type={type} autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`glass-field w-full rounded-inner px-[15px] py-[13px] text-[15px] text-ink
                    ${error ? "outline outline-2 outline-offset-[-2px] outline-warn" : ""}`} />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="m-0 text-[13px] font-semibold text-warn">{message}</p>;
}
