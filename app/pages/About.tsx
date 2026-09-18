import React from 'react';
import { AboutHero } from '@/app/components/about/AboutHero';
import { OurStoryMission } from '@/app/components/about/OurStoryMission';
import { LeadershipTeam } from '@/app/components/about/LeadershipTeam';
import { SafeguardingQuality } from '@/app/components/about/SafeguardingQuality';
import { ImpactMilestones } from '@/app/components/about/ImpactMilestones';
import { Button } from '@/app/components/ui/button';

interface AboutPageProps {
  onOpenReferral: () => void;
  onBookIntro: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenReferral, onBookIntro }) => {
  return (
    <div className="flex flex-col w-full">
      <AboutHero
        onOpenReferral={onOpenReferral}
        onBookIntro={onBookIntro}
      />

      <OurStoryMission />

      <ImpactMilestones />

      <LeadershipTeam />

      <SafeguardingQuality />

      {/* Call to action */}
      <section className="bg-[#f05a28] py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Partner With Muve Futures?
          </h2>
          <p className="text-base sm:text-lg text-white/95 max-w-xl mx-auto">
            Speak directly with our leadership team to understand how our bespoke alternative provision can support your students and statutory requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              variant="navy"
              size="lg"
              onClick={onOpenReferral}
              className="font-bold text-base"
            >
              Make a Learner Referral
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onBookIntro}
              className="font-bold text-base border-white text-white hover:bg-white hover:text-[#f05a28]"
            >
              Book an Intro Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
