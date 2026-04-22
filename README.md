# Marahuyo Studios — Landing Page

Next.js 14 (App Router) + TypeScript + Tailwind CSS, with dark mode and a real
Resend-powered contact form.

## Features

- **Next.js 14 / App Router** with React Server Components where possible.
- **Tailwind CSS** using HSL design tokens → same palette in light & dark.
- **Dark mode** via `next-themes` (system default, user-toggleable).
- **Full-viewport sections** (`min-h-[100svh]`) that snap to the correct
  anchor on nav click. Scroll margin accounts for the sticky header.
- **Active-section highlighting** via `IntersectionObserver`.
- **Contact form** → `POST /api/contact` → **Resend**, with Zod validation,
  honeypot, and in-memory IP rate limiting.
- **Security**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, input escaping in outbound HTML
  email, no secrets on the client.
- Fully responsive: desktop ≥ 1200, tablet 810–1199, mobile ≤ 809.

## Setup

```powershell
npm install
copy .env.example .env.local   # then fill in values
npm run dev
```

Then open http://localhost:3000.

### Environment variables

| Key                   | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `RESEND_API_KEY`      | Your Resend API key (https://resend.com/api-keys)       |
| `CONTACT_TO_EMAIL`    | Mailbox that receives submissions                       |
| `CONTACT_FROM_EMAIL`  | Verified sender, e.g. `"Name <no-reply@yourdomain>"`    |

Never commit `.env.local`. The included `.gitignore` excludes it by default.

## Project structure

```
app/
├── api/contact/route.ts   # Server route → Resend
├── globals.css            # Tailwind + CSS tokens (light/dark)
├── layout.tsx             # Fonts (Figtree + Geist Mono), ThemeProvider
└── page.tsx               # Page composition
components/
├── navigation.tsx         # Sticky nav, active link, mobile drawer
├── hero.tsx               # "Level Up. Win." + meta row
├── marquee.tsx            # Scrolling keyword strip
├── features.tsx           # 3 service cards
├── about.tsx              # Who We Are + stats
├── cta.tsx                # "Join the Adventure" + form wrapper
├── contact-form.tsx       # Client form → /api/contact
├── footer.tsx             # 4-col footer
├── theme-provider.tsx     # next-themes wrapper
└── theme-toggle.tsx       # Sun/Moon button
```

## Design tokens

All tokens are HSL so they work cleanly with Tailwind's `<alpha-value>`. See
`app/globals.css`:

| Token           | Light       | Dark      |
| --------------- | ----------- | --------- |
| `--bg`          | `#fffaf5`   | `#0d0d0d` |
| `--bg-soft`     | `#f2efeb`   | `#171717` |
| `--ink`         | `#0f0f0f`   | `#fffaf5` |
| `--muted`       | `#6b6b6b`   | `#999999` |
| `--border`      | `#e8e3dc`   | `#292929` |
| `--accent`      | `#ff2f00`   | `#ff4422` |
| `--blue`        | `#0051ff`   | `#3385ff` |

## Security notes (per project rules)

- Tokens/keys live only in `process.env`, never shipped to the client.
- The Resend API route validates input with Zod, strips HTML via escaping,
  enforces a rate limit, and never reflects user input unescaped in replies.
- CSP-friendly: no inline event handlers, all styles/scripts come from first
  party + Google Fonts.
- Contact form uses a hidden honeypot to reduce spam.
- No `innerHTML` with user content on the client.

## License

© Marahuyo Studios.
