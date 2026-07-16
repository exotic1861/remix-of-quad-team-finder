## Goal

Drop Calendly entirely, add a simple "Any inquiries?" contact form (Email + Message) right before the footer, and route submissions to **teamc@leesconsult.com**.

## Changes to `src/routes/index.tsx`

1. **Remove Calendly**
   - Delete the "Still have questions?" section (the block with the "Schedule a call" button).
   - Remove the Calendly badge `<link>`, `<script>` tags, and the `initBadgeWidget` init script from `__root.tsx` / index head.
   - Section order becomes: Nav → Hero → Problem → Solution → Benefits → How it works → Waitlist CTA → FAQ → **Contact form (new)** → Final CTA → Footer.
     (Placing the contact form directly before the minimalist footer as requested, after the Final CTA.)

2. **New `ContactSection` component** (inline in `index.tsx` or `src/components/ContactSection.tsx`)
   - Heading: **"Any inquiries?"**
   - Subline: one short line inviting questions.
   - Fields: **Email** (required, validated) + **Message** (required, textarea, max 2000 chars).
   - Submit button in primary indigo, matching existing button styles.
   - States: idle → submitting → success ("Thanks — we'll get back to you shortly.") → error (retry).
   - Uses the same Space Grotesk / IBM Plex Sans + palette as the rest of the page.

## How submissions reach teamc@leesconsult.com

Two viable paths — need your pick:

**Option A — Lovable Emails (recommended, fully automated)**
- Enable Lovable Cloud.
- Set up an email sender domain you own (e.g. `notify.yourdomain.com`) via the in-app email setup dialog. Sends can only start once DNS verifies.
- Scaffold app-email templates; add one template `inquiry-notification` sent from your verified domain **to teamc@leesconsult.com**, with the visitor's email as reply-to and their message in the body.
- Add a server route `src/routes/api/public/inquiry.ts` that validates input (Zod), rate-limits basic abuse, and calls the send helper.
- Client form posts to that route.

**Option B — Mailto fallback (zero setup, less polished)**
- Submit button opens the visitor's email client with `mailto:teamc@leesconsult.com?subject=Quad inquiry&body=<message>` prefilled.
- No backend, no domain, no Cloud. But: relies on the visitor having a configured mail app, and you won't capture submissions from users who abandon the compose window.

## Question for you before I build

Which path do you want?
- **A**: I'll enable Cloud and walk you through the one-time domain setup, then submissions land automatically in teamc@leesconsult.com.
- **B**: I'll wire the form as a mailto and ship immediately, no other setup needed.

## Out of scope

Hero, problem, solution, benefits, "How Quad works", FAQ, waitlist modal, colors, fonts — all untouched.