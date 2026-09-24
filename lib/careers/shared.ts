/** Shared by the careers pages (browser and server) and the application action. */
import type { Vacancy } from '@/lib/content/pages';

/**
 * Whether a vacancy is taking applications at `now`. It closes at the end of
 * its closing date, UK time.
 */
export function isAcceptingApplications(vacancy: { open: boolean; closingDate: string }, now = new Date()): boolean {
  if (!vacancy.open) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(vacancy.closingDate)) return true;
  // The last moment of that day in London, whether it's GMT or BST.
  const endOfDayUtc = Date.parse(`${vacancy.closingDate}T23:59:59Z`);
  const londonOffset = new Date(endOfDayUtc).toLocaleString('en-GB', { timeZone: 'Europe/London', timeZoneName: 'short' }).includes('BST') ? 60 : 0;
  return now.getTime() <= endOfDayUtc - londonOffset * 60 * 1000;
}

/** A vacancy with its web address, as listed on the site. */
export type ListedVacancy = Vacancy & { slug: string };

/** 9 September 2026, or '' if the date can't be read. */
export function formatVacancyDate(date: string): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' });
}

/** The time a server page renders at, handed to Careers' useNow (kept out of component bodies). */
export const renderTime = () => Date.now();

/** Keep under Vercel's 4.5MB request limit, with room for the other fields. */
export const CV_MAX_BYTES = 4 * 1024 * 1024;

export const CV_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const RIGHT_TO_WORK = ['Yes', 'No', 'I would need sponsorship'] as const;

export type ApplyState =
  | { ok: null }
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export const STATUS_LABELS = {
  new: 'New',
  reviewing: 'Reviewing',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  offered: 'Offered',
  unsuccessful: 'Unsuccessful',
  withdrawn: 'Withdrawn',
} as const;
