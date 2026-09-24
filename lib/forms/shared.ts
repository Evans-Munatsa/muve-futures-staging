/** Shared by the website forms (browser), their server actions and the dashboard Inbox. */
import type { FormKind, SubmissionStatus } from '@/lib/db/schema';

/** Each form's inbox in the dashboard. `prefix` starts its reference numbers. */
export const INBOXES: Record<FormKind, { label: string; description: string; prefix: string; path: string }> = {
  contact: { label: 'Chat to Us', description: 'General enquiries from the contact page.', prefix: 'MF-E', path: '/contact' },
  referral: { label: 'Referrals', description: 'Learner referrals from Make a Referral.', prefix: 'MF-R', path: '/referral' },
  partnership: { label: 'Partnerships', description: 'Partnership enquiries.', prefix: 'MF-P', path: '/partnerships' },
  'book-intro': { label: 'Intro bookings', description: 'Requests to book an introduction.', prefix: 'MF-I', path: '/book-an-intro' },
  feedback: { label: 'Feedback', description: 'Compliments, complaints and suggestions.', prefix: 'MF-F', path: '/feedback' },
};

export const FORM_KINDS = Object.keys(INBOXES) as FormKind[];

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  open: 'Open',
  resolved: 'Resolved',
  archived: 'Archived',
};

/** What every form's server action returns. */
export type SubmitResult = { ok: true; reference: string } | { ok: false; error: string };

/** Anti-spam values sent with every form (see BotTrap). */
export interface BotMeta {
  /** When the form was first shown (ms). */
  startedAt: number;
  /** A hidden field people never fill in. */
  website: string;
}
