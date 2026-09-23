import type { NavLinkConfig } from '@/constants';
import type { SettingsContent } from './pages';

/** Site-wide data for the header, footer and search, read from the CMS. */
export interface SiteChrome {
  settings: SettingsContent;
  navLinks: NavLinkConfig[];
  legalLinks: { slug: string; label: string; href: string }[];
  search: {
    services: { slug: string; title: string; description: string }[];
    faqs: { question: string; answer: string }[];
    policies: { title: string; category: string; description: string }[];
  };
}
