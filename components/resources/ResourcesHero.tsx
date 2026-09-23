import React from 'react';
import { WhiteTriangle, PinkPolygon, CyanCircle } from '@/components/common/GeometricShapes';
import { Input } from '@/components/ui/input';
import { BookOpen, Search } from 'lucide-react';
import type { ResourcesContent } from '@/lib/content/pages';

interface ResourcesHeroProps {
  content: ResourcesContent['hero'];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export const ResourcesHero: React.FC<ResourcesHeroProps> = ({
  content,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  categories,
}) => {
  return (
    <section className="relative bg-brand-orange pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden text-white">
      <div className="absolute top-6 right-12 z-10">
        <PinkPolygon size={68} rotation={18} />
      </div>
      <div className="absolute bottom-6 left-10 z-10">
        <WhiteTriangle size={38} rotation={-25} />
      </div>
      <div className="absolute -bottom-14 -right-14 z-0">
        <CyanCircle size={150} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <BookOpen className="w-4 h-4 text-white" />
            <span>{content.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
            {content.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-white/95 leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* Live Search Input using Shadcn */}
        <div className="max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="bg-white text-brand-ink placeholder:text-neutral-400 pl-12 pr-4 py-3.5 h-auto text-sm sm:text-base rounded-full border-none shadow-lg focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-brand-orange shadow-md scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
