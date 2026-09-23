'use client';

import { useMemo, useState } from 'react';
import { ResourcesHero } from '@/components/resources/ResourcesHero';
import { GuidesLibrary } from '@/components/resources/GuidesLibrary';
import { PolicyDownloads } from '@/components/resources/PolicyDownloads';
import { ReferralFAQ } from '@/components/resources/ReferralFAQ';
import { Reveal } from '@/components/motion/Reveal';
import type { ResourcesContent as Content } from '@/lib/content/pages';
import type { PublicPost } from '@/lib/content/posts';

/** Resources page: search/filter over the blog posts, plus policies and FAQs from the CMS. */
export function ResourcesContent({ content, posts }: { content: Content; posts: PublicPost[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, activeCategory]);

  return (
    <div className="flex w-full flex-col">
      <ResourcesHero
        content={content.hero}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={categories}
      />
      <Reveal>
        <GuidesLibrary content={content.guides} posts={filteredPosts} />
      </Reveal>
      <Reveal>
        <PolicyDownloads content={content.policies} />
      </Reveal>
      <Reveal>
        <ReferralFAQ content={content.faqs} />
      </Reveal>
    </div>
  );
}
