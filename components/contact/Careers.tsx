'use client';

import { useState, useSyncExternalStore } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import type { ContactPageContent, Vacancy } from '@/lib/content/pages';

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

function listedOnDate(listedOn: string): string {
  const date = new Date(listedOn);
  return Number.isNaN(date.getTime()) ? '' : `Listed ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

function applyHref(vacancy: Vacancy, email: string): string {
  if (vacancy.applyUrl) return vacancy.applyUrl;
  return `mailto:${email}?subject=${encodeURIComponent(`Application: ${vacancy.title}`)}`;
}

const pill = 'inline-flex h-9 min-w-20 items-center justify-center rounded-full px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg lg:u-h-38 lg:u-min-w-92 lg:u-px-20 lg:u-text-16';

function ApplyLink({ vacancy, email, className }: { vacancy: Vacancy; email: string; className?: string }) {
  if (!vacancy.open) {
    return <span className={cn(pill, 'cursor-not-allowed bg-neutral-400 hover:translate-y-0 hover:shadow-none', className)}>Closed</span>;
  }
  const external = /^https?:\/\//.test(vacancy.applyUrl);
  return (
    <a
      href={applyHref(vacancy, email)}
      aria-label={`Apply for ${vacancy.title}`}
      className={cn(pill, 'bg-brand-orange hover:bg-[#d94e20]', className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      Apply
    </a>
  );
}

/** Vacancies in a scrolling dark panel; "View" opens the full description. */
export function Careers({ content, email }: { content: ContactPageContent['careers']; email: string }) {
  const [viewing, setViewing] = useState<Vacancy | null>(null);
  // Relative dates depend on today, so they're worked out in the browser; the
  // server-rendered (and possibly cached) page shows the date instead.
  const now = useSyncExternalStore(noSubscribe, browserNow, () => null);

  const listed = (v: Vacancy) => (now ? listedAgo(v.listedOn, now) : listedOnDate(v.listedOn));

  return (
    <section id="careers" className="relative z-20 mx-auto w-[90%] scroll-mt-36 lg:u-mt-110 lg:u-w-1202 mt-16">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-5xl lg:u-text-94">{content.title}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-[2rem] bg-brand-ink p-4 sm:p-6 lg:u-mt-50 lg:u-rounded-60 lg:u-p-42 lg:u-pr-30">
        {content.vacancies.length === 0 ? (
          <p className="rounded-full bg-white px-8 py-6 text-center text-sm font-semibold text-brand-teal lg:u-text-20">{content.emptyMessage}</p>
        ) : (
          // Three rows show at once; the rest scroll, with the design's coral scrollbar.
          <ul className="scrollbar-coral max-h-[34rem] space-y-3 overflow-y-auto lg:overflow-y-scroll pr-2 lg:u-max-h-440 lg:space-y-0 lg:u-pr-24">
            {content.vacancies.map((vacancy, i) => (
              <li
                key={`${vacancy.title}-${i}`}
                className="grid gap-3 rounded-[2rem] bg-white px-6 py-5 text-brand-teal sm:grid-cols-[1fr_auto] sm:items-center lg:u-h-137 lg:grid-cols-[minmax(0,1fr)_calc(var(--u)*180)_calc(var(--u)*130)_auto] lg:u-gap-x-20 lg:rounded-full lg:py-0 lg:u-px-60 lg:[&:not(:first-child)]:u-mt-14"
              >
                <div>
                  <h3 className="text-lg font-bold leading-tight lg:u-text-30">{vacancy.title}</h3>
                  <p className="mt-1 text-sm font-medium lg:u-mt-4 lg:u-text-24">
                    {[vacancy.hours, vacancy.location].filter(Boolean).join(' | ')}
                  </p>
                </div>
                <p className="text-xs sm:col-start-1 lg:col-start-auto lg:u-text-18">{listed(vacancy)}</p>
                <p className="text-xs sm:col-start-1 lg:col-start-auto lg:u-text-18">Status: {vacancy.open ? 'Open' : 'Closed'}</p>
                <div className="flex gap-2 sm:col-start-2 sm:row-span-3 sm:row-start-1 lg:col-start-auto lg:row-span-1 lg:row-start-auto lg:u-gap-14">
                  <button
                    type="button"
                    onClick={() => setViewing(vacancy)}
                    aria-label={`View ${vacancy.title}`}
                    className={cn(pill, 'cursor-pointer bg-brand-teal hover:bg-brand-teal/90')}
                  >
                    View
                  </button>
                  <ApplyLink vacancy={vacancy} email={email} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Dialog open={viewing !== null} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="max-w-2xl rounded-tr-[3rem] rounded-bl-3xl rounded-br-3xl rounded-tl-3xl p-8 text-brand-teal sm:p-10">
          {viewing && (
            <>
              <DialogTitle className="pr-8 text-2xl font-bold sm:text-3xl">{viewing.title}</DialogTitle>
              <DialogDescription className="text-base font-medium text-brand-teal">
                {[viewing.hours, viewing.location].filter(Boolean).join(' | ')} · {listed(viewing)} · Status: {viewing.open ? 'Open' : 'Closed'}
              </DialogDescription>
              <div className="mt-2 space-y-4 text-sm leading-relaxed whitespace-pre-line text-brand-ink sm:text-base">
                {viewing.description
                  .split(/\n\s*\n/)
                  .filter((p) => p.trim())
                  .map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
              </div>
              <div className="mt-4">
                <ApplyLink vacancy={viewing} email={email} className="h-11 px-8 text-base" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
