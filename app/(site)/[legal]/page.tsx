import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormPage } from '@/components/forms/FormPage';
import { getCollection, getCollectionItem, getSingle } from '@/lib/content/queries';

// Only the governance pages (edited in the dashboard) exist at the top level; anything else 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getCollection('legal');
  return pages.map((page) => ({ legal: page.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[legal]'>): Promise<Metadata> {
  const page = await getCollectionItem('legal', (await params).legal);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function LegalPage({ params }: PageProps<'/[legal]'>) {
  const [page, pages, settings] = await Promise.all([
    getCollectionItem('legal', (await params).legal),
    getCollection('legal'),
    getSingle('settings'),
  ]);
  if (!page) notFound();

  return (
    <FormPage
      badge="Governance"
      title={page.title}
      intro={page.intro}
      aside={
        <nav aria-label="Governance pages" className="rounded-tl-[2.5rem] bg-brand-cyan px-7 py-8 text-brand-ink">
          <h2 className="text-xl font-bold">Governance</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {pages.map((link) => (
              <li key={link.slug}>
                <Link
                  href={`/${link.slug}`}
                  aria-current={link.slug === page.slug ? 'page' : undefined}
                  className="font-semibold hover:underline aria-[current=page]:font-bold aria-[current=page]:text-brand-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      }
    >
      <div className="space-y-10">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="border-b-2 border-brand-green pb-2 text-xl font-bold sm:text-2xl">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && section.list.length > 0 && (
                <ul className="space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="rounded-tr-[2.5rem] bg-brand-lime px-6 py-6 sm:px-8">
          <h2 className="text-lg font-bold">Questions about this page?</h2>
          <p className="mt-2 text-sm sm:text-base">
            Email{' '}
            <a href={`mailto:${page.contactEmail}`} className="font-bold underline">
              {page.contactEmail}
            </a>{' '}
            or write to us at {settings.address.lines.join(', ')}.
          </p>
        </section>
      </div>
    </FormPage>
  );
}
