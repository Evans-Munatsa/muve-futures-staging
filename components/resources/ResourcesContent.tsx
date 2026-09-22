'use client';

import { useMemo, useState } from 'react';
import { ResourcesHero } from '@/components/resources/ResourcesHero';
import { GuidesLibrary } from '@/components/resources/GuidesLibrary';
import { PolicyDownloads } from '@/components/resources/PolicyDownloads';
import { ReferralFAQ } from '@/components/resources/ReferralFAQ';
import { RESOURCE_ARTICLES } from '@/constants';

const CATEGORIES = ['All', 'EBSNA & Attendance', 'SEND Strategies', 'Local Authority & Section 19', 'Parent Guides'];

export function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RESOURCE_ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex flex-col w-full">
      <ResourcesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={CATEGORIES}
      />
      <GuidesLibrary articles={filteredArticles} />
      <PolicyDownloads />
      <ReferralFAQ />
    </div>
  );
}
