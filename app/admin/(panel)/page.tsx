import Link from 'next/link';
import { count, desc, eq, isNull } from 'drizzle-orm';
import { AlertTriangle, Briefcase, FileText, Inbox, Lock, Newspaper, PenSquare, Users } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { ADMIN_AREAS, canAccess, contentArea, isArea, isSuperAdmin, type AdminArea } from '@/lib/auth/permissions';

export default async function AdminHome({ searchParams }: PageProps<'/admin'>) {
  const admin = await requireAdmin();
  const { denied } = await searchParams;
  const can = (area: AdminArea) => canAccess(admin, area);
  const [[posts], [published], [admins], [newApplications], [unreadMessages], recent] = await Promise.all([
    db().select({ n: count() }).from(schema.blogPosts),
    db().select({ n: count() }).from(schema.blogPosts).where(eq(schema.blogPosts.status, 'published')),
    db().select({ n: count() }).from(schema.adminUsers),
    db().select({ n: count() }).from(schema.jobApplications).where(eq(schema.jobApplications.status, 'new')),
    db().select({ n: count() }).from(schema.formSubmissions).where(isNull(schema.formSubmissions.readAt)),
    db().select({ key: schema.content.key, updatedAt: schema.content.updatedAt }).from(schema.content).orderBy(desc(schema.content.updatedAt)).limit(5),
  ]);

  const cards: { area: AdminArea | null; href: string; label: string; detail: string; icon: typeof Inbox }[] = [
    {
      area: 'inbox',
      href: '/admin/inbox',
      label: 'Inbox',
      detail: unreadMessages.n ? `${unreadMessages.n} unread message${unreadMessages.n === 1 ? '' : 's'}` : 'Messages from the website’s forms',
      icon: Inbox,
    },
    { area: 'content', href: '/admin/content', label: 'Website content', detail: 'Pages, services, audiences, legal', icon: FileText },
    { area: 'blog', href: '/admin/blog', label: 'Blog', detail: `${published.n} published · ${posts.n - published.n} drafts`, icon: Newspaper },
    {
      area: 'careers',
      href: '/admin/careers?status=new',
      label: 'Careers',
      detail: newApplications.n ? `${newApplications.n} new application${newApplications.n === 1 ? '' : 's'}` : 'Vacancies and applications',
      icon: Briefcase,
    },
    isSuperAdmin(admin)
      ? { area: null, href: '/admin/users', label: 'Admins', detail: `${admins.n} account${admins.n === 1 ? '' : 's'}`, icon: Users }
      : { area: null, href: '/admin/users', label: 'Your account', detail: 'Change your password', icon: Users },
  ];
  const shownCards = cards.filter((card) => !card.area || can(card.area));
  const recentShown = recent.filter((row) => can(contentArea(row.key)));
  const deniedLabel = denied === 'admins' ? 'managing admins' : isArea(denied) ? ADMIN_AREAS[denied].label : null;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Hello, {admin.name.split(' ')[0]}</h1>
        <p className="mt-1 text-sm text-neutral-500">Read messages from the website, edit its content and publish blog posts. Changes go live as soon as you save.</p>
      </header>

      {deniedLabel && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
          <Lock className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p>
            <strong>You don’t have access to {deniedLabel}.</strong> Ask a super admin if you need it.
          </p>
        </div>
      )}

      {!process.env.BLOB_READ_WRITE_TOKEN && (can('content') || can('blog') || can('careers')) && (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>
            <strong>Image uploads aren’t switched on.</strong> Connect a Vercel Blob store to this project so BLOB_READ_WRITE_TOKEN is set.
            Until then you can choose from the site’s existing photos.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shownCards.map(({ href, label, detail, icon: Icon }) => (
          <Link key={href} href={href} className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-brand-orange hover:shadow-md">
            <Icon className="h-6 w-6 text-brand-orange" aria-hidden="true" />
            <p className="mt-3 font-bold">{label}</p>
            <p className="text-sm text-neutral-500">{detail}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {can('blog') && (
          <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:brightness-95">
            <PenSquare className="h-4 w-4" aria-hidden="true" /> Write a blog post
          </Link>
        )}
        {can('content') && (
          <Link href="/admin/content/home" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-bold hover:border-brand-ink">
            Edit the home page
          </Link>
        )}
      </div>

      {recentShown.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Recently edited</h2>
          <ul className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {recentShown.map((row) => (
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
