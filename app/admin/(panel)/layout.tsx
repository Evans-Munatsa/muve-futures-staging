import Image from 'next/image';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/dal';
import { AdminNav } from '@/components/admin/AdminNav';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="shrink-0 bg-brand-ink md:sticky md:top-0 md:h-screen md:w-60">
        <Link href="/admin" className="block px-5 pt-5" aria-label="Dashboard home">
          <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-auto w-32" />
        </Link>
        <AdminNav name={admin.name} />
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
