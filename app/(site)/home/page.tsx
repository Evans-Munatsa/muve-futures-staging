import type { Metadata } from 'next';
import { HomeSections } from '@/components/home/HomeSections';

// Pre-launch preview of the home page: next.config.ts redirects `/` to
// /coming-soon for now. Delete this route once that redirect is removed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

export default function HomePreviewPage() {
  return <HomeSections />;
}
