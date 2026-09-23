import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopicsPage } from '@/components/blog/TopicsPage';
import { getPublishedPost, getPublishedPosts, getSingle } from '@/lib/content/queries';

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.coverImageAlt }] : undefined,
    },
  };
}

/** A post opens in the Topics layout, below the grid of every post. */
export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const [content, posts] = await Promise.all([getSingle('blog-page'), getPublishedPosts()]);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <TopicsPage content={content} posts={posts} article={post} articleIsPage />;
}
