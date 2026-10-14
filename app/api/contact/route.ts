import { NextResponse } from "next/server";
import { HONEYPOT, normalise, validate, interestLabel } from "@/lib/contact";
import { site } from "@/content/site";

/**
 * The contact form's endpoint. Every submission is written to the Notion
 * database named below, one row per enquiry.
 *
 * Needs two things in the environment:
 *   NOTION_TOKEN         — an internal integration secret (ntn_…), with the
 *                          enquiries database shared to that integration
 *   NOTION_ENQUIRIES_DB  — optional; defaults to the database created for
 *                          this site. Not a secret, so it lives in code.
 *
 * If the token is missing or Notion refuses the write, this route fails
 * loudly: it returns an error the form shows, with the mailto fallback
 * next to it. A contact form that accepts a message and drops it is worse
 * than one that is visibly broken, because nobody finds out for months.
 *
 * Runs on Vercel, which builds this project with plain `next build`. Under
 * STATIC_EXPORT=1 there is no runtime and this route is excluded — see the
 * note in next.config.ts.
 */

const NOTION_DB = process.env.NOTION_ENQUIRIES_DB ?? "cb5dcc82c01647c686cbbd8109f27c2d";
const NOTION_VERSION = "2022-06-28";

/** Bodies this size are not enquiries. */
const MAX_BODY = 64 * 1024;

/**
 * Best-effort throttle. Serverless instances do not share memory, so this
 * slows a single attacker down rather than stopping a distributed one; it
 * exists to keep one stuck browser from writing a thousand rows.
 */
const RECENT = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (RECENT.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RECENT.set(ip, hits);
  if (RECENT.size > 5000) RECENT.clear();
  return hits.length > MAX_PER_WINDOW;
}

const text = (content: string) =>
  content ? [{ type: "text" as const, text: { content: content.slice(0, 2000) } }] : [];

export async function POST(request: Request) {
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");

  /** One shape of reply for fetch, another for a form posting without JS. */
  const reply = (status: number, body: { ok: boolean; error?: string; errors?: unknown }) => {
    if (wantsJson) return NextResponse.json(body, { status });
    const to = body.ok ? "/contact/thanks/" : "/contact/problem/";
    return NextResponse.redirect(new URL(to, request.url), 303);
  };

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return reply(413, { ok: false, error: "That message is too long to send." });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return reply(429, { ok: false, error: "That is a lot of messages at once. Try again in a minute." });
  }

  // Accept both fetch (JSON) and a plain form post (urlencoded).
  let raw: Record<string, unknown>;
  try {
    const type = request.headers.get("content-type") ?? "";
    if (type.includes("application/json")) {
      raw = await request.json();
    } else {
      const form = await request.formData();
      raw = { ...Object.fromEntries(form), interests: form.getAll("interests") };
    }
  } catch {
    return reply(400, { ok: false, error: "We could not read that submission." });
  }

  // Honeypot: a real person never fills a field they cannot see. Answer 200
  // so the bot records a success and does not come back to retry.
  if (typeof raw[HONEYPOT] === "string" && raw[HONEYPOT].trim() !== "") {
    return reply(200, { ok: true });
  }

  const submission = normalise(raw);
  const errors = validate(submission);
  if (Object.keys(errors).length > 0) {
    return reply(422, { ok: false, error: "Some of that needs fixing.", errors });
  }

  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.error("[contact] NOTION_TOKEN is not set — enquiry not stored", { ip });
    return reply(503, {
      ok: false,
      error: `We could not save that. Email ${site.email} and it will reach the same place.`,
    });
  }

  const now = new Date().toISOString();
  const referer = request.headers.get("referer") ?? "";

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "notion-version": NOTION_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB },
      properties: {
        Name: { title: text(submission.name) },
        Status: { select: { name: "New" } },
        Email: { email: submission.email },
        Company: { rich_text: text(submission.company) },
        Role: { rich_text: text(submission.role) },
        Interests: { multi_select: submission.interests.map((s) => ({ name: interestLabel(s) })) },
        Brief: { rich_text: text(submission.brief) },
        Received: { date: { start: now } },
        "Submitted from": { rich_text: text(referer) },
        Referrer: { rich_text: text(request.headers.get("origin") ?? "") },
      },
      // The brief again, in the page body, where it is readable at length:
      // a rich_text property is capped at 2000 characters and truncated
      // without saying so.
      children: submission.brief
        ? [{
            object: "block",
            type: "paragraph",
            paragraph: { rich_text: [{ type: "text", text: { content: submission.brief.slice(0, 1900) } }] },
          }]
        : [],
    }),
  }).catch((cause: unknown) => {
    console.error("[contact] could not reach Notion", cause);
    return null;
  });

  if (!response?.ok) {
    const detail = response ? await response.text().catch(() => "") : "network error";
    console.error("[contact] Notion rejected the write", response?.status, detail.slice(0, 500));
    return reply(502, {
      ok: false,
      error: `We could not save that. Email ${site.email} and it will reach the same place.`,
    });
  }

  return reply(200, { ok: true });
}

/** Anything but POST, so a crawler hitting it gets a straight answer. */
export function GET() {
  return NextResponse.json({ ok: false, error: "POST a contact submission here." }, { status: 405 });
}
