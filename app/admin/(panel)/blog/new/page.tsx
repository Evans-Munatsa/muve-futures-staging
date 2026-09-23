import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth/dal';
import { PostEditor } from '@/components/admin/PostEditor';

export const metadata: Metadata = { title: 'New post' };

export default async function NewPostPage() {
  const admin = await requireAdmin();
  return (
    <PostEditor
      id={null}
      initial={{
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        category: '',
        tags: [],
        coverImageUrl: '',
        coverImageAlt: '',
        gallery: [],
        authorName: admin.name,
        status: 'draft',
        publishedAt: '',
      }}
    />
  );
}
