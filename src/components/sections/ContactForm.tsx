"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Arrow, Magnetic } from "@/components/ui/Actions";
import { contactScopes, profile } from "@/data/profile";
import { EASE_SIGNAL } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

interface Values {
  name: string;
  email: string;
  company: string;
  scope: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const SCOPES = contactScopes;

/** Derived, not typed out twice: a literal here drifted from SCOPES and every
 *  default enquiry was posting a scope value that no longer existed. */
const DEFAULT_SCOPE = SCOPES[0]?.value ?? "other";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please add your name.";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please add an address I can reply to.";
  if (values.message.trim().length < 20)
    errors.message = "A couple of sentences, please.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    company: "",
    scope: DEFAULT_SCOPE,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  // The form unmounts on success, so focus has to be handed somewhere useful.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (key: keyof Values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the error as soon as the field is being corrected.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(values);

    if (Object.keys(found).length) {
      // flushSync, so the error text, aria-invalid and aria-describedby exist
      // in the DOM before focus lands. Batched, focus arrives first and a
      // screen reader announces the field with no error attached to it.
      flushSync(() => setErrors(found));

      const firstKey = Object.keys(found)[0];
      const field = event.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      field?.focus();
      setStatus("idle");
      return;
    }

    setErrors(found);

    setStatus("submitting");
    setServerMessage("");

    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: form.get("website") ?? "" }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setServerMessage(data.message ?? "That did not send. Email me directly instead.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage("Network trouble. Email me directly and it will reach me.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_SIGNAL }}
        role="status"
        aria-live="polite"
        className="flex flex-col gap-5 rounded-[3px] border border-line bg-surface/60 p-8 focus:outline-none"
      >
        <span className="flex items-center gap-3">
          <span className="pulse-dot" />
          <span className="mono text-accent">Message sent</span>
        </span>
        <p className="display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.2] text-ink">
          Thank you — I read every one of these myself.
        </p>
        <p className="t-body">
          {profile.availability.responseTime}. If it is urgent, reply to the
          confirmation.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", company: "", scope: "product", message: "" });
            setStatus("idle");
          }}
          className="link-underline mono w-fit text-faint transition-colors hover:text-ink"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="sr-only">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={set("company")}
          error={errors.company}
        />
        <SelectField
          label="What do you need?"
          name="scope"
          options={SCOPES}
          value={values.scope}
          onChange={set("scope")}
        />
      </div>

      {/* Neutral wording: a recruiter picking "A full-time role" should not
          then be asked to describe "the project". */}
      <TextArea
        label="What you're getting in touch about"
        name="message"
        required
        rows={5}
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        hint="The role, or the problem you want solved, and your timing."
      />

      <div className="flex flex-wrap items-center justify-between gap-5 pt-1">
        <Magnetic>
          <button
            type="submit"
            disabled={status === "submitting"}
            data-cursor="link"
            className="group/act inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-accent-ink transition-colors duration-300 hover:bg-ink hover:text-bg disabled:cursor-wait disabled:opacity-70"
          >
            <span className="relative block overflow-hidden">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/act:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover/act:translate-y-0">
                {status === "submitting" ? "Sending" : "Send message"}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/act:translate-y-0 motion-reduce:hidden"
              >
                {status === "submitting" ? "Sending" : "Send message"}
              </span>
            </span>
            <Arrow
              dir="e"
              className="transition-transform duration-500 group-hover/act:translate-x-1"
            />
          </button>
        </Magnetic>
      </div>

      <div role="alert" aria-live="assertive">
        <AnimatePresence>
          {status === "error" ? (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_SIGNAL }}
              className="flex flex-wrap items-center gap-x-2 border-t border-line pt-4 text-[0.85rem] text-ink"
            >
              {serverMessage}{" "}
              <a href={`mailto:${profile.email}`} className="link-underline text-accent">
                {profile.email}
              </a>
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
