import { AppShell } from '@/components/common/AppShell';
import { getSiteChrome } from '@/lib/content/chrome';

// Header, footer and search content come from the CMS (see lib/content).
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const chrome = await getSiteChrome();
  return <AppShell chrome={chrome}>{children}</AppShell>;
}
