import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import WaitlistModal, { openWaitlist } from "@/components/WaitlistModal";

export const Route = createFileRoute("/")({
  component: Index,
});

const CONTACT_EMAIL = "teamc@leesconsult.com";

function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = emailValid && message.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = encodeURIComponent("Quad inquiry");
    const body = encodeURIComponent(
      `${message.trim()}\n\n— Reply to: ${email.trim()}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="px-5 py-20 md:py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-white p-8 md:p-12">
        <div className="eyebrow mb-3">Contact</div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Any inquiries?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Send us a note and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-accent"
            >
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              placeholder="you@school.edu"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-accent"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              placeholder="What would you like to know?"
              className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-1 text-right text-xs text-muted-foreground">
              {message.length}/2000
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send inquiry
            </button>
            {sent && (
              <span className="text-sm text-muted-foreground">
                Opening your email app…
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="grid grid-cols-2 gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-[4px] border-[1.75px] border-primary"
          />
        ))}
      </div>
      <span className="font-display text-lg font-semibold tracking-tight text-primary">
        Quad
      </span>
    </div>
  );
}

function WaitlistButton({
  children = "Join the waitlist",
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all whitespace-nowrap";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md"
      : "bg-white text-foreground border border-border hover:border-primary/40";
  return (
    <button
      type="button"
      onClick={openWaitlist}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-lavender/60 blur-2xl" />
      <div className="rounded-[2rem] border border-border/60 bg-white p-5 shadow-xl shadow-primary/10">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">
            Your matches
          </div>
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>

        {[
          { name: "Flannery L.", role: "Product designer", skill: 94, style: 88 },
          { name: "Aleks G.", role: "ML engineer", skill: 91, style: 82 },
          { name: "Ryaan A.", role: "Growth / marketing", skill: 86, style: 90 },
        ].map((m, i) => (
          <div
            key={m.name}
            className={`mb-3 rounded-2xl border border-border/70 p-4 ${
              i === 0 ? "bg-lavender/40" : "bg-background/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg,#484AAA,#9647B4)"
                      : i === 1
                      ? "linear-gradient(135deg,#979FF1,#484AAA)"
                      : "linear-gradient(135deg,#9647B4,#DDC2F2)",
                }}
              />
              <div className="flex-1">
                <div className="font-display text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.role}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <div className="mb-1 flex justify-between text-muted-foreground">
                  <span>Skill fit</span>
                  <span className="font-semibold text-primary">{m.skill}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${m.skill}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-muted-foreground">
                  <span>Style fit</span>
                  <span className="font-semibold text-accent">{m.style}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${m.style}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "How does the matching actually work?",
    a: "Both people complete a short assessment covering their skills, what they're looking for, and how they work. Quad compares the two — the skills you're missing against what someone offers, plus personality and working-style fit — and ranks matches by how likely you are to work well together, with a short \u201Cwhy you matched\u201D explanation on each.",
  },
  {
    q: "Isn't this just LinkedIn?",
    a: "No. LinkedIn helps you build a professional network, whereas Quad helps you find people who are actively looking to build entrepreneurial projects with you — matched on both skills and how well you'll actually work together.",
  },
  {
    q: "What if I don't have a startup idea?",
    a: "Quad is just as much for people looking to join exciting projects as it is for founders looking to build them. The assessment matches you to the people and projects that fit you.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/70">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold text-foreground">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-transform ${
            open ? "rotate-45 bg-primary text-primary-foreground border-primary" : "text-primary"
          }`}
          aria-hidden
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" aria-label="Quad home">
            <Logo />
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {[
              ["How it works", "#how"],
              ["Benefits", "#benefits"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-foreground/70 transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
          <WaitlistButton className="text-xs md:text-sm">
            Join the waitlist
          </WaitlistButton>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden px-5 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-10">
            <div>
              <div className="eyebrow mb-5">Pre-launch · student waitlist</div>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-primary md:text-6xl">
                Where student ventures find their teams.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
                Quad uses a skills-and-personality assessment to match you with
                compatible collaborators — people who fill your missing skills
                and are most likely to work well with you, not just look good
                on paper.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <WaitlistButton>
                  Join the waitlist and get early access
                </WaitlistButton>
              </div>
              <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Skill fit
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Working-style fit
                </span>
              </div>
            </div>

            <AppMockup />
          </div>
        </section>

        {/* PROBLEM */}
        <section className="px-5 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="eyebrow mb-4">The problem</div>
            <p className="font-display text-2xl leading-snug tracking-tight text-foreground md:text-3xl">
              Finding the right people is hard. Working well with them is
              harder.
              <br />
              <span className="text-foreground/60 text-lg md:text-xl">
                Promising ideas stall when founders can't find people they trust
                with the right skills, time, and commitment. And even good teams
                fall apart when collaborators clash on how they work.&nbsp;
              </span>
            </p>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="px-5 pb-16 md:pb-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-white p-8 md:p-12">
            <div className="eyebrow mb-4">The solution</div>
            <p className="font-display text-2xl leading-snug tracking-tight text-primary md:text-3xl">
              Quad matches student founders and collaborators on two things at
              once: the skills your venture is missing, and how well you'll
              actually work together. With Quad, you spend less time searching
              and more time building.
            </p>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="benefits" className="px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="eyebrow mb-3">Core benefits</div>
            <h2 className="mb-12 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Built for how student teams actually come together.
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  t: "Find the people who fill your gaps",
                  b: "Founders, engineers, designers, marketers, and creators are matched on the exact skills your venture is missing.",
                },
                {
                  t: "Fewer clashes, more building",
                  b: "We match on personality and working style so you build with less friction, not more.",
                },
                {
                  t: "Build faster",
                  b: "Spend less time searching for teammates and more time building products people actually want.",
                },
              ].map((c, i) => (
                <div
                  key={c.t}
                  className="rounded-3xl border border-border/70 bg-white p-7"
                >
                  <div className="mb-6 font-display text-4xl font-bold text-lavender">
                    0{i + 1}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-foreground">
                    {c.t}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {c.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS — step-by-step */}
        <section id="how" className="px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="eyebrow mb-3">How it works</div>
            <h2 className="mb-12 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              How Quad works.
            </h2>

            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
              {/* Connecting line */}
              <div
                className="absolute top-8 left-1/2 h-full w-0.5 -translate-x-1/2 bg-primary md:left-0 md:top-8 md:h-0.5 md:w-full md:translate-x-0"
                aria-hidden="true"
              />

              {[
                {
                  step: "1",
                  label: "Create your profile",
                  title: "Sign up with your school email and set up your profile.",
                  body: "Add your skills, interests, experience, and what you're looking for.",
                  hero: false,
                },
                {
                  step: "2",
                  label: "Take the deep assessment",
                  title: "Answer one assessment on your skills and how you work.",
                  body: "It covers the skills you have, the skills you need, and your working style and personality. It later auto-fills the rest of your profile for you.",
                  hero: true,
                },
                {
                  step: "3",
                  label: "Get your ranked matches",
                  title: "Quad shows you compatible people and projects, ranked.",
                  body: "Each match comes with a 'why you matched' breakdown with skill fit and personality fit, side by side.",
                  hero: false,
                },
                {
                  step: "4",
                  label: "Connect and build",
                  title: "Reach out to the people who fit, and start building.",
                  body: "Post your own project to attract collaborators, or join a venture that already needs what you bring.",
                  hero: false,
                },
              ].map((s, i) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className={`z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground shadow-md ${
                      s.hero
                        ? "ring-4 ring-accent ring-offset-2 ring-offset-background"
                        : ""
                    }`}
                  >
                    {s.step}
                  </div>
                  <div
                    className={`mt-6 w-full rounded-3xl p-6 text-center md:p-7 ${
                      i % 2 === 0 ? "bg-[#DDC2F2]" : "bg-white"
                    } ${
                      s.hero
                        ? "border-2 border-accent md:p-8"
                        : ""
                    }`}
                  >
                    <div className="eyebrow mb-3">{s.label}</div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="font-sans mt-3 text-sm leading-relaxed text-foreground/70">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST CTA BAND */}
        <section className="px-5 py-16 md:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-14">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Ready to find your team?
            </h2>
            <button
              type="button"
              onClick={openWaitlist}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-lavender"
            >
              Join the waitlist and get early access
            </button>
          </div>
        </section>




        {/* FAQ */}
        <section id="faq" className="px-5 py-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="eyebrow mb-3">FAQ</div>
            <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Questions, answered.
            </h2>
            <div>
              {FAQS.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-primary md:text-5xl">
              Ready to find the people who'll help build your next big idea?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-foreground/70">
              Join the waitlist and be among the first students shaping a more
              connected entrepreneurial community on campus.
            </p>
            <div className="mt-9">
              <WaitlistButton>
                Join the waitlist and get early access
              </WaitlistButton>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <ContactSection />
      </main>


      {/* FOOTER */}
      <footer className="border-t border-border/70 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-primary">
              How it works
            </a>
            <a href="#benefits" className="hover:text-primary">
              Benefits
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Quad. All rights reserved.
          </div>
        </div>
      </footer>

      <WaitlistModal />
    </div>
  );
}
