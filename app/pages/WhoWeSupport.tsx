import React from 'react';
import { SupportHero } from '@/app/components/who-we-support/SupportHero';
import { NeedsMatrix } from '@/app/components/who-we-support/NeedsMatrix';
import { CaseStudies } from '@/app/components/who-we-support/CaseStudies';
import { TransitionPathway } from '@/app/components/who-we-support/TransitionPathway';

interface WhoWeSupportPageProps {
  onOpenReferral: () => void;
  onBookIntro: () => void;
}

export const WhoWeSupportPage: React.FC<WhoWeSupportPageProps> = ({
  onOpenReferral,
  onBookIntro,
}) => {
  return (
    <div className="flex flex-col w-full">
      <SupportHero
        onOpenReferral={onOpenReferral}
        onBookIntro={onBookIntro}
      />

      <NeedsMatrix />

      <CaseStudies onOpenReferral={onOpenReferral} />

      <TransitionPathway onOpenReferral={onOpenReferral} />
    </div>
  );
};
