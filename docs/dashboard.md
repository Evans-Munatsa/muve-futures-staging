# Admin dashboard

The site has a built-in dashboard at **`/admin`** for editing website content and publishing blog posts. Content is stored in Postgres (Neon) through Drizzle; images and PDFs are uploaded to Vercel Blob.

## What can be edited

| In the dashboard | Where it appears |
| --- | --- |
| **Site settings** | Contact details, office address, social links, footer credit, browser-tab title and search description, coming-soon heading |
| **Home, About, Services overview, Who we support overview, Form pages, Resources** | All the text (and the Resources policy files and FAQs) on those pages |
| **Services** | Each service card and its full page at `/services/…`. Add, remove, reorder, and hide from the carousel |
| **Who we support** | Each audience card and its page at `/who-we-support/…`. Add, remove, reorder |
| **Legal pages** | The five footer pages (Privacy Policy etc.) |
| **Blog** | Posts at `/blog/…`, written in Markdown with a live preview. Drafts, publishing and scheduled posts. The latest posts also appear in Resources → Guides |
| **Admins** | Add or remove people who can sign in; change your password |

Layout, colours and animations stay in code. Headings can contain line breaks: press Enter where the line should break on larger screens.

Anything that hasn't been edited shows the site's original copy, so the site works even before the database is set up.

## One-time setup

1. **Create the database.** In [Neon](https://neon.tech), create a project and copy its connection string.
   In Vercel you can instead add Neon from **Storage → Create Database**, which sets `DATABASE_URL` for you.

2. **Set the environment variables** locally in `.env.local` (copy `.env.example`) and in Vercel → **Settings → Environment Variables**:

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | Neon connection string |
   | `SESSION_SECRET` | A random secret: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
   | `BLOB_READ_WRITE_TOKEN` | Set automatically when you connect a **Vercel Blob** store (Storage → Blob). Needed for uploads |

3. **Create the tables** (run once, and again whenever `lib/db/schema.ts` changes):

   ```bash
   npm run db:migrate
   ```

4. **Copy the current site copy into the database** and add the sample blog posts:

   ```bash
   npm run db:seed
   ```

   This never overwrites anything already saved. `npm run db:seed -- --force` resets everything to the original copy.

5. **Create your admin account:**

   ```bash
   npm run admin:create
   ```

   You'll be asked for an email, name and password (at least 10 characters). Run it again with the same email to reset a forgotten password.

6. Sign in at **`/admin/login`**.

## Day to day

- **Saving** updates the live site straight away; the next visitor sees the change.
- **Reset to original** (on single pages) discards saved edits for that page.
- **Scheduled posts:** publish with a future date and the post appears on that date (checked hourly).
- The sample blog posts are placeholders built from the original Resources articles; edit or delete them.

## Changing the content structure (developers)

- Tables: `lib/db/schema.ts`. After changing it run `npm run db:generate` then `npm run db:migrate`.
- Each editable document has a schema in `lib/content/schemas.ts` (which builds the dashboard form and validates saves), a type and defaults in `lib/content/pages.ts` or `constants/`, and an entry in `lib/content/registry.ts`.
- Pages read content with `getSingle()`, `getCollection()` and `getPublishedPosts()` from `lib/content/queries.ts`. Reads are cached and tagged; saves refresh them.

## Security

- Passwords are hashed with bcrypt; five wrong attempts lock the account for 15 minutes.
- Sessions are signed, HttpOnly cookies lasting 7 days. Removing an admin signs them out immediately.
- `proxy.ts` keeps signed-out visitors away from `/admin`, and every dashboard page, action and the upload endpoint checks the session against the database as well.
- Uploads accept images (up to 10 MB) and PDFs (up to 20 MB) from signed-in admins only.
- Blog Markdown is rendered without raw HTML, so posts can't inject scripts.
- The dashboard is marked `noindex` so it stays out of search engines.
