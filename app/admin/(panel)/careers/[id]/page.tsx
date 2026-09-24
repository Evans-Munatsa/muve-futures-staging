import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { ApplicationStatusForm } from '@/components/admin/ApplicationStatusForm';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { deleteApplication } from '@/lib/admin/application-actions';

export const metadata: Metadata = { title: 'Application' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ApplicationPage({ params }: PageProps<'/admin/careers/[id]'>) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const [a] = await db().select().from(schema.jobApplications).where(eq(schema.jobApplications.id, id));
  if (!a) notFound();

  const details: [string, React.ReactNode][] = [
    ['Email', <a key="e" href={`mailto:${a.email}`} className="font-semibold underline">{a.email}</a>],
    ['Phone', <a key="p" href={`tel:${a.phone.replace(/\s/g, '')}`} className="font-semibold underline">{a.phone}</a>],
    ['Based in', a.location || '—'],
    ['Right to work in the UK', a.rightToWork],
    ['Heard about the role', a.heardAbout || '—'],
    ['Received', a.createdAt.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })],
  ];
  const cvHref = `/api/admin/applications/${a.id}/cv`;

  return (
    <div className="space-y-6">
      <Link href="/admin/careers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-brand-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All applications
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {a.firstName} {a.lastName}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {a.vacancyTitle} ·{' '}
            <Link href={`/admin/careers?role=${a.vacancySlug}`} className="underline">
              other applicants
            </Link>{' '}
            · ref {a.reference}
          </p>
        </div>
        <StatusBadge status={a.status} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <dl className="grid gap-x-6 gap-y-3 rounded-xl border border-neutral-200 bg-white p-4 text-sm sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</dt>
                <dd className="mt-0.5 break-words">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500">CV</h2>
            <p className="mt-1 text-sm">{a.cvFileName}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={cvHref} className="inline-flex items-center gap-1.5 rounded-full bg-brand-ink px-4 py-1.5 text-xs font-bold text-white hover:bg-brand-ink/90">
                <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download
              </a>
              {a.cvContentType === 'application/pdf' && (
                <a href={`${cvHref}?view=1`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-bold hover:border-brand-ink">
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Open in browser
                </a>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500">Why they’re interested</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{a.coverLetter || '—'}</p>
          </section>
        </div>

        <aside className="space-y-4">
          <ApplicationStatusForm id={a.id} status={a.status} notes={a.notes} />
          <ConfirmButton action={deleteApplication.bind(null, a.id)} confirm="Delete this application and the CV for good? This can’t be undone." danger>
            Delete application
          </ConfirmButton>
          <p className="text-xs text-neutral-500">
            Delete applications you no longer need (for example six months after the role is filled) so personal data isn’t kept longer than necessary.
          </p>
        </aside>
      </div>
    </div>
  );
}
