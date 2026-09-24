import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JobPage } from '@/components/careers/JobPage';
import { isAcceptingApplications, renderTime, type ListedVacancy } from '@/lib/careers/shared';
import { getCollection, getCollectionItem, getSingle } from '@/lib/content/queries';

// Re-render regularly so a role past its closing date stops showing the form.
export const revalidate = 600;

// Vacancies added in the dashboard later are rendered on first visit.
export async function generateStaticParams() {
  const vacancies = await getCollection('vacancy');
  return vacancies.map((vacancy) => ({ slug: vacancy.slug }));
}

export async function generateMetadata({ params }: PageProps<'/careers/[slug]'>): Promise<Metadata> {
  const vacancy = await getCollectionItem('vacancy', (await params).slug);
  if (!vacancy) return {};
  const title = `${vacancy.title} | Careers`;
  const description = vacancy.summary || `${vacancy.title}, ${[vacancy.hours, vacancy.location].filter(Boolean).join(', ')}. Apply online at MUVE Futures.`;
  return { title, description, openGraph: { title, description } };
}

const EMPLOYMENT_TYPES: Record<string, string> = {
  'full time': 'FULL_TIME',
  'part time': 'PART_TIME',
  contract: 'CONTRACTOR',
  temporary: 'TEMPORARY',
  volunteer: 'VOLUNTEER',
};

/** Google for Jobs: https://developers.google.com/search/docs/appearance/structured-data/job-posting */
function jobPostingJsonLd(vacancy: ListedVacancy, siteName: string, address: { lines: string[] }) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: vacancy.title,
    description: [vacancy.summary, vacancy.description].filter(Boolean).join('\n\n'),
    datePosted: vacancy.listedOn || undefined,
    validThrough: vacancy.closingDate ? `${vacancy.closingDate}T23:59:59+01:00` : undefined,
    employmentType: EMPLOYMENT_TYPES[vacancy.hours.trim().toLowerCase()],
    hiringOrganization: { '@type': 'Organization', name: siteName },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: vacancy.location || address.lines.at(-2), addressCountry: 'GB' },
    },
  };
  // Escape "<" so text in the advert can't close the script tag.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default async function VacancyPage({ params }: PageProps<'/careers/[slug]'>) {
  const { slug } = await params;
  const [vacancy, settings] = await Promise.all([getCollectionItem('vacancy', slug), getSingle('settings')]);
  if (!vacancy) notFound();

  const now = renderTime();
  return (
    <>
      {isAcceptingApplications(vacancy, new Date(now)) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jobPostingJsonLd(vacancy, settings.siteName, settings.address) }} />
      )}
      <JobPage vacancy={vacancy} now={now} />
    </>
  );
}
