import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/detail/DetailPage';
import { SERVICE_OFFERINGS, getServiceOffering } from '@/constants';

export function generateStaticParams() {
  return SERVICE_OFFERINGS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const service = getServiceOffering((await params).slug);
  return service ? { title: service.title, description: service.page.hero.intro } : {};
}

export default async function ServiceDetailPage({ params }: PageProps<'/services/[slug]'>) {
  const service = getServiceOffering((await params).slug);
  if (!service) notFound();

  return <DetailPage content={service.page} variant="service" referralService={service.title} />;
}
