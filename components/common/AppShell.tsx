'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { SearchModal } from '@/components/common/SearchModal';
import { InfoModal } from '@/components/common/InfoModal';
import { InfoModalContent, SiteActions, SiteActionsContext } from '@/components/common/SiteActions';
import { PageId } from '@/app/types';
import { BOOK_INTRO_HREF, referralHref } from '@/constants';

function getActivePage(pathname: string): PageId {
  const [segment] = pathname.replace(/^\//, '').split('/');
  switch (segment) {
    // About sits in the Resources menu, so that tab is highlighted.
    case 'about':
      return 'resources';
    // The form pages are reached from the Contact menu.
    case 'referral':
    case 'book-an-intro':
      return 'contact';
    case 'services':
    case 'who-we-support':
    case 'resources':
    case 'contact':
      return segment;
    default:
      return 'home';
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = getActivePage(pathname);

  const [searchOpen, setSearchOpen] = useState(false);
  const [info, setInfo] = useState<InfoModalContent | null>(null);

  // Forms are full pages rather than pop-ups, so these navigate.
  const openReferral = useCallback((serviceName?: string) => router.push(referralHref(serviceName)), [router]);

  const actions = useMemo<SiteActions>(
    () => ({
      openReferral,
      openBookIntro: () => router.push(BOOK_INTRO_HREF),
      openSearch: () => setSearchOpen(true),
      openInfo: setInfo,
    }),
    [openReferral, router]
  );

  const handleNavigate = useCallback(
    (page: PageId, sectionId?: string) => {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      router.push(sectionId ? `${targetPath}#${sectionId}` : targetPath);
    },
    [router]
  );

  return (
    <SiteActionsContext.Provider value={actions}>
      <Navbar currentPage={currentPage} onOpenSearch={actions.openSearch} />

      <main className="flex w-full flex-1 flex-col">{children}</main>

      <Footer />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenService={(slug) => router.push(`/services/${slug}`)}
      />

      <InfoModal
        isOpen={info !== null}
        onClose={() => setInfo(null)}
        title={info?.title ?? ''}
        subtitle={info?.subtitle}
        content={info?.content}
        stageData={info?.stageData}
        actionText={info?.actionText}
        onActionClick={info?.onAction}
      />
    </SiteActionsContext.Provider>
  );
}
