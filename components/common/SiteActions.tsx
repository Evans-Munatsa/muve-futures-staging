'use client';

import { createContext, useContext } from 'react';
import { FrameworkStage } from '@/app/types';

export interface InfoModalContent {
  title: string;
  subtitle?: string;
  content?: string;
  stageData?: FrameworkStage | null;
  actionText?: string;
  onAction?: () => void;
}

/**
 * Site-wide actions provided by <AppShell>. Forms are full pages, so
 * `openReferral` / `openBookIntro` navigate; services link to their own pages;
 * only search and the read-only info panels are dialogs.
 */
export interface SiteActions {
  openReferral: (serviceName?: string) => void;
  openBookIntro: () => void;
  openSearch: () => void;
  openInfo: (content: InfoModalContent) => void;
}

export const SiteActionsContext = createContext<SiteActions | null>(null);

export function useSiteActions(): SiteActions {
  const actions = useContext(SiteActionsContext);
  if (!actions) {
    throw new Error('useSiteActions must be used inside <AppShell>.');
  }
  return actions;
}
