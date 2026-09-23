'use server';

import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';
import { and, eq, ne } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { contentTag } from '@/lib/content/registry';
import { SLUG_PATTERN } from '@/lib/slug';

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  coverImageAlt: string;
  authorName: string;
  status: 'draft' | 'published';
  /** yyyy-mm-dd or an ISO date; empty means "now" when publishing. */
  publishedAt: string;
}

export type PostResult = { ok: true; id: string; savedAt: string } | { ok: false; errors: string[] };

const SLUG = SLUG_PATTERN;

function problems(input: PostInput): string[] {
  const errors: string[] = [];
  if (!input.title.trim()) errors.push('Add a title.');
  if (!SLUG.test(input.slug)) errors.push('The web address can only use lowercase letters, numbers and hyphens.');
  if (input.status !== 'draft' && input.status !== 'published') errors.push('Choose draft or published.');
  if (input.publishedAt && Number.isNaN(Date.parse(input.publishedAt))) errors.push('The publish date isn’t a valid date.');
  if (input.coverImageUrl && !/^(https:\/\/|\/)/.test(input.coverImageUrl)) errors.push('The cover image must be an uploaded image or a site path.');
  if (input.title.length > 200 || input.excerpt.length > 600) errors.push('The title or summary is too long.');
  return errors;
}

/** Creates (id = null) or updates a post. */
export async function savePost(id: string | null, input: PostInput): Promise<PostResult> {
  await requireAdmin();
  const data = {
    ...input,
    title: input.title.trim(),
    slug: input.slug.trim().toLowerCase(),
    tags: input.tags.map((t) => t.trim()).filter(Boolean).slice(0, 20),
  };
  const errors = problems(data);

  const [clash] = await db()
    .select({ id: schema.blogPosts.id })
    .from(schema.blogPosts)
    .where(id ? and(eq(schema.blogPosts.slug, data.slug), ne(schema.blogPosts.id, id)) : eq(schema.blogPosts.slug, data.slug));
  if (clash) errors.push('Another post already uses that web address.');
  if (errors.length) return { ok: false, errors };

  const now = new Date();
  const publishedAt =
    data.status === 'published' ? (data.publishedAt ? new Date(data.publishedAt) : now) : data.publishedAt ? new Date(data.publishedAt) : null;

  const values = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    body: data.body,
    category: data.category.trim(),
    tags: data.tags,
    coverImageUrl: data.coverImageUrl || null,
    coverImageAlt: data.coverImageAlt,
    authorName: data.authorName.trim(),
    status: data.status,
    publishedAt,
    updatedAt: now,
  };

  let savedId = id;
  if (id) {
    await db().update(schema.blogPosts).set(values).where(eq(schema.blogPosts.id, id));
  } else {
    const [row] = await db().insert(schema.blogPosts).values(values).returning({ id: schema.blogPosts.id });
    savedId = row.id;
  }

  updateTag(contentTag.blog);
  return { ok: true, id: savedId!, savedAt: now.toISOString() };
}

export async function deletePost(id: string) {
  await requireAdmin();
  await db().delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
  updateTag(contentTag.blog);
  redirect('/admin/blog');
}
