import Link from 'next/link';
import { count, desc, eq } from 'drizzle-orm';
import { AlertTriangle, FileText, Newspaper, PenSquare, Users } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';

export default async function AdminHome() {
  const admin = await requireAdmin();
  const [[posts], [published], [admins], recent] = await Promise.all([
    db().select({ n: count() }).from(schema.blogPosts),
    db().select({ n: count() }).from(schema.blogPosts).where(eq(schema.blogPosts.status, 'published')),
    db().select({ n: count() }).from(schema.adminUsers),
    db().select({ key: schema.content.key, updatedAt: schema.content.updatedAt }).from(schema.content).orderBy(desc(schema.content.updatedAt)).limit(5),
  ]);

  const cards = [
    { href: '/admin/content', label: 'Website content', detail: 'Pages, services, audiences, legal', icon: FileText },
    { href: '/admin/blog', label: 'Blog', detail: `${published.n} published · ${posts.n - published.n} drafts`, icon: Newspaper },
    { href: '/admin/users', label: 'Admins', detail: `${admins.n} account${admins.n === 1 ? '' : 's'}`, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Hello, {admin.name.split(' ')[0]}</h1>
        <p className="mt-1 text-sm text-neutral-500">Edit the website and publish blog posts. Changes go live as soon as you save.</p>
      </header>

      {!process.env.BLOB_READ_WRITE_TOKEN && (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>
            <strong>Image uploads aren’t switched on.</strong> Connect a Vercel Blob store to this project so BLOB_READ_WRITE_TOKEN is set.
            Until then you can choose from the site’s existing photos.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ href, label, detail, icon: Icon }) => (
          <Link key={href} href={href} className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-brand-orange hover:shadow-md">
            <Icon className="h-6 w-6 text-brand-orange" aria-hidden="true" />
            <p className="mt-3 font-bold">{label}</p>
            <p className="text-sm text-neutral-500">{detail}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:brightness-95">
          <PenSquare className="h-4 w-4" aria-hidden="true" /> Write a blog post
        </Link>
        <Link href="/admin/content/home" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-bold hover:border-brand-ink">
          Edit the home page
        </Link>
      </div>

      {recent.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Recently edited</h2>
          <ul className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {recent.map((row) => (
              <li key={row.key}>
                <Link href={`/admin/content/${row.key.replace(':', '/')}`} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50">
                  <span className="font-semibold">{row.key}</span>
                  <span className="text-neutral-500">{row.updatedAt.toLocaleString('en-GB')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
