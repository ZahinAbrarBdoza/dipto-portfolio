# Quiet Signal — portfolio

A personal portfolio built as one designed object: editorial serif display type
against instrument-panel metadata, a deep graphite ground, and a single ember
accent that only appears where something is live or actionable.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
npm run typecheck  # tsc --noEmit
```

---

## Make it yours

Everything personal lives in **three files**. Nothing else needs touching.

| File | What it holds |
| --- | --- |
| [`src/data/profile.ts`](src/data/profile.ts) | Name, role, location, email, socials, availability, headline, bio, stats, client list, `siteUrl` |
| [`src/data/projects.ts`](src/data/projects.ts) | The five case studies — index cards *and* their `/work/[slug]` pages |
| [`src/data/practice.ts`](src/data/practice.ts) | Capabilities, experience timeline, skill clusters, education, certifications, activities, testimonials |

Those files also feed the page metadata, the JSON-LD (`Person`, `WebSite`,
`CreativeWork`), the sitemap, the favicon and the Open Graph image — so changing
your name in `profile.ts` changes it everywhere.

**Set `profile.siteUrl` before deploying.** It is the base for canonical URLs,
`sitemap.xml`, `robots.txt` and every absolute OG URL.

### Testimonials are empty on purpose

`testimonials` in [`practice.ts`](src/data/practice.ts) is an empty array, and the
section renders nothing while it stays that way. A quote attributed to a named
person at a named employer is the one thing on this site that cannot be drafted —
it has to be real. Add entries and the section appears between Credentials and
Contact, laid out for one lead quote plus two supporting ones.

Likewise, the metric tiles on each project are **factual attributes** — the tools
used, the data source, the delivery surface, the sector — not impact numbers.
Swap in real before/after figures when you have ones you can stand behind.

### Swapping the accent colour

One line in [`src/app/globals.css`](src/app/globals.css):

```css
:root      { --accent: #ff6a3d; --accent-ink: #08090c; }
[data-theme="light"] { --accent: #b8380f; --accent-ink: #fff8f4; }
```

`--accent-ink` is the text colour that sits *on* the accent — keep it above 4.5:1
against the accent you choose. Both palettes currently pass WCAG 2.2 AA.

### Theme default

The site is **dark-first**: it opens dark for everyone and only honours a light
choice the visitor made here before. To follow the operating system instead, add
a `prefers-color-scheme` fallback to `themeScript` in
[`ThemeProvider.tsx`](src/components/providers/ThemeProvider.tsx) — the comment
there marks the spot.

### Project imagery

There is no stock photography and no image pipeline to feed. Each project's
visual is **drawn in code** — see
[`src/components/visual/ProjectVisual.tsx`](src/components/visual/ProjectVisual.tsx),
which renders one of five deterministic compositions (`terminal`, `bloom`,
`editorial`, `system`, `orbital`) seeded from the project slug. They cost no
network requests, never shift layout, stay sharp at any density, and recolour
with the theme.

To use real screenshots instead: drop images in `public/`, and replace the
`<ProjectVisual … />` call inside the media frame with `next/image`. The frame,
aspect ratio, hover behaviour and mask reveal all stay as they are.

The About portrait works the same way
([`Portrait.tsx`](src/components/visual/Portrait.tsx)) — a head-and-shoulders
envelope screened into hairlines. Swap the `<svg>` for an `<Image>` and keep the
plate frame around it.

---

## Contact form

The form submits straight from the browser to [Web3Forms](https://web3forms.com),
which needs no verified domain and no server. Get a free access key with your
inbox address, then set:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
```

in `.env.local` locally, and in your host's environment variables in production.

**Why client-side, and why the key is public.** Web3Forms rejects server-side
calls on the free plan (403, *"Use our API in client side"*), so there is no API
route — the key ships in the client bundle, which is how Web3Forms is designed
to be used. It authorises delivery to one inbox and nothing else. If it ever
attracts spam, rotate it in their dashboard and enable their captcha.

Validation, the honeypot and the focus-management on errors all still run in
[`ContactForm.tsx`](src/components/sections/ContactForm.tsx). **Without a key the
form tells the visitor to email directly** — it never pretends a message was
delivered. To move to a server-side provider later (Resend, Postmark, SES), add
a route back and post to it instead; everything above the `fetch` call stays as
it is.

With no API route, the whole site is static — there is no serverless function to
cold-start, and every page is served straight from the CDN.

---

## How it is put together

```
src/
├─ app/
│  ├─ layout.tsx          fonts, metadata, JSON-LD, providers, skip link
│  ├─ page.tsx            composes the eight home sections
│  ├─ template.tsx        page transition (opacity only — see the note inside)
│  ├─ work/[slug]/        case studies, statically generated
│  ├─ icon.tsx            favicon, generated
│  ├─ opengraph-image.tsx social card, generated
│  ├─ sitemap.ts robots.ts not-found.tsx
│  └─ globals.css         design tokens + the whole CSS layer
├─ components/
│  ├─ providers/          theme, smooth scroll, custom cursor
│  ├─ layout/             nav, mobile menu, preloader, footer, theme toggle
│  ├─ sections/           one file per section of the page
│  ├─ ui/                 actions, text reveals, form fields, counters, halos
│  └─ visual/             generated art (SVG) and the hero light field (canvas)
├─ data/                  ← everything you edit
└─ lib/                   motion language, hooks, scroll + intro helpers, utils
```

Two components carry non-obvious constraints, and both are commented in place:

- **`MaskLine`** watches its clipping *wrapper*, never the span that slides. A
  span parked outside an `overflow: hidden` parent has an empty intersection
  rect, so an observer on it never fires and the line stays hidden for good.
- **`Halo`** clips its own glow. A blurred halo hanging past a section widens
  the document, and on mobile a wider document expands the initial containing
  block — which stretches every `position: fixed` element and pushes the nav's
  menu button off the side of the screen.

Both were real bugs before they were comments. Keep the constraints if you move
the code.

### Design tokens

All colour, rhythm and motion values are CSS custom properties on `:root`, with
the light theme redefining the same names under `[data-theme="light"]`. Tailwind
consumes them through `@theme inline`, so `bg-surface`, `text-dim`,
`border-line` and `text-accent` all follow the theme at runtime — there is not a
single `dark:` variant in the codebase.

### Motion language

Two easing curves (`cubic-bezier(0.22, 1, 0.36, 1)` and `(0.16, 1, 0.3, 1)`)
defined once in [`src/lib/motion.ts`](src/lib/motion.ts) and reused everywhere,
which is what makes the page feel like one hand tuned it.

Rules the code actually follows:

- Only `transform`, `opacity` and `clip-path` are animated.
- Scroll entrances fire once and are never re-triggered.
- The hero canvas stops its rAF loop when scrolled out of view or the tab is
  hidden, and renders a single static frame on touch devices.
- `prefers-reduced-motion` removes displacement everywhere — the compositions
  are identical, they simply arrive without travel. The preloader is skipped,
  Lenis never loads, the custom cursor does not start, and the hero's canvas is
  replaced by a static CSS gradient.
  Note that the media query only resolves *after* mount, so every reduced branch
  animates the **same properties** as its full-motion counterpart and changes
  only the values. A variant that drops a property mid-flight strands the
  element at whatever transform it had reached — which, inside a mask, means
  invisible forever.
- No scroll hijacking. Lenis only runs on fine pointers with motion enabled;
  everywhere else scrolling is entirely native.

### Accessibility

WCAG 2.2 AA. Semantic landmarks and heading order, a skip link, visible focus
rings on a single `:focus-visible` rule, a focus-trapped mobile sheet that
restores focus on close, labelled form controls with inline errors and live
regions, `aria-expanded`/`aria-controls` on the services accordion, alt text on
every generated visual, and no interaction that depends on hover alone — project
cards carry a permanent "Case study" affordance, not a hover-only one.

### Performance

- ~184 KB first-load JS on the home page, ~154 KB on a case study.
- Zero image requests: every visual is inline SVG or one canvas.
- The canvas component is `dynamic()` with `ssr: false`, so it is never in the
  server bundle and never blocks first paint.
- Fonts self-hosted through `next/font` with `display: swap`.
- Case studies are statically generated at build time.
- The grain layer is disabled on touch devices, where full-screen blending costs
  more than the texture is worth.

---

## Deploy

Any Node host works. On Vercel: import the repo, add the three environment
variables above if you want the form to deliver, and set `profile.siteUrl` to
the production domain.
