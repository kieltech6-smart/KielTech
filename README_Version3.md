# KielTech

Starter Next.js website scaffold with the following features:
- Landing pages, About, Pricing, Blog (Markdown)
- Contact form (API route using SMTP / Nodemailer)
- Authentication (NextAuth — GitHub + Email providers)
- Payments (Stripe checkout + webhook skeleton)
- Protected admin dashboard (getServerSideProps + NextAuth)
- i18n multi-language support (en & es)
- Tailwind CSS and basic accessibility helpers
- MD blog loader (gray-matter + remark)

## Quick start

1. Clone locally
2. Install
   - npm install
3. Create a `.env.local` with the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# SMTP (for contact form or next-auth email)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=KielTech <no-reply@kieltech.example.com>
CONTACT_TO=you@yourdomain.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
NODE_ENV=development
```

4. Run dev:
   - npm run dev
5. Visit http://localhost:3000

## Notes & next steps
- Replace sample content and logo.
- For CMS and authoring, integrate Sanity/Contentful/Netlify CMS (I can scaffold one if you'd like).
- For search, configure Algolia or Meilisearch; I included SWR for client data fetching.
- For analytics, add Google Tag Manager or Vercel Analytics snippet in pages/_document or a component.
- Harden auth roles (admin/author) by adding a roles claim in JWT or store users in a DB.

If you want, I can:
- Deploy this to Vercel and wire environment variables.
- Add a headless CMS (Sanity) and wire the admin editing UI.
- Add Algolia search and server-side indexing.
- Replace email sending with SendGrid and create transactional templates.
- Implement full Stripe products/prices & subscription billing.

A few final notes
- Environment variables are required before auth, email, and payments will work.
- This is a skeleton — all critical integrations (CMS, search index, analytics, production email, webhooks) are stubbed and ready for your keys.