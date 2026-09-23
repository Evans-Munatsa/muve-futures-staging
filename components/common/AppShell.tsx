'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MotionConfig } from 'motion/react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PointerProvider } from '@/components/motion/Drift';
import { InfoModalContent, SiteActions, SiteActionsContext } from '@/components/common/SiteActions';
import { PageId } from '@/app/types';
import { BOOK_INTRO_HREF, referralHref } from '@/constants';
import type { SiteChrome } from '@/lib/content/chrome-types';

// Lazy-loaded: the dialog code is only downloaded the first time one is opened.
const SearchModal = dynamic(() => import('@/components/common/SearchModal').then((m) => m.SearchModal));
const InfoModal = dynamic(() => import('@/components/common/InfoModal').then((m) => m.InfoModal));

function getActivePage(pathname: string): PageId {
  const [segment] = pathname.replace(/^\//, '').split('/');
  switch (segment) {
    // About sits in the Resources menu, so that tab is highlighted.
    case 'about':
    case 'blog':
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

export function AppShell({ children, chrome }: { children: React.ReactNode; chrome: SiteChrome }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = getActivePage(pathname);

  const [searchOpen, setSearchOpen] = useState(false);
  // Stay mounted after the first open so the dialogs can animate closed.
  const [searchUsed, setSearchUsed] = useState(false);
  const [info, setInfo] = useState<InfoModalContent | null>(null);

  // Forms are full pages rather than pop-ups, so these navigate.
  const openReferral = useCallback((serviceName?: string) => router.push(referralHref(serviceName)), [router]);

  const actions = useMemo<SiteActions>(
    () => ({
      openReferral,
      openBookIntro: () => router.push(BOOK_INTRO_HREF),
      openSearch: () => {
        setSearchUsed(true);
        setSearchOpen(true);
      },
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
    // reducedMotion="user": every animation respects the OS reduce-motion setting.
    <MotionConfig reducedMotion="user">
      <PointerProvider>
        <SiteActionsContext.Provider value={actions}>
          <Navbar currentPage={currentPage} links={chrome.navLinks} onOpenSearch={actions.openSearch} />

          <main className="flex w-full flex-1 flex-col">{children}</main>

          <Footer settings={chrome.settings} legalLinks={chrome.legalLinks} />

          {searchUsed && (
            <SearchModal
              isOpen={searchOpen}
              onClose={() => setSearchOpen(false)}
              onNavigate={handleNavigate}
              onOpenService={(slug) => router.push(`/services/${slug}`)}
              index={chrome.search}
            />
          )}

          {info !== null && (
            <InfoModal
              isOpen
              onClose={() => setInfo(null)}
              title={info.title}
              subtitle={info.subtitle}
              content={info.content}
              stageData={info.stageData}
              actionText={info.actionText}
              onActionClick={info.onAction}
            />
          )}
        </SiteActionsContext.Provider>
      </PointerProvider>
    </MotionConfig>
  );
}
