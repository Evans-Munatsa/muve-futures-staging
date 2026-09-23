import 'server-only';
import { NAV_LINKS_CONFIG } from '@/constants';
import { getCollection, getSingle } from './queries';
import type { SiteChrome } from './chrome-types';

export type { SiteChrome };

export async function getSiteChrome(): Promise<SiteChrome> {
  const [settings, services, audiences, legal, resources] = await Promise.all([
    getSingle('settings'),
    getCollection('service'),
    getCollection('audience'),
    getCollection('legal'),
    getSingle('resources'),
  ]);

  // The Services and Who We Support menus list whatever is in the CMS.
  const navLinks = NAV_LINKS_CONFIG.map((link) => {
    if (link.id === 'services') {
      return { ...link, dropdown: services.filter((s) => s.listed).map((s) => ({ label: s.title, href: `/services/${s.slug}` })) };
    }
    if (link.id === 'who-we-support') {
      return { ...link, dropdown: audiences.map((a) => ({ label: a.title, href: `/who-we-support/${a.slug}` })) };
    }
    return link;
  });

  return {
    settings,
    navLinks,
    legalLinks: legal.map((page) => ({ slug: page.slug, label: page.label, href: `/${page.slug}` })),
    search: {
      services: services.map((s) => ({ slug: s.slug, title: s.title, description: s.description })),
      // The Referrals group reads as questions and answers; everything else is listed as a resource.
      faqs: resources.library.groups
        .filter((group) => group.name === 'Referrals')
        .flatMap((group) => group.items.map(({ title, body }) => ({ question: title, answer: body }))),
      policies: resources.library.groups
        .filter((group) => group.name !== 'Referrals')
        .flatMap((group) => group.items.map(({ title, body }) => ({ title, category: group.name, description: body }))),
    },
  };
}
