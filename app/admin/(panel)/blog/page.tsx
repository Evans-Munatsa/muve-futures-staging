import type { Metadata } from 'next';
import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { PenSquare } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Blog' };

function status(post: { status: string; publishedAt: Date | null }) {
  if (post.status === 'draft') return { label: 'Draft', className: 'bg-neutral-100 text-neutral-600' };
  if (post.publishedAt && post.publishedAt > new Date()) return { label: 'Scheduled', className: 'bg-brand-cyan/30 text-brand-ink' };
  return { label: 'Published', className: 'bg-brand-lime text-brand-ink' };
}

export default async function BlogAdmin() {
  await requireAdmin();
  const posts = await db()
    .select({ id: schema.blogPosts.id, title: schema.blogPosts.title, slug: schema.blogPosts.slug, status: schema.blogPosts.status, publishedAt: schema.blogPosts.publishedAt, updatedAt: schema.blogPosts.updatedAt })
    .from(schema.blogPosts)
    .orderBy(desc(schema.blogPosts.updatedAt));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Blog</h1>
          <p className="mt-1 text-sm text-neutral-500">Posts appear at /blog and in the Resources guides.</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:brightness-95">
          <PenSquare className="h-4 w-4" aria-hidden="true" /> New post
        </Link>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">No posts yet.</p>
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
          {posts.map((post) => {
            const s = status(post);
            return (
              <li key={post.id}>
                <Link href={`/admin/blog/${post.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{post.title}</span>
                    <span className="block text-xs text-neutral-500">/blog/{post.slug}</span>
                  </span>
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', s.className)}>{s.label}</span>
                  <span className="hidden w-28 text-right text-xs text-neutral-500 sm:block">{post.updatedAt.toLocaleDateString('en-GB')}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
