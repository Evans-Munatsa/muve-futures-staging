import React from 'react';
import { WhiteTriangle, PinkPolygon, CyanCircle } from '@/app/components/common/GeometricShapes';
import { Button } from '@/app/components/ui/button';
import { Sparkles, Users } from 'lucide-react';

interface SupportHeroProps {
  onOpenReferral: () => void;
  onBookIntro: () => void;
}

export const SupportHero: React.FC<SupportHeroProps> = ({ onOpenReferral, onBookIntro }) => {
  return (
    <section className="relative bg-[#70bcf6] pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden text-[#092233]">
      <div className="absolute top-8 right-12 z-10">
        <PinkPolygon size={64} rotation={22} />
      </div>
      <div className="absolute bottom-6 left-8 z-10">
        <WhiteTriangle size={36} rotation={-15} />
      </div>
      <div className="absolute -bottom-12 -right-12 z-0">
        <CyanCircle size={150} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase text-[#092233]">
            <Users className="w-4 h-4 text-[#092233]" />
            <span>Inclusive Educational Support</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#092233]">
            Who We Support: Tailored Provision For Complex Needs
          </h1>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-[#092233]/90 leading-relaxed">
            We partner with young people aged 4–25 who face barriers in traditional school settings. Whether struggling with sensory processing, acute anxiety, school avoidance, medical illness, or neurodivergence, we provide calm, restorative education.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              variant="navy"
              size="lg"
              onClick={onOpenReferral}
              className="font-bold text-base shadow-lg"
            >
              Make a Referral
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onBookIntro}
              className="font-bold text-base bg-white/80 border-[#092233] text-[#092233] hover:bg-white"
            >
              Discuss a Case
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
