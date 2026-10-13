import 'server-only';
import type { ListedVacancy } from '@/lib/careers/shared';

/*
 * Vacancies from SeeMeHired, the group's applicant tracking system. Their
 * public jobs feed is plain JSON (no key needed); people apply on the job's
 * SeeMeHired page.
 */

const FEED = 'https://api.seemehired.com/public/jobs/embed?companyId=384&fullTime=1&partTime=1';
const jobUrl = (id: number) => `https://seemehired.com/jobs/${id}`;

/** The fields we use from each job in the feed. */
interface SmhJob {
  id: number;
  title?: string;
  isActive?: boolean;
  salary?: string;
  contractType?: { name?: string } | null;
  location?: { cityName?: string; name?: string } | null;
  /** Unix seconds. */
  publishedAt?: number;
  /** Unix seconds; applications close at this moment. */
  openUntil?: number;
}

/** yyyy-mm-dd in UK time, from unix seconds. */
const ukDay = (seconds: number) => new Date(seconds * 1000).toLocaleDateString('en-CA', { timeZone: 'Europe/London' });

function toVacancy(job: SmhJob, index: number): ListedVacancy | null {
  if (!job.id || !job.title) return null;
  return {
    slug: `seemehired-${job.id}`,
    title: job.title,
    open: job.isActive !== false && (!job.openUntil || job.openUntil * 1000 > Date.now()),
    hours: job.contractType?.name ?? '',
    location: (job.location?.cityName || job.location?.name || '').trim(),
    salary: job.salary ?? '',
    listedOn: job.publishedAt ? ukDay(job.publishedAt) : '',
    closingDate: job.openUntil ? ukDay(job.openUntil) : '',
    summary: '',
    description: '',
    order: 1000 + index,
    externalUrl: jobUrl(job.id),
  };
}

/** Live jobs on SeeMeHired, refreshed every 10 minutes. Empty if the feed can't be reached. */
export async function getSeeMeHiredVacancies(): Promise<ListedVacancy[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { items } = (await res.json()) as { items?: SmhJob[] };
    return (Array.isArray(items) ? items : []).map(toVacancy).filter((v): v is ListedVacancy => v !== null);
  } catch (error) {
    // A SeeMeHired outage shouldn't take the careers page down with it.
    console.error('SeeMeHired vacancies:', error);
    return [];
  }
}
