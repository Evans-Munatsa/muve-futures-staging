'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { formatVacancyDate, isAcceptingApplications, type ListedVacancy } from '@/lib/careers/shared';
import type { ContactPageContent } from '@/lib/content/pages';

const DAY = 24 * 60 * 60 * 1000;
const noSubscribe = () => () => {};
// Read once per page load, so every render agrees on "today".
let loadedAt: number | null = null;
const browserNow = () => (loadedAt ??= Date.now());

function listedAgo(listedOn: string, now: number): string {
  const days = Math.floor((now - Date.parse(listedOn)) / DAY);
  if (Number.isNaN(days)) return '';
  if (days <= 0) return 'Listed today';
  if (days === 1) return 'Listed yesterday';
  if (days < 7) return `Listed ${days} days ago`;
  if (days < 30) return `Listed ${Math.floor(days / 7)} week${days < 14 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  return `Listed ${months} month${months === 1 ? '' : 's'} ago`;
}

/**
 * "Now" for dates and open/closed. The page is rendered (and cached) on the
 * server at `renderedAt`; the browser starts from that same moment so
 * hydration matches, then switches to its own clock.
 */
export function useNow(renderedAt: number) {
  return useSyncExternalStore(noSubscribe, browserNow, () => renderedAt);
}

/** "Listed 2 weeks ago", or the date if it can't be read. */
export function listedLabel(listedOn: string, now: number) {
  return listedAgo(listedOn, now) || (formatVacancyDate(listedOn) && `Listed ${formatVacancyDate(listedOn)}`);
}

const pill =
  'inline-flex h-9 min-w-20 items-center justify-center rounded-full px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg lg:u-h-38 lg:u-min-w-92 lg:u-px-20 lg:u-text-16';

/** Vacancies in a scrolling dark panel; each row links to the job's own page. */
export function Careers({
  content,
  vacancies,
  renderedAt,
  headingLevel = 'h2',
}: {
  content: ContactPageContent['careers'];
  vacancies: ListedVacancy[];
  /** When the server rendered the page (ms), see useNow. */
  renderedAt: number;
  /** h1 on /careers, h2 on the contact page. */
  headingLevel?: 'h1' | 'h2';
}) {
  const now = useNow(renderedAt);
  const Heading = headingLevel;

  return (
    <section id="careers" className="relative z-20 mx-auto mt-16 w-[90%] scroll-mt-36 lg:u-mt-110 lg:u-w-1202">
      <Reveal>
        <Heading className="text-center text-3xl font-bold tracking-tight text-white sm:text-5xl lg:u-text-94">{content.title}</Heading>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-[2rem] bg-brand-ink p-4 sm:p-6 lg:u-mt-50 lg:u-rounded-60 lg:u-p-42 lg:u-pr-30">
        {vacancies.length === 0 ? (
          <p className="rounded-[2rem] bg-white px-8 py-6 text-center text-sm font-semibold text-brand-teal lg:rounded-full lg:u-text-20">{content.emptyMessage}</p>
        ) : (
          // Three rows show at once; the rest scroll, with the design's coral scrollbar.
          <ul className="scrollbar-coral max-h-[34rem] space-y-3 overflow-y-auto pr-2 lg:u-max-h-440 lg:space-y-0 lg:u-pr-24">
            {vacancies.map((vacancy) => {
              const open = isAcceptingApplications(vacancy, new Date(now));
              const href = `/careers/${vacancy.slug}`;
              return (
                <li
                  key={vacancy.slug}
                  className="grid gap-3 rounded-[2rem] bg-white px-6 py-5 text-brand-teal sm:grid-cols-[1fr_auto] sm:items-center lg:u-h-137 lg:grid-cols-[minmax(0,1fr)_calc(var(--u)*180)_calc(var(--u)*130)_auto] lg:u-gap-x-20 lg:rounded-full lg:py-0 lg:u-px-60 lg:[&:not(:first-child)]:u-mt-14"
                >
                  <div>
                    <h3 className="text-lg font-bold leading-tight lg:u-text-30">
                      <Link href={href} className="hover:underline">
                        {vacancy.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-medium lg:u-mt-4 lg:u-text-24">{[vacancy.hours, vacancy.location].filter(Boolean).join(' | ')}</p>
                  </div>
                  <p className="text-xs sm:col-start-1 lg:col-start-auto lg:u-text-18">{listedLabel(vacancy.listedOn, now)}</p>
                  <p className="text-xs sm:col-start-1 lg:col-start-auto lg:u-text-18">Status: {open ? 'Open' : 'Closed'}</p>
                  <div className="flex gap-2 sm:col-start-2 sm:row-span-3 sm:row-start-1 lg:col-start-auto lg:row-span-1 lg:row-start-auto lg:u-gap-14">
                    <Link href={href} aria-label={`View ${vacancy.title}`} className={cn(pill, 'bg-brand-teal hover:bg-brand-teal/90')}>
                      View
                    </Link>
                    {open ? (
                      <Link href={`${href}#apply`} aria-label={`Apply for ${vacancy.title}`} className={cn(pill, 'bg-brand-orange hover:bg-[#d94e20]')}>
                        Apply
                      </Link>
                    ) : (
                      <span className={cn(pill, 'cursor-not-allowed bg-neutral-400 hover:translate-y-0 hover:shadow-none')}>Closed</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
