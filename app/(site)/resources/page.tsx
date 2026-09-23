import type { Metadata } from 'next';
import { ResourcesContent } from '@/components/resources/ResourcesContent';
import { getPublishedPosts, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Practice guides, policy downloads and answers to common referral questions for schools, local authorities and families.',
};

export default async function ResourcesPage() {
  const [content, posts] = await Promise.all([getSingle('resources'), getPublishedPosts()]);
  return <ResourcesContent content={content} posts={posts} />;
}
