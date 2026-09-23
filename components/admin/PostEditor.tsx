'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, ExternalLink, Loader2 } from 'lucide-react';
import { deletePost, savePost, type PostInput, type PostResult } from '@/lib/admin/blog-actions';
import { slugify } from '@/lib/slug';
import { Markdown } from '@/components/blog/Markdown';
import { ImageUrlInput, inputClass } from './MediaInputs';
import { ConfirmButton } from './ConfirmButton';
import { cn } from '@/lib/utils';

const label = 'block text-sm font-semibold text-brand-ink';

export function PostEditor({ id, initial }: { id: string | null; initial: PostInput }) {
  const router = useRouter();
  const [post, setPost] = useState<PostInput>(initial);
  // Keep the address in step with the title until it's edited by hand (new posts only).
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [dirty, setDirty] = useState(false);
  const [result, setResult] = useState<PostResult | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = <K extends keyof PostInput>(key: K, value: PostInput[K]) => {
    setPost((p) => ({ ...p, [key]: value }));
    setDirty(true);
  };

  const setTitle = (title: string) => {
    update('title', title);
    if (!slugTouched) setPost((p) => ({ ...p, slug: slugify(title) }));
  };

  const save = (status?: PostInput['status']) =>
    startTransition(async () => {
      const input = status ? { ...post, status } : post;
      if (status) setPost(input);
      const res = await savePost(id, input);
      setResult(res);
      if (res.ok) {
        setDirty(false);
        if (!id) router.replace(`/admin/blog/${res.id}`);
      }
    });

  return (
    <div className="space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-brand-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
      </Link>

      <div className="sticky top-0 z-20 -mx-4 flex flex-wrap items-center gap-3 border-b border-neutral-200 bg-neutral-50/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <button
          type="button"
          disabled={pending}
          onClick={() => save()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {post.status === 'published' ? 'Save & update' : 'Save draft'}
        </button>
        {post.status === 'draft' ? (
          <button type="button" disabled={pending} onClick={() => save('published')} className="cursor-pointer rounded-full bg-brand-ink px-5 py-2 text-sm font-bold text-white hover:bg-brand-ink/90 disabled:opacity-60">
            Publish
          </button>
        ) : (
          <button type="button" disabled={pending} onClick={() => save('draft')} className="cursor-pointer rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-bold hover:border-brand-ink disabled:opacity-60">
            Unpublish
          </button>
        )}
        {id && post.status === 'published' && (
          <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
            <ExternalLink className="h-4 w-4" /> View post
          </a>
        )}
        <span className="text-xs text-neutral-500" role="status">
          {dirty ? 'Unsaved changes' : result?.ok ? `Saved ${new Date(result.savedAt).toLocaleTimeString()}` : ''}
        </span>
      </div>

      {result && !result.ok && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <ul className="list-disc pl-5">
            {result.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-5">
          <label className={label}>
            Title
            <input className={cn(inputClass, 'mt-1.5 text-lg font-bold')} value={post.title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
          </label>

          <label className={label}>
            Web address
            <span className="mt-1.5 flex items-center gap-1 text-sm text-neutral-500">
              /blog/
              <input
                className={inputClass}
                value={post.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                }}
              />
            </span>
          </label>

          <label className={label}>
            Summary
            <span className="block text-xs font-normal text-neutral-500">Shown on the blog list and in search results.</span>
            <textarea className={cn(inputClass, 'mt-1.5')} rows={2} value={post.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
          </label>

          <div>
            <div className="flex items-center justify-between">
              <span className={label}>Post</span>
              <div role="tablist" className="flex rounded-full bg-neutral-200 p-0.5 text-xs font-bold">
                {(['write', 'preview'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={cn('cursor-pointer rounded-full px-3 py-1 capitalize', tab === t ? 'bg-white shadow-xs' : 'text-neutral-600')}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {tab === 'write' ? (
              <>
                <textarea
                  className={cn(inputClass, 'mt-1.5 min-h-[28rem] font-mono text-[13px] leading-relaxed')}
                  value={post.body}
                  onChange={(e) => update('body', e.target.value)}
                  placeholder={'Write in Markdown:\n\n## A heading\n\nA paragraph with **bold** text and a [link](https://example.com).\n\n- A bullet point\n\n> A highlighted quote'}
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Formatting: <code>## Heading</code>, <code>**bold**</code>, <code>*italic*</code>, <code>[link](url)</code>, <code>- bullet</code>, <code>&gt; quote</code>, <code>![image description](image-url)</code>.
                </p>
              </>
            ) : (
              <div className="mt-1.5 min-h-[28rem] rounded-lg border border-neutral-200 bg-white p-6">
                {post.body ? <Markdown source={post.body} /> : <p className="text-sm text-neutral-400">Nothing to preview yet.</p>}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <span className={label}>Cover image</span>
            <div className="mt-2">
              <ImageUrlInput value={post.coverImageUrl} onChange={(v) => update('coverImageUrl', v)} />
            </div>
            <label className="mt-3 block text-xs font-semibold text-neutral-600">
              Description (alt text)
              <input className={cn(inputClass, 'mt-1')} value={post.coverImageAlt} onChange={(e) => update('coverImageAlt', e.target.value)} />
            </label>
          </div>

          <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4">
            <label className={label}>
              Category
              <input className={cn(inputClass, 'mt-1.5')} value={post.category} onChange={(e) => update('category', e.target.value)} placeholder="e.g. Parent Guides" />
            </label>
            <label className={label}>
              Tags
              <input
                className={cn(inputClass, 'mt-1.5')}
                value={post.tags.join(', ')}
                onChange={(e) => update('tags', e.target.value.split(','))}
                placeholder="EHCP, Attendance"
              />
              <span className="mt-1 block text-xs font-normal text-neutral-500">Separate with commas.</span>
            </label>
            <label className={label}>
              Author
              <input className={cn(inputClass, 'mt-1.5')} value={post.authorName} onChange={(e) => update('authorName', e.target.value)} />
            </label>
            <label className={label}>
              Publish date
              <input type="date" className={cn(inputClass, 'mt-1.5')} value={post.publishedAt} onChange={(e) => update('publishedAt', e.target.value)} />
              <span className="mt-1 block text-xs font-normal text-neutral-500">Leave empty to publish now. A future date schedules the post.</span>
            </label>
          </div>

          {id && (
            <ConfirmButton action={deletePost.bind(null, id)} confirm="Delete this post? This can’t be undone." danger>
              Delete post
            </ConfirmButton>
          )}
        </aside>
      </div>
    </div>
  );
}
