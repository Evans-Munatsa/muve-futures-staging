'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { QuoteAndPillars } from '@/components/home/QuoteAndPillars';
import { JourneyAndWhoWeSupport } from '@/components/home/JourneyAndWhoWeSupport';
import { ServicesCircle } from '@/components/home/ServicesCircle';
import { FourStageApproach } from '@/components/home/FourStageApproach';
import { ResourcesAndCallToAction } from '@/components/home/ResourcesAndCallToAction';
import { useSiteActions } from '@/components/common/SiteActions';
import { FrameworkStage } from '@/app/types';
import type { HomeContent } from '@/lib/content/pages';

/** Home page sections; `content` is edited in the dashboard (Home page). */
export function HomeSections({ content }: { content: HomeContent }) {
  const { openReferral, openInfo } = useSiteActions();

  const scrollToPillars = () =>
    document.getElementById('quote-and-pillars')?.scrollIntoView({ behavior: 'smooth' });

  const handleDiscoverStage = (stage: FrameworkStage) =>
    openInfo({
      title: `Stage ${stage.step}: ${stage.title}`,
      subtitle: 'The Four Stage Approach',
      stageData: stage,
      actionText: 'Refer a Learner',
      onAction: () => openReferral(),
    });

  // Sections are laid out in design units from `lg` up; see app/globals.css.
  return (
    <div className="flex w-full flex-col overflow-x-clip">
      <HeroSection content={content.hero} onLearnMore={scrollToPillars} />
      <QuoteAndPillars quote={content.quote} pillars={content.pillars} onLearnMore={scrollToPillars} />
      <JourneyAndWhoWeSupport journey={content.journey} whoWeSupport={content.whoWeSupport} />
      <ServicesCircle content={content.services} />
      <FourStageApproach
        framework={content.framework}
        partnerships={content.partnerships}
        referral={content.referral}
        onDiscoverMore={handleDiscoverStage}
      />
      <ResourcesAndCallToAction resources={content.resources} closing={content.closing} />
    </div>
  );
}
