# বাজার দর · BazarDor

> A Bengali-first daily market price tracker — today's prices, market-by-market comparison, and price movement for the essentials, in one place.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bazar--dor--b14.vercel.app-05893e?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-b14.vercel.app)
[![Repository](https://img.shields.io/badge/GitHub-Avijit35cse%2FBazar--Dor-1d271f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Avijit35cse/Bazar-Dor)

**Live site:** https://bazar-dor-b14.vercel.app
**Source code:** https://github.com/Avijit35cse/Bazar-Dor

---

## Introduction

**বাজার দর (BazarDor)** is a full-stack market price dashboard built for Bengali-speaking users. It pulls live grocery price data — rice, lentils, oil, vegetables, fish, meat, eggs, milk, and spices — and presents it the way a shopper actually needs it:

- what the price is **today**,
- how it **changed** since yesterday and last month,
- and **where** it is cheapest or most expensive across 12 regional markets.

The interface is written entirely in Bangla, uses Bengali numerals throughout, and is designed mobile-first, because that is how most people check prices at the market. The detail views are account-protected, so price intelligence is gated behind a real authentication system rather than a client-side flag.

This project was built as **Assignment 7** of the Programming Hero Full Stack Web Development course, with a focus on Next.js App Router conventions, server-side authentication, and dynamic data routing.

---

## Preview

![BazarDor hero section](./public/bazar-hero.png)

---

## Project Description

BazarDor is a single Next.js application with three layers:

1. **A data layer** that consumes the Programming Hero BazarDor API (33 products, 8 categories, 12 markets per product), validates the payload shape, and exposes typed accessors.
2. **A presentation layer** built with React Server Components — pages fetch on the server, and only interactive islands (navbar, category nav, sort control, forms) ship JavaScript to the browser.
3. **An authentication layer** powered by Better Auth and MongoDB, issuing httpOnly session cookies and enforcing protected routes on the server before any product data is fetched.

Prices are always rendered in Bengali numerals (`৭৪`, `১,২০০`) while sorting and comparison run on raw numbers, so "lowest price first" is numerically correct rather than alphabetical by glyph.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | **Next.js 16.4** — App Router, Turbopack, Partial Prerendering, React Compiler |
| UI runtime | **React 19.3** with Server Components and `Suspense` streaming |
| Language | **TypeScript 5** — strict types across data, props, and API responses |
| Styling | **Tailwind CSS v4** (`@tailwindcss/turbopack`), custom design tokens, HeroUI v3 style baseline |
| Authentication | **Better Auth 1.7** — email/password + Google + GitHub OAuth, MongoDB adapter |
| Database | **MongoDB** via the official `mongodb` Node driver |
| Icons | **lucide-react** |
| Notifications | **react-hot-toast** |
| Typography | **next/font** — Hind Siliguri (Bengali) + Geist / Geist Mono |
| Deployment | **Vercel** |

---

## Features

1. **Animated live price ticker** — a continuous marquee of every tracked product with emoji, name, price, unit, and percentage change. The list is duplicated for a seamless loop, `aria-hidden` on the duplicate, pauses on hover, and falls back to a horizontally scrollable list when `prefers-reduced-motion` is set.
2. **Bangla date header** — today's date rendered with `Intl.DateTimeFormat("bn-BD")` in the `Asia/Dhaka` timezone and Bengali numerals, hydration-safe through `useSyncExternalStore`.
3. **Category navigation with active state** — all 8 categories in a second navbar row, horizontally scrollable on small screens, with the current category highlighted and marked with `aria-current="page"`.
4. **"আজ দাম বেড়েছে" / "আজ দাম কমেছে" sections** — the top 6 risers and top 6 fallers, computed from live data and sorted by percentage movement.
5. **Full product catalogue** — all 33 products in a responsive 1 / 2 / 3-column grid, each card linking straight to its detail page.
6. **Bengali numerals everywhere** — prices, percentages, and dates are localised to Bengali digits while sorting stays numeric.
7. **Protected product detail pages** — product summary, today's price, day-over-day movement, min/max/last-month statistics, and a market-wise table (market, division, minimum, maximum, average) across 12 markets.
8. **Server-side authentication** — Better Auth sessions are validated on the server in the page component, before any product data is fetched. Anonymous visitors are redirected to `/sign-in?callbackUrl=…` and returned to the product after logging in.
9. **Three sign-in methods** — email/password registration and login, plus Google and GitHub OAuth, each with a disabled/loading button state and success/error toasts.
10. **Category pages with sorting** — default order, price low→high, and price high→low, plus an empty state and a back-to-home call to action.
11. **Profile management** — view account details (avatar, name, email), update the display name through Better Auth's `updateUser`, and sign out. Unauthenticated visitors get a friendly sign-in prompt.
12. **Route-level loading skeletons** — every data-bearing route has its own skeleton (home, category, product, profile) plus Suspense fallbacks, so navigation never shows a blank screen.
13. **Friendly custom 404** — unknown routes render a Bengali "পেজটি খুঁজে পাওয়া যায়নি" page with an explanatory message and a home button.
14. **Responsive, accessible UI** — mobile-first layout from 375 px to 1440 px, visible focus rings, `aria-*` labelling, screen-reader-only direction text for price changes, and reduced-motion support.

---

## Challenge Requirements

| Challenge | Status | How it is solved |
| --- | --- | --- |
| **C1** — Bengali-numeral numeric sorting | Done | The category sorter compares the raw numeric `today` field (`a.today - b.today`). Bengali digits are applied only at render time, so sorting is mathematically correct instead of glyph-order dependent. |
| **C2** — Professional README | Done | This document. |
| **C3** — Profile update using Better Auth | Done | `authClient.updateUser({ name })` on the profile page, with validation, a saving state, and success/error toasts. |

---

## Getting Started

### Prerequisites

- **Node.js 20+** and npm
- A **MongoDB** database (MongoDB Atlas free tier works)
- A **Google OAuth** app and a **GitHub OAuth** app, if you want social sign-in

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Avijit35cse/Bazar-Dor.git

# 2. Move into the project
cd Bazar-Dor

# 3. Install dependencies
npm install

# 4. Create your local environment file
#    (copy the variable names listed below into .env.local)

# 5. Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Production build

```bash
npm run build   # compiles the app and type-checks it
npm start       # serves the production build
npm run lint    # runs ESLint
```

---

## Environment Variables

Create a file named **`.env.local`** in the project root. Only the **variable names** are documented here — never commit actual values. `.env*` is already covered by `.gitignore`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string used by the Better Auth Mongo adapter. The app throws a clear error at startup if this is missing. |
| `BETTER_AUTH_URL` | Yes | The canonical origin the auth server runs on — `http://localhost:3000` locally, your deployed URL in production. Must match the origin you browse the site from, and must be registered in the provider consoles for OAuth redirects to work. |
| `GOOGLE_CLIENT_ID` | For Google sign-in | OAuth client ID from Google Cloud Console. |
| `GOOGLE_CLIENT_SECRET` | For Google sign-in | OAuth client secret from Google Cloud Console. |
| `GITHUB_CLIENT_ID` | For GitHub sign-in | OAuth client ID from a GitHub OAuth App. |
| `GITHUB_CLIENT_SECRET` | For GitHub sign-in | OAuth client secret from a GitHub OAuth App. |

**OAuth redirect URIs to register with each provider:**

```
<your-origin>/api/auth/callback/google
<your-origin>/api/auth/callback/github
```

For the live deployment that means `https://bazar-dor-b14.vercel.app/api/auth/callback/google` and `.../github`.

> `MONGODB_URI` and `BETTER_AUTH_URL` are required for the app to boot. The social providers read their own credentials from the variables above; supply both the ID and the secret for any provider you want to keep enabled.

---

## Authentication

BazarDor uses [Better Auth](https://www.better-auth.com/) with the MongoDB adapter.

- **Session storage:** a signed, httpOnly session cookie managed by Better Auth; the browser never holds credentials or tokens in `localStorage`.
- **Server-side enforcement:** `src/lib/auth.ts` is used inside server components through `auth.api.getSession({ headers })`. The product detail page calls it **before** it fetches any product data, so an anonymous request never receives price or market data.
- **Round-trip redirects:** a blocked visit becomes `/sign-in?callbackUrl=%2Fproduct%2F<slug>`, and the sign-in page reads the `callbackUrl` search param and returns the user to the page they originally asked for. Social sign-in uses the same callback.
- **Registration flow:** after a successful sign-up the user is sent to `/sign-in` with a success toast, so the account is created and verified by an explicit login.
- **No unnecessary friction:** email verification and password-reset flows are intentionally **not** enabled — the assignment asks for a signup/login experience without extra gatekeeping.
- **Protected areas:** `/product/[slug]` (server redirect) and `/profile` (client-side session gate with a sign-in prompt).

```
src/lib/auth.ts          → Better Auth server instance (adapter, providers, trusted origins)
src/lib/auth-client.ts   → browser client used by forms, navbar, and profile
src/app/api/auth/[...all]/route.ts → GET/POST handler for every auth endpoint
```

---

## Project Structure

```
bazar-dor/
├── public/
│   ├── bazar-hero.png              # hero illustration
│   └── logo-icon.png               # brand mark
├── src/
│   ├── app/
│   │   ├── (auth)/                 # route group: auth screens
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   ├── (home)/                 # route group: landing page (+ its own skeleton)
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── auth/[...all]/route.ts
│   │   ├── category/[slug]/
│   │   │   ├── categoryProducts.tsx # client-side sorting + grid
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx             # server fetch + skeleton
│   │   ├── product/[slug]/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx             # protected detail view
│   │   ├── profile/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx             # account info + name update + sign out
│   │   ├── globals.css
│   │   ├── layout.tsx               # root layout: navbar, ticker, footer, toaster
│   │   ├── loading.tsx
│   │   └── not-found.tsx            # custom Bangla 404
│   ├── components/
│   │   ├── home/
│   │   │   ├── AllProducts.tsx      # full catalogue grid
│   │   │   ├── PriceMover.tsx       # top 6 risers / fallers
│   │   │   └── ProductCard.tsx
│   │   ├── layout/
│   │   │   ├── CategoryNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PriceTicker.tsx
│   │   │   └── ProfileDropDown.tsx
│   │   └── shared/
│   │       ├── BanglaDate.tsx
│   │       ├── BrandLoader.tsx      # shared spinner + branded loader
│   │       ├── SignOutIcon.tsx
│   │       └── Skeletons.tsx        # skeleton library
│   ├── lib/
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   ├── mongodb.ts
│   │   └── products.ts              # typed API accessors
│   └── types/
│       └── allTypes.ts              # Product, Market, PriceChange, props
├── .env.local                       # gitignored — your local secrets
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Data Source

All market data comes from the Programming Hero public BazarDor API:

| Endpoint | Used for |
| --- | --- |
| `GET https://openapi.programming-hero.com/api/bazardor/products` | Home page sections, ticker, product lookup by slug |
| `GET https://openapi.programming-hero.com/api/bazardor/categories` | Category navigation |
| `GET https://openapi.programming-hero.com/api/bazardor/categories/:slug` | Category page metadata |
| `GET https://openapi.programming-hero.com/api/bazardor/products?category=:slug` | Products within a category |

The payload is validated before use (`response.ok` plus an array-shape check), and the product detail page degrades gracefully when a product has no market rows.

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload (Turbopack) |
| `npm run build` | Production build with type-checking |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint over the project |

---

## Design & Accessibility Notes

- **Mobile-first**: layouts are composed for 375 px first, then expanded at `sm`, `md`, and `lg` breakpoints up to a 1152 px content column.
- **Bengali typography**: Hind Siliguri is loaded through `next/font` with the `bengali` subset and `display: swap`, so text is readable before the font arrives.
- **Motion safety**: the ticker honours `prefers-reduced-motion` and pauses on hover; no animation is required to understand the page.
- **Screen-reader text**: price movements pair an arrow glyph with `sr-only` text such as "বেড়েছে" / "কমেছে", so direction is not conveyed by colour alone.
- **Semantic markup**: `nav` landmarks with Bangla labels, `scope="col"` table headers, `aria-labelledby` section headings, `aria-current` on the active route, and visible `focus-visible` rings on every interactive element.

---

## Deployment

The project deploys to **Vercel** with no extra configuration beyond environment variables.

1. Import the repository into Vercel.
2. Add `MONGODB_URI`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` in **Project → Settings → Environment Variables**.
3. Set `BETTER_AUTH_URL` to the deployed origin and add the matching OAuth callback URLs in the Google and GitHub consoles.
4. Deploy.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are server-rendered on demand, so direct URL navigation and refreshes work without additional rewrite rules.

---

## Author

**GOURAB** — Programming Hero, Full Stack Web Development (Assignment 7)

- GitHub: [@Avijit35cse](https://github.com/Avijit35cse)
- Live project: [bazar-dor-b14.vercel.app](https://bazar-dor-b14.vercel.app)

---

<p align="center">
  <b>বাজার দর</b> — প্রয়োজনীয় পণ্যের দাম এক নজরে। 🇧🇩
</p>
