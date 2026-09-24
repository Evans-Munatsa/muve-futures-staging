import { STATUS_LABELS } from '@/lib/careers/shared';
import type { ApplicationStatus } from '@/lib/db/schema';
import { cn } from '@/lib/utils';

const TONES: Record<ApplicationStatus, string> = {
  new: 'bg-brand-orange text-white',
  reviewing: 'bg-brand-cyan/40 text-brand-ink',
  shortlisted: 'bg-brand-lime text-brand-ink',
  interview: 'bg-brand-pink/40 text-brand-ink',
  offered: 'bg-brand-green text-white',
  unsuccessful: 'bg-neutral-100 text-neutral-600',
  withdrawn: 'bg-neutral-100 text-neutral-600',
};

/** A job application's status as a coloured pill. */
export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold', TONES[status])}>{STATUS_LABELS[status]}</span>;
}
