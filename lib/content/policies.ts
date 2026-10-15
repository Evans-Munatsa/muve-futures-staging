import type { ResourcesContent } from './pages';
import type { PolicyItem } from './registry';

/**
 * Fills the Resources library's "Policies" group with every policy, each
 * linking to its page, so a policy added in the dashboard is listed straight
 * away. A Policies group given its own resources in the dashboard is left as is.
 */
export function withPolicies(
  library: ResourcesContent['library'],
  policies: (PolicyItem & { slug: string })[]
): ResourcesContent['library'] {
  const items = policies.map((policy) => ({
    title: policy.title,
    body: policy.summary,
    fileUrl: '',
    linkLabel: 'Read Policy',
    linkUrl: `/policies/${policy.slug}`,
  }));
  return {
    ...library,
    groups: library.groups.map((group) => (group.name === 'Policies' && group.items.length === 0 ? { ...group, items } : group)),
  };
}
