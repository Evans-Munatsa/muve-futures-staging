import React from 'react';
import { WhiteTriangle, PinkPolygon, CyanCircle } from '@/app/components/common/GeometricShapes';
import { Button } from '@/app/components/ui/button';
import { Layers } from 'lucide-react';

interface ServicesHeroProps {
  onOpenReferral: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  onOpenReferral,
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  return (
    <section className="relative bg-[#8cc63f] pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden text-white">
      <div className="absolute top-6 right-10 z-10">
        <PinkPolygon size={70} rotation={15} />
      </div>
      <div className="absolute bottom-6 left-8 z-10">
        <WhiteTriangle size={38} rotation={-30} />
      </div>
      <div className="absolute -bottom-10 -right-10 z-0">
        <CyanCircle size={140} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <Layers className="w-4 h-4 text-white" />
            <span>Specialist Alternative Education Pathways</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
            Comprehensive Education Services That Adapt Around the Learner
          </h1>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-white/95 leading-relaxed">
            From Section 19 medical provision and EOTAS to intensive 1:1 SEND mentoring and 52-week post-16 vocational programmes, our flexible framework ensures every young person can thrive.
          </p>

          <div className="pt-2">
            <Button
              variant="coral"
              size="lg"
              onClick={onOpenReferral}
              className="font-bold text-base shadow-lg"
            >
              Make an Immediate Referral
            </Button>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="pt-4 border-t border-white/20">
          <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3">
            Filter Provision by Category:
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#8cc63f] shadow-md scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
