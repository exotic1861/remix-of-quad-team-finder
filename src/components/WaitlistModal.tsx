import { useEffect, useRef, useState } from "react";

// Google Form submission endpoint. `formResponse` accepts POSTed FormData
// with `entry.<id>` field names and writes into the linked Google Sheet.
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScTxMsgSRPbgYCkbnYJsD8EbGcqIGUmekn-IiTixPWXFyMKXg/formResponse";

// TODO: replace these placeholders with the real `entry.XXXXXXXXX` IDs from
// the Google Form's page source. Order matches the questions in the modal.
const ENTRY = {
  fullName: "entry.TODO_FULL_NAME",
  email: "entry.TODO_EMAIL",
  source: "entry.TODO_SOURCE", // radio
  sourceOther: "entry.TODO_SOURCE_OTHER", // free text when "Other"
  beta: "entry.TODO_BETA",
};

const SOURCE_OPTIONS = [
  "Social media",
  "Referral from a colleague",
  "Search engine",
  "Newsletter or blog",
  "Other",
];

const BETA_OPTIONS = [
  "Yes, I'd love to help test",
  "Maybe, tell me more later",
  "No, just keep me updated on the official launch",
];

export const WAITLIST_OPEN_EVENT = "quad:open-waitlist";

export function openWaitlist() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(WAITLIST_OPEN_EVENT));
  }
}

export default function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [sourceOther, setSourceOther] = useState("");
  const [beta, setBeta] = useState("");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(WAITLIST_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(WAITLIST_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // focus first field on open
    setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const reset = () => {
    setStatus("idle");
    setFullName("");
    setEmail("");
    setSource("");
    setSourceOther("");
    setBeta("");
  };

  const close = () => {
    setOpen(false);
    // slight delay so the closing animation-less modal doesn't flash the reset state
    setTimeout(reset, 200);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append(ENTRY.fullName, fullName);
      fd.append(ENTRY.email, email);
      fd.append(ENTRY.source, source);
      if (source === "Other" && sourceOther.trim()) {
        fd.append(ENTRY.sourceOther, sourceOther.trim());
      }
      fd.append(ENTRY.beta, beta);

      // no-cors: Google Forms doesn't return CORS headers, so the response is
      // opaque. A resolved fetch = the row was accepted into the sheet.
      await fetch(FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: fd,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-primary/40 px-0 py-0 backdrop-blur-sm md:items-center md:px-5 md:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative flex max-h-[95vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl md:rounded-3xl">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-lavender/40"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        <div className="overflow-y-auto px-6 py-8 md:px-10 md:py-10">
          {status === "success" ? (
            <div className="text-center">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11.5l4.5 4.5L18 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 id="waitlist-modal-title" className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
                You're on the list.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] text-muted-foreground">
                Thanks for joining. We'll be in touch with early access details soon.
              </p>
              <button
                onClick={close}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div>
                <div className="eyebrow mb-2">Join the waitlist</div>
                <h2 id="waitlist-modal-title" className="font-display text-2xl font-bold leading-tight tracking-tight text-primary md:text-3xl">
                  A few quick questions.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Takes under a minute.
                </p>
              </div>

              <Field label="Full name" required>
                <input
                  ref={firstFieldRef}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                  disabled={status === "submitting"}
                />
              </Field>

              <Field label="Email address" required>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@school.edu"
                  disabled={status === "submitting"}
                />
              </Field>

              <Field label="How did you hear about us?">
                <div className="space-y-2">
                  {SOURCE_OPTIONS.map((opt) => (
                    <RadioRow
                      key={opt}
                      name="source"
                      value={opt}
                      checked={source === opt}
                      onChange={setSource}
                      disabled={status === "submitting"}
                    />
                  ))}
                  {source === "Other" && (
                    <input
                      type="text"
                      value={sourceOther}
                      onChange={(e) => setSourceOther(e.target.value)}
                      className={`${inputClass} mt-2`}
                      placeholder="Tell us more"
                      disabled={status === "submitting"}
                    />
                  )}
                </div>
              </Field>

              <Field label="Interested in our closed beta?">
                <div className="space-y-2">
                  {BETA_OPTIONS.map((opt) => (
                    <RadioRow
                      key={opt}
                      name="beta"
                      value={opt}
                      checked={beta === opt}
                      onChange={setBeta}
                      disabled={status === "submitting"}
                    />
                  ))}
                </div>
              </Field>

              {status === "error" && (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                  Something went wrong sending your response. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                    Sending…
                  </>
                ) : (
                  "Join the waitlist"
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                We'll only use this to send you early access details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}

function RadioRow({
  name,
  value,
  checked,
  onChange,
  disabled,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
        checked
          ? "border-primary bg-lavender/30 text-foreground"
          : "border-border bg-white text-foreground/80 hover:border-primary/40"
      } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
          checked ? "border-primary" : "border-border"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      <span>{value}</span>
    </label>
  );
}
