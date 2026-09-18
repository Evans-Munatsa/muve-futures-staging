import React, { useState } from 'react';
import { ResourcesHero } from '@/app/components/resources/ResourcesHero';
import { GuidesLibrary } from '@/app/components/resources/GuidesLibrary';
import { PolicyDownloads } from '@/app/components/resources/PolicyDownloads';
import { ReferralFAQ } from '@/app/components/resources/ReferralFAQ';
import { RESOURCE_ARTICLES } from '@/app/data/content';

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'EBSNA & Attendance', 'SEND Strategies', 'Local Authority & Section 19', 'Parent Guides'];

  const filteredArticles = RESOURCE_ARTICLES.filter((art) => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      <ResourcesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={categories}
      />

      <GuidesLibrary articles={filteredArticles} />

      <PolicyDownloads />

      <ReferralFAQ />
    </div>
  );
};
