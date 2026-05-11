"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (status.kind === "loading") return;

    const form = e.currentTarget;
    // Honeypot: real users never fill this.
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus({ kind: "success" });
      return;
    }

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Unable to send message. Please try again.");
      }
      form.reset();
      setStatus({ kind: "success" });
    } catch (err) {
      // Show a generic message — avoid leaking internals.
      setStatus({
        kind: "error",
        message:
          err instanceof Error && err.message
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid w-full gap-3.5 text-left"
    >
      {/* Honeypot — visually hidden, must stay empty */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        name="name"
        label="Your name"
        type="text"
        autoComplete="name"
        required
        minLength={2}
        maxLength={80}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        maxLength={160}
      />
      <Field
        name="message"
        label="What do you want to automate?"
        textarea
        rows={4}
        required
        minLength={10}
        maxLength={4000}
      />

      <button
        type="submit"
        disabled={status.kind === "loading"}
        className="btn btn-accent btn-lg justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.kind === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : status.kind === "success" ? (
          <>
            <Check size={16} /> Sent — we&apos;ll reply within 24h
          </>
        ) : (
          <>
            Send Transmission <ArrowRight size={16} className="arrow" />
          </>
        )}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={[
          "min-h-[1.25rem] text-sm",
          status.kind === "error" ? "text-accent" : "text-bg/60",
        ].join(" ")}
      >
        {status.kind === "error" && status.message}
        {status.kind === "success" && "Thanks! Your message is in the queue."}
      </p>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  textarea?: boolean;
  rows?: number;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

function Field({ textarea, rows, label, ...rest }: FieldProps) {
  const inputCls =
    "w-full rounded-xl border border-bg/20 bg-bg/5 px-4 py-3 text-[15px] text-bg placeholder:text-bg/40 " +
    "outline-none transition-colors focus:border-accent focus:bg-bg/10";

  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="mono-label !text-bg/60">{label}</span>
      {textarea ? (
        <textarea rows={rows ?? 4} {...rest} className={`${inputCls} resize-y`} />
      ) : (
        <input {...rest} className={inputCls} />
      )}
    </label>
  );
}
