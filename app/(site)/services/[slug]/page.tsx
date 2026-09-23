import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/detail/DetailPage';
import { getCollection, getCollectionItem } from '@/lib/content/queries';

// Services added in the dashboard later are rendered on first visit.
export async function generateStaticParams() {
  const services = await getCollection('service');
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const service = await getCollectionItem('service', (await params).slug);
  return service ? { title: service.title, description: service.page.hero.intro } : {};
}

export default async function ServiceDetailPage({ params }: PageProps<'/services/[slug]'>) {
  const service = await getCollectionItem('service', (await params).slug);
  if (!service) notFound();

  return <DetailPage content={service.page} variant="service" referralService={service.title} />;
}
