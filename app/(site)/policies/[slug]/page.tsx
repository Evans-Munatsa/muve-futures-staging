import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PolicyMarkdown } from '@/components/policies/PolicyMarkdown';
import { Reveal } from '@/components/motion/Reveal';
import { getCollection, getCollectionItem } from '@/lib/content/queries';

export async function generateStaticParams() {
  const policies = await getCollection('policy');
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: PageProps<'/policies/[slug]'>): Promise<Metadata> {
  const policy = await getCollectionItem('policy', (await params).slug);
  return policy ? { title: policy.title, description: policy.summary } : {};
}

/** A policy page from public/design. From lg up, sizes are design pixels (u-* units). */
export default async function PolicyPage({ params }: PageProps<'/policies/[slug]'>) {
  const policy = await getCollectionItem('policy', (await params).slug);
  if (!policy) notFound();

  const info: [string, string][] = [
    ['Policy title', policy.title],
    ['Reviewed by', policy.reviewedBy],
    ['Date', policy.date],
    ['Approved By', policy.approvedBy],
    ['Date', policy.approvedDate],
    ['Review Date', policy.reviewDate],
    ['Version', policy.version],
  ];

  return (
    <div className="w-full bg-brand-green pb-20 text-white sm:pb-28 lg:u-pb-120">
      <article className="mx-auto w-[90%] max-w-5xl pt-6 lg:max-w-none lg:u-w-1432 lg:u-pt-30">
        <Reveal onLoad from="fade" className="text-center">
          <span className="inline-flex items-center rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide lg:u-border-5 lg:u-h-48 lg:u-px-22 lg:py-0 lg:u-text-25">
            Policies &amp; Procedures
          </span>
          <h1 className="mx-auto mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:u-mt-30 lg:u-text-90">{policy.title}</h1>
        </Reveal>

        <Reveal
          onLoad
          delay={0.1}
          className="mt-10 rounded-[2rem] bg-brand-orange px-4 pt-6 pb-5 sm:px-6 lg:u-mt-65 lg:u-rounded-50 lg:u-px-35 lg:u-pt-30 lg:u-pb-35"
        >
          <h2 id="policy-information" className="px-2 text-2xl font-bold lg:px-0 lg:u-pl-11 lg:u-text-46">
            Policy Information
          </h2>
          <dl className="mt-4 space-y-2 text-sm sm:text-base lg:u-mt-16 lg:space-y-0 lg:u-text-25">
            {info.map(([label, value], i) => (
              <div
                key={`${label}-${i}`}
                className={
                  'grid gap-1 px-3 py-2 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-4 lg:u-h-56 lg:grid-cols-[calc(var(--u)*478)_1fr] lg:gap-0 lg:u-pl-19 lg:py-0 lg:[&:not(:first-child)]:u-mt-11' +
                  (i % 2 === 1 ? ' bg-white/20' : '')
                }
              >
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-10 lg:u-mt-50">
          <PolicyMarkdown source={policy.body} />
        </div>
      </article>
    </div>
  );
}
