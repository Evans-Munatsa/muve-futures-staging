import type { Metadata } from 'next';
import { Careers } from '@/components/contact/Careers';
import { renderTime } from '@/lib/careers/shared';
import { getCollection, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Current vacancies at MUVE Futures. Help children and young people across the West Midlands move forward in education.',
};

// Re-render regularly so roles past their closing date show as closed.
export const revalidate = 600;

export default async function CareersPage() {
  const [{ careers }, vacancies] = await Promise.all([getSingle('contact-page'), getCollection('vacancy')]);
  return (
    <div className="w-full overflow-hidden bg-brand-green pt-4 pb-20 sm:pb-28 lg:u-pb-200">
      <Careers content={careers} vacancies={vacancies} renderedAt={renderTime()} headingLevel="h1" />
    </div>
  );
}
