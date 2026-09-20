import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { QuoteAndPillars } from '@/components/home/QuoteAndPillars';
import { JourneyAndWhoWeSupport } from '@/components/home/JourneyAndWhoWeSupport';
import { ServicesCircle } from '@/components/home/ServicesCircle';
import { FourStageApproach } from '@/components/home/FourStageApproach';
// import { PartnershipsAndReferral } from '@/components/home/PartnershipsAndReferral';
import { ResourcesAndCallToAction } from '@/components/home/ResourcesAndCallToAction';
import { ServiceItem, FrameworkStage } from '@/types';

interface HomePageProps {
  onOpenReferral: (serviceName?: string) => void;
  onBookIntro: () => void;
  onLearnMore: () => void;
  onSelectService: (service: ServiceItem) => void;
  onDiscoverStage: (stage: FrameworkStage) => void;
  onSelectPillar: (pillarId: string) => void;
  onVisitResources: () => void;
  onExploreServices: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenReferral,
  onBookIntro,
  onLearnMore,
  onSelectService,
  onDiscoverStage,
  onSelectPillar,
  onVisitResources,
  onExploreServices,
}) => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection
        onOpenReferral={() => onOpenReferral()}
        onLearnMore={onLearnMore}
      />

      <QuoteAndPillars
        onLearnMore={onLearnMore}
        onSelectPillar={onSelectPillar}
      />

      <JourneyAndWhoWeSupport
        onOpenReferral={() => onOpenReferral()}
        onExploreServices={onExploreServices}
      />

      <ServicesCircle
        onSelectService={onSelectService}
      />

      <FourStageApproach
        onDiscoverMore={onDiscoverStage}
      />

      {/* <PartnershipsAndReferral
        onBookIntro={onBookIntro}
        onOpenReferral={() => onOpenReferral()}
      /> */}

      <ResourcesAndCallToAction
        onVisitResources={onVisitResources}
        onOpenReferral={() => onOpenReferral()}
      />
    </div>
  );
};
