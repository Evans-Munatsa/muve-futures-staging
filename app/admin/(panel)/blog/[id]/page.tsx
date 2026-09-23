import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { PostEditor } from '@/components/admin/PostEditor';

export const metadata: Metadata = { title: 'Edit post' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditPostPage({ params }: PageProps<'/admin/blog/[id]'>) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const [post] = await db().select().from(schema.blogPosts).where(eq(schema.blogPosts.id, id));
  if (!post) notFound();

  return (
    <PostEditor
      id={post.id}
      initial={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        category: post.category,
        tags: post.tags,
        coverImageUrl: post.coverImageUrl ?? '',
        coverImageAlt: post.coverImageAlt,
        gallery: post.gallery,
        authorName: post.authorName,
        status: post.status,
        publishedAt: post.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : '',
      }}
    />
  );
}
