import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '@/components/blog/Markdown';
import { ApplicationForm } from '@/components/careers/ApplicationForm';
import { FeedbackShapes } from '@/components/forms/FormShapes';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { formatVacancyDate, isAcceptingApplications, type ListedVacancy } from '@/lib/careers/shared';

/**
 * A vacancy's own page: the advert in a white panel, then the application
 * form on the green page, in the style of the site's other form pages.
 */
export function JobPage({ vacancy, now }: { vacancy: ListedVacancy; now: number }) {
  const open = isAcceptingApplications(vacancy, new Date(now));
  const facts = [
    vacancy.hours,
    vacancy.location,
    vacancy.salary,
    vacancy.closingDate && formatVacancyDate(vacancy.closingDate) && `Closes ${formatVacancyDate(vacancy.closingDate)}`,
  ].filter(Boolean);

  return (
    <div className="relative z-10 w-full overflow-x-clip bg-brand-green pb-20 sm:pb-28 lg:u-pb-150">
      <FeedbackShapes />

      <Stagger onLoad stagger={0.12} delay={0.1} className="relative z-10 mx-auto w-[90%] pt-8 text-center text-white sm:pt-12 lg:u-pt-40">
        <StaggerItem>
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline lg:u-text-19">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All vacancies
          </Link>
        </StaggerItem>
        <StaggerItem from="pop">
          <p className="mt-6 inline-flex min-w-40 items-center justify-center rounded-full border-[3px] border-white px-5 py-1 text-xs font-bold uppercase tracking-wide sm:text-lg lg:u-mt-30 lg:u-h-49 lg:u-min-w-296 lg:u-px-30 lg:py-0 lg:u-text-22 lg:u-border-5">
            Careers
          </p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:u-mt-31 lg:u-max-w-1300 lg:u-text-86">{vacancy.title}</h1>
        </StaggerItem>
        {facts.length > 0 && (
          <StaggerItem>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:u-mt-40 lg:u-gap-14" aria-label="About the role">
              {facts.map((fact) => (
                <li key={fact} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-ink lg:u-px-24 lg:u-py-8 lg:u-text-20">
                  {fact}
                </li>
              ))}
            </ul>
          </StaggerItem>
        )}
      </Stagger>

      <Reveal onLoad delay={0.35} className="relative z-10 mx-auto mt-12 w-[90%] lg:u-mt-110 lg:u-w-1400">
        <article className="rounded-[2.5rem] bg-white px-6 py-10 sm:rounded-[4rem] sm:px-14 sm:py-14 lg:u-rounded-100 lg:u-px-100 lg:u-py-80">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {vacancy.summary && <p className="max-w-3xl text-lg font-bold leading-snug text-brand-ink sm:text-xl lg:u-max-w-900 lg:u-text-28">{vacancy.summary}</p>}
            {open && (
              <a
                href="#apply"
                className="inline-flex h-11 shrink-0 items-center justify-center self-start rounded-full bg-brand-orange px-8 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d94e20] hover:shadow-lg lg:u-h-48 lg:u-px-40 lg:u-text-22"
              >
                Apply Now
              </a>
            )}
          </div>
          {vacancy.description && (
            <div className="mt-8 lg:u-mt-48">
              <Markdown source={vacancy.description} />
            </div>
          )}
          {vacancy.listedOn && formatVacancyDate(vacancy.listedOn) && (
            <p className="mt-10 border-t-2 border-brand-lime pt-5 text-sm text-neutral-600 lg:u-mt-48 lg:u-text-18">Posted {formatVacancyDate(vacancy.listedOn)}</p>
          )}
        </article>
      </Reveal>

      <section id="apply" aria-labelledby="apply-heading" className="relative z-10 mx-auto mt-16 w-[90%] scroll-mt-32 lg:u-mt-110 lg:u-w-1200">
        <Reveal className="text-center text-white">
          <h2 id="apply-heading" className="text-3xl font-bold tracking-tight sm:text-5xl lg:u-text-73">
            {open ? 'Apply For This Role' : 'Applications Have Closed'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-lg lg:u-mt-24 lg:u-max-w-900 lg:u-text-24">
            {open
              ? 'Complete the form below and attach your CV. Fields marked * are required.'
              : 'We’re no longer taking applications for this role. Take a look at our other vacancies, or get in touch to register your interest.'}
          </p>
        </Reveal>

        <div className="mt-10 lg:u-mt-60">
          {open ? (
            <ApplicationForm slug={vacancy.slug} jobTitle={vacancy.title} />
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/careers" className="inline-flex h-11 items-center rounded-full bg-brand-orange px-8 font-bold text-white hover:bg-[#d94e20] lg:u-h-48 lg:u-text-22">
                See all vacancies
              </Link>
              <Link href="/contact#contact-form" className="inline-flex h-11 items-center rounded-full bg-brand-ink px-8 font-bold text-white hover:bg-brand-ink/90 lg:u-h-48 lg:u-text-22">
                Get in touch
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
