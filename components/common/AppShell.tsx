'use client';

import { useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ReferralModal } from '@/components/common/ReferralModal';
import { SearchModal } from '@/components/common/SearchModal';
import { InfoModal } from '@/components/common/InfoModal';
import { PageId } from '@/app/types';

function getActivePage(pathname: string): PageId {
  const path = pathname.replace(/^\//, '');
  if (!path) return 'home';
  if (path.startsWith('about')) return 'about';
  if (path.startsWith('services')) return 'services';
  if (path.startsWith('who-we-support')) return 'who-we-support';
  if (path.startsWith('resources')) return 'resources';
  if (path.startsWith('contact')) return 'contact';
  return 'home';
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = getActivePage(pathname);

  const [referralOpen, setReferralOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [infoModalState, setInfoModalState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    content?: string;
  }>({
    isOpen: false,
    title: '',
  });

  const handleOpenReferral = useCallback((serviceName?: string) => {
    setPreselectedService(serviceName);
    setReferralOpen(true);
  }, []);

  const handleNavigate = useCallback(
    (page: PageId, sectionId?: string) => {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      router.push(sectionId ? `${targetPath}#${sectionId}` : targetPath);
    },
    [router]
  );

  const handleOpenLegalModal = useCallback((title: string, content: string) => {
    setInfoModalState({
      isOpen: true,
      title,
      subtitle: 'Muve Futures Governance',
      content,
    });
  }, []);

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenReferral={() => handleOpenReferral()}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {children}

      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={handleOpenLegalModal}
        onOpenReferral={() => handleOpenReferral()}
      />

      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        preselectedService={preselectedService}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectService={() => {}}
        onNavigate={handleNavigate}
      />

      <InfoModal
        isOpen={infoModalState.isOpen}
        onClose={() => setInfoModalState((prev) => ({ ...prev, isOpen: false }))}
        title={infoModalState.title}
        subtitle={infoModalState.subtitle}
        content={infoModalState.content}
      />
    </>
  );
}