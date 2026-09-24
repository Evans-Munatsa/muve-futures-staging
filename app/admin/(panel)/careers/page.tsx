import type { Metadata } from 'next';
import Link from 'next/link';
import { and, count, desc, eq, like, type SQL } from 'drizzle-orm';
import { ExternalLink, Pencil } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { NewItemForm } from '@/components/admin/NewItemForm';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { isAcceptingApplications, STATUS_LABELS } from '@/lib/careers/shared';
import type { Vacancy } from '@/lib/content/pages';
import type { ApplicationStatus } from '@/lib/db/schema';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Careers' };

const pill = (active: boolean) =>
  cn('rounded-full border px-3 py-1 text-xs font-bold transition', active ? 'border-brand-ink bg-brand-ink text-white' : 'border-neutral-300 bg-white hover:border-brand-ink');

export default async function CareersAdmin({ searchParams }: PageProps<'/admin/careers'>) {
  await requireAdmin();
  const params = await searchParams;
  const role = typeof params.role === 'string' ? params.role : '';
  const status = typeof params.status === 'string' && Object.hasOwn(STATUS_LABELS, params.status) ? (params.status as ApplicationStatus) : '';

  const filters: SQL[] = [];
  if (role) filters.push(eq(schema.jobApplications.vacancySlug, role));
  if (status) filters.push(eq(schema.jobApplications.status, status));

  const [vacancyRows, counts, applications] = await Promise.all([
    db().select({ key: schema.content.key, data: schema.content.data }).from(schema.content).where(like(schema.content.key, 'vacancy:%')),
    db()
      .select({ slug: schema.jobApplications.vacancySlug, status: schema.jobApplications.status, n: count() })
      .from(schema.jobApplications)
      .groupBy(schema.jobApplications.vacancySlug, schema.jobApplications.status),
    db()
      .select({
        id: schema.jobApplications.id,
        reference: schema.jobApplications.reference,
        firstName: schema.jobApplications.firstName,
        lastName: schema.jobApplications.lastName,
        vacancyTitle: schema.jobApplications.vacancyTitle,
        status: schema.jobApplications.status,
        createdAt: schema.jobApplications.createdAt,
      })
      .from(schema.jobApplications)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(schema.jobApplications.createdAt))
      .limit(500),
  ]);

  const vacancies = vacancyRows
    .map((row) => ({ slug: row.key.slice('vacancy:'.length), ...(row.data as Vacancy) }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const totalFor = (slug: string) => counts.filter((c) => c.slug === slug).reduce((sum, c) => sum + c.n, 0);
  const newFor = (slug: string) => counts.find((c) => c.slug === slug && c.status === 'new')?.n ?? 0;
  const query = (next: { role?: string; status?: string }) => {
    const q = new URLSearchParams();
    const r = next.role ?? role;
    const s = next.status ?? status;
    if (r) q.set('role', r);
    if (s) q.set('status', s);
    const str = q.toString();
    return `/admin/careers${str ? `?${str}` : ''}`;
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Careers</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Vacancies appear at /careers and on the contact page. Each has its own page where people apply; their applications land here.
        </p>
      </header>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Vacancies</h2>
          <NewItemForm collection="vacancy" noun="vacancy" pathPrefix="/careers/" />
        </div>
        {vacancies.length === 0 ? (
          <p className="mt-2 rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
            No vacancies yet. Use “Add vacancy” to create one. New vacancies start closed, so nothing goes live until you switch on “Open for applications”.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {vacancies.map((v) => {
              const open = isAcceptingApplications(v);
              return (
                <li key={v.slug} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{v.title || v.slug}</span>
                    <span className="block text-xs text-neutral-500">
                      /careers/{v.slug} · {[v.hours, v.location].filter(Boolean).join(' · ')}
                      {v.closingDate && ` · closes ${v.closingDate}`}
                    </span>
                  </span>
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', open ? 'bg-brand-lime text-brand-ink' : 'bg-neutral-100 text-neutral-600')}>
                    {open ? 'Open' : 'Closed'}
                  </span>
                  <Link href={query({ role: v.slug })} className="text-xs font-semibold text-brand-ink hover:underline">
                    {totalFor(v.slug)} application{totalFor(v.slug) === 1 ? '' : 's'}
                    {newFor(v.slug) > 0 && <span className="ml-1 rounded-full bg-brand-orange px-1.5 py-0.5 text-[10px] font-bold text-white">{newFor(v.slug)} new</span>}
                  </Link>
                  <Link href={`/admin/content/vacancy/${v.slug}`} className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1 text-xs font-bold hover:border-brand-ink">
                    <Pencil className="h-3 w-3" aria-hidden="true" /> Edit
                  </Link>
                  <a href={`/careers/${v.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-brand-ink" aria-label={`View ${v.title} on the website`}>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Applications</h2>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Filter by role">
          <Link href={query({ role: '' })} className={pill(!role)}>
            All roles
          </Link>
          {vacancies.map((v) => (
            <Link key={v.slug} href={query({ role: v.slug })} className={pill(role === v.slug)}>
              {v.title || v.slug}
            </Link>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2" aria-label="Filter by status">
          <Link href={query({ status: '' })} className={pill(!status)}>
            Any status
          </Link>
          {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
            <Link key={s} href={query({ status: s })} className={pill(status === s)}>
              {STATUS_LABELS[s]}
            </Link>
          ))}
        </div>

        {applications.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
            {role || status ? 'No applications match these filters.' : 'No applications yet.'}
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {applications.map((a) => (
              <li key={a.id}>
                <Link href={`/admin/careers/${a.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">
                      {a.firstName} {a.lastName}
                    </span>
                    <span className="block truncate text-xs text-neutral-500">
                      {a.vacancyTitle} · {a.reference}
                    </span>
                  </span>
                  <StatusBadge status={a.status} />
                  <span className="hidden w-32 text-right text-xs text-neutral-500 sm:block">
                    {a.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
