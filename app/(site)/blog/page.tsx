import type { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { PostCard } from '@/components/blog/PostCard';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { getPublishedPosts } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guidance, stories and practical advice on SEND, EBSNA, Alternative Provision and supporting young people back into learning.',
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="w-full overflow-hidden bg-brand-green pb-20 sm:pb-28">
      <PageHero badge="Blog" title="Insights & Guidance">
        <p>Practical advice and stories from our team on SEND, attendance, Alternative Provision and helping every learner move forward.</p>
      </PageHero>

      <div className="mx-auto w-[90%] max-w-6xl">
        {posts.length === 0 ? (
          <p className="rounded-tr-[2.5rem] bg-white p-10 text-center text-brand-ink">New posts are on their way — check back soon.</p>
        ) : (
          <Stagger stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug} className="flex">
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  );
}
