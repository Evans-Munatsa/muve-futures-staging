import Image from 'next/image';
import Link from 'next/link';
import { count, eq, isNull } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth/dal';
import { db, schema } from '@/lib/db';
import { AdminNav } from '@/components/admin/AdminNav';

/** Badge counts for the menu; a database hiccup just hides them. */
async function menuCounts() {
  try {
    const [[inbox], [careers]] = await Promise.all([
      db().select({ n: count() }).from(schema.formSubmissions).where(isNull(schema.formSubmissions.readAt)),
      db().select({ n: count() }).from(schema.jobApplications).where(eq(schema.jobApplications.status, 'new')),
    ]);
    return { inbox: inbox.n, careers: careers.n };
  } catch {
    return { inbox: 0, careers: 0 };
  }
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const counts = await menuCounts();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="shrink-0 bg-brand-ink md:sticky md:top-0 md:h-screen md:w-60">
        <Link href="/admin" className="block px-5 pt-5" aria-label="Dashboard home">
          <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-auto w-32" />
        </Link>
        <AdminNav name={admin.name} counts={counts} />
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
