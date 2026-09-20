'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Common Components
import { ReferralModal } from '@/components/common/ReferralModal';
import { ServiceDetailModal } from '@/components/common/ServiceDetailModal';
import { BookIntroModal } from '@/components/common/BookIntroModal';
import { SearchModal } from '@/components/common/SearchModal';
import { InfoModal } from '@/components/common/InfoModal';

import { HomePage } from './pages/Home';


// Types & Data
import { ServiceItem, FrameworkStage } from '@/types';
import { PILLARS_DATA } from '@/data/content';

export default function Home() {
  const router = useRouter();

  // Modal state
  const [referralOpen, setReferralOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [infoModalState, setInfoModalState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    content?: string;
    stageData?: FrameworkStage | null;
    actionText?: string;
    onAction?: () => void;
  }>({
    isOpen: false,
    title: '',
  });

  const handleOpenReferral = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setReferralOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleSelectPillar = (pillarId: string) => {
    const pillar = PILLARS_DATA.find((p) => p.id === pillarId);
    if (pillar) {
      setInfoModalState({
        isOpen: true,
        title: pillar.title,
        subtitle: 'Core Provision Pillar',
        content: `${pillar.subtitle} At Muve Futures, "${pillar.title}" informs every assessment, timetable adjustment, and mentoring session. Our practitioners undergo continuous trauma-informed and neuro-inclusive training to guarantee high fidelity to this principle.`,
        actionText: 'Make a Referral',
        onAction: () => handleOpenReferral(pillar.title),
      });
    }
  };

  const handleDiscoverApproach = (stage: FrameworkStage) => {
    setInfoModalState({
      isOpen: true,
      title: `Stage ${stage.step}: ${stage.title}`,
      subtitle: 'The Four Stage Approach',
      stageData: stage,
      actionText: 'Refer a Learner',
      onAction: () => handleOpenReferral(),
    });
  };

  const handleVisitResources = () => {
    router.push('/resources');
  };

  const handleSectionNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HomePage
        onOpenReferral={handleOpenReferral}
        onBookIntro={() => setIntroModalOpen(true)}
        onLearnMore={() => handleSectionNavigate('quote-and-pillars')}
        onSelectService={handleSelectService}
        onDiscoverStage={handleDiscoverApproach}
        onSelectPillar={handleSelectPillar}
        onVisitResources={handleVisitResources}
        onExploreServices={() => router.push('/services')}
      />

      {/* Interactive Modals scoped to this page */}
      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        preselectedService={preselectedService}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onMakeReferral={(srv) => handleOpenReferral(srv)}
      />

      <BookIntroModal
        isOpen={introModalOpen}
        onClose={() => setIntroModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectService={handleSelectService}
        onNavigate={(page, sectionId) => {
          const targetPath = page === 'home' ? '/' : `/${page}`;
          router.push(sectionId ? `${targetPath}#${sectionId}` : targetPath);
        }}
      />

      <InfoModal
        isOpen={infoModalState.isOpen}
        onClose={() => setInfoModalState((prev) => ({ ...prev, isOpen: false }))}
        title={infoModalState.title}
        subtitle={infoModalState.subtitle}
        content={infoModalState.content}
        stageData={infoModalState.stageData}
        actionText={infoModalState.actionText}
        onActionClick={infoModalState.onAction}
      />
    </>
  );
}