import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PostCard } from '@/components/blog/PostCard';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import type { ResourcesContent } from '@/lib/content/pages';
import type { PublicPost } from '@/lib/content/posts';

/** Latest blog posts on the Resources page, filtered by the hero's search and category pills. */
export function GuidesLibrary({ content, posts }: { content: ResourcesContent['guides']; posts: PublicPost[] }) {
  return (
    <section id="guides-library" className="scroll-mt-24 bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">{content.eyebrow}</span>
            <h2 className="text-3xl font-bold text-brand-ink">{content.title}</h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-brand-ink underline-offset-4 hover:underline">
            View all posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <Card className="space-y-3 border-neutral-200 bg-white p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-neutral-300" />
            <h3 className="text-lg font-bold text-brand-ink">No posts match your search</h3>
            <p className="text-sm text-neutral-500">Try different words or another category.</p>
          </Card>
        ) : (
          // Keyed on the result set so a new search/filter replays the stagger.
          <Stagger key={posts.map((p) => p.slug).join()} stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 9).map((post) => (
              <StaggerItem key={post.slug} className="flex">
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
