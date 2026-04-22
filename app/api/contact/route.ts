import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Message is too short").max(4000),
});

// Very small in-memory rate limiter: 5 submissions / 10 minutes / IP.
// Good enough for a landing page; use Upstash / Redis in production.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (bucket.length >= MAX_HITS) {
    hits.set(ip, bucket);
    return true;
  }
  bucket.push(now);
  hits.set(ip, bucket);
  return false;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a bit." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as unknown;
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      // Keep the failure reason generic to the client.
      console.error("Contact form misconfigured: missing env vars.");
      return NextResponse.json(
        { error: "Contact form is not available right now." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New project inquiry — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; color:#0f0f0f;">
          <h2 style="margin:0 0 12px">New project inquiry</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 16px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <div style="padding:16px;background:#f2efeb;border-radius:12px;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Unable to deliver message. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
