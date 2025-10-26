# Meetup 002

A modern Next.js application built with TypeScript, Tailwind CSS, and next-intl for internationalization.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result (note: HTTPS with self-signed certificate).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Font:** Inter (Google Fonts)
- **Package Manager:** pnpm

## Project Structure

```
meetup-002/
├── app/              # App Router directory
│   ├── layout.tsx    # Root layout with i18n provider
│   ├── page.tsx      # Home page (server component)
│   └── globals.css   # Global styles
├── messages/         # Translation files
│   ├── en.json       # English translations
│   └── it.json       # Italian translations
├── i18n/             # i18n configuration
│   └── request.ts    # next-intl request config
├── public/           # Static assets
├── package.json      # Dependencies
└── tsconfig.json     # TypeScript config
```

## Internationalization

The app supports English and Italian. Translations are managed in `messages/en.json` and `messages/it.json`. The default locale is English.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

