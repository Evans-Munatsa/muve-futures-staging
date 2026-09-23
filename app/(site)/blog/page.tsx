import type { Metadata } from 'next';
import { TopicsPage } from '@/components/blog/TopicsPage';
import { getPublishedPosts, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Guidance, stories and practical advice on SEND, EBSNA, Alternative Provision and supporting young people back into learning.',
};

export default async function BlogIndexPage() {
  const [content, posts] = await Promise.all([getSingle('blog-page'), getPublishedPosts()]);

  // The newest post is open under the grid, as in the design.
  return <TopicsPage content={content} posts={posts} article={posts[0]} />;
}
