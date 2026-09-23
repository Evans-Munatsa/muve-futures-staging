'use client';

import { useMemo, useState } from 'react';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { PostCard } from '@/components/blog/PostCard';
import { cn } from '@/lib/utils';
import type { BlogPageContent, BlogTopic } from '@/lib/content/pages';
import type { PublicPost } from '@/lib/content/posts';

/** Cards in one row of the grid at desktop width. */
const ROW = 4;

function inTopic(post: PublicPost, topic: BlogTopic) {
  const haystack = [post.category, ...post.tags].join(' | ').toLowerCase();
  return topic.keywords.some((word) => word.trim() && haystack.includes(word.trim().toLowerCase()));
}

/**
 * Topic filter pills over the post grid. As in the design, while collapsed it
 * shows one full row and a second row cut short and fading into the page;
 * clicking the faded row shows every post.
 */
export function TopicGrid({ content, posts }: { content: BlogPageContent; posts: PublicPost[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const active = content.topics.items.find((t) => t.label === topic);
    return active ? posts.filter((post) => inTopic(post, active)) : posts;
  }, [content.topics.items, posts, topic]);

  const collapsible = !expanded && filtered.length > ROW;
  const shown = collapsible ? filtered.slice(0, ROW * 2) : filtered;

  const pills: { label: string; value: string | null }[] = [
    { label: content.topics.allLabel, value: null },
    ...content.topics.items.map((t) => ({ label: t.label, value: t.label })),
  ];

  return (
    <section className="relative z-20 mx-auto w-[90%] lg:u-w-1572">
      <div
        role="group"
        aria-label="Filter by topic"
        className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:flex-nowrap lg:u-gap-14 lg:[margin-inline:calc(var(--u)*-24)]"
      >
        {pills.map((pill) => {
          const active = topic === pill.value;
          return (
            <button
              key={pill.label}
              type="button"
              onClick={() => {
                setTopic(pill.value);
                setExpanded(false);
              }}
              aria-pressed={active}
              className={cn(
                'min-w-28 cursor-pointer whitespace-nowrap rounded-full border-[3px] border-white px-4 py-0.5 text-xs font-bold transition-colors sm:text-sm',
                'lg:flex lg:items-center lg:justify-center lg:py-0 lg:u-h-32 lg:u-min-w-166 lg:u-px-12 lg:u-text-17 lg:u-border-4',
                active ? 'bg-white text-brand-ink' : 'text-white hover:bg-white/15'
              )}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-tr-[3rem] bg-white p-10 text-center text-brand-teal lg:u-mt-74">
          There are no posts on this topic yet. Check back soon.
        </p>
      ) : (
        // Keyed on the result set so a new filter replays the stagger.
        <Stagger
          key={`${topic}-${expanded}`}
          stagger={0.08}
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:u-mt-74 lg:grid-cols-4 lg:u-gap-19"
        >
          {shown.map((post, i) => {
            const faded = collapsible && i >= ROW;
            return (
              <StaggerItem
                key={post.slug}
                className={cn(
                  'flex',
                  faded && 'relative h-80 overflow-hidden lg:u-h-415',
                  // Phones show one faded card and tablets two; desktop shows the whole faded row.
                  faded && i - ROW >= 1 && 'max-sm:hidden',
                  faded && i - ROW >= 2 && 'max-lg:hidden'
                )}
              >
                {faded ? (
                  // Natural height, cut off by the wrapper, so the card doesn't squash to fit.
                  // inert: its links sit under the overlay, so keep them out of the tab order.
                  <div inert className="absolute inset-x-0 top-0">
                    <PostCard post={post} readMore={content.readMore} />
                  </div>
                ) : (
                  <PostCard post={post} readMore={content.readMore} />
                )}
                {faded && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label={content.showAll}
                    className="absolute inset-0 z-10 cursor-pointer bg-gradient-to-b from-transparent from-35% via-brand-green/55 via-70% to-brand-green transition-opacity hover:opacity-80"
                  />
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      )}
    </section>
  );
}
