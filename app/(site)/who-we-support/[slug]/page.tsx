import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/detail/DetailPage';
import { AUDIENCES, getAudience } from '@/constants';

export function generateStaticParams() {
  return AUDIENCES.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/who-we-support/[slug]'>): Promise<Metadata> {
  const audience = getAudience((await params).slug);
  return audience ? { title: audience.title, description: audience.page.hero.intro } : {};
}

export default async function AudienceDetailPage({ params }: PageProps<'/who-we-support/[slug]'>) {
  const audience = getAudience((await params).slug);
  if (!audience) notFound();

  return <DetailPage content={audience.page} variant="audience" accent={audience.accent} />;
}
