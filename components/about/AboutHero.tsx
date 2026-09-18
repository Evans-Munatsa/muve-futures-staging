import React from 'react';
import { WhiteTriangle, PinkPolygon, CyanCircle } from '@/app/components/common/GeometricShapes';
import { Button } from '@/app/components/ui/button';
import { ShieldCheck, HeartHandshake, Award } from 'lucide-react';

interface AboutHeroProps {
  onOpenReferral: () => void;
  onBookIntro: () => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onOpenReferral, onBookIntro }) => {
  return (
    <section className="relative bg-[#8cc63f] pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden text-white">
      {/* Decorative Brand Shapes */}
      <div className="absolute top-8 right-12 z-10">
        <PinkPolygon size={68} rotation={25} />
      </div>
      <div className="absolute bottom-10 left-10 z-10">
        <WhiteTriangle size={40} rotation={-20} />
      </div>
      <div className="absolute -bottom-16 -right-16 z-0">
        <CyanCircle size={150} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <HeartHandshake className="w-4 h-4 text-white" />
            <span>About Muve Futures Alternative Provision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Reimagining Education For Every Young Person
          </h1>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-white/95 leading-relaxed">
            Muve Futures was founded on a single core belief: no young person should be defined by their barriers to education. We provide trauma-informed, high-quality, and deeply personalised alternative education across Birmingham and the West Midlands.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              variant="coral"
              size="lg"
              onClick={onOpenReferral}
              className="font-bold text-base shadow-lg"
            >
              Commission a Placement
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onBookIntro}
              className="font-bold text-base border-white hover:bg-white hover:text-[#8cc63f]"
            >
              Book an Intro Call
            </Button>
          </div>

          {/* Key Accreditation Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">Safeguarding</p>
                <p className="text-sm font-semibold">KCSIE 2025 Aligned</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">Quality</p>
                <p className="text-sm font-semibold">Ofsted Inspection Ready</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">Approach</p>
                <p className="text-sm font-semibold">Trauma-Informed & Low Demand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
