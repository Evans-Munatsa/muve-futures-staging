import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CONTACT_ENQUIRY_HREF } from '@/constants';
import { PageHero } from '@/components/common/PageHero';
import { ClosingCta } from '@/components/common/ClosingCta';
import { Lines } from '@/components/common/Lines';
import { WorkingTogether } from '@/components/who-we-support/WorkingTogether';
import { AudienceCarousel } from '@/components/who-we-support/AudienceCarousel';
import { getCollection, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Who We Support',
  description:
    'MUVE Futures supports learners aged 4 to 25, working closely with families, schools, local authorities, commissioners and SEND professionals.',
};

export default async function WhoWeSupportPage() {
  const [content, audiences] = await Promise.all([getSingle('who-we-support-page'), getCollection('audience')]);
  const { hero, workingTogether, closing } = content;

  return (
    <div className="relative w-full overflow-hidden bg-brand-green">
      <PageHero
        badge={hero.badge}
        title={<Lines text={hero.title} />}
        action={
          <Button asChild variant="orange" size="pill">
            <Link href={CONTACT_ENQUIRY_HREF}>{hero.cta}</Link>
          </Button>
        }
      >
        <p className="mx-auto max-w-2xl">{hero.intro}</p>
      </PageHero>

      <WorkingTogether content={workingTogether} />

      <AudienceCarousel audiences={audiences} />

      <ClosingCta
        title={<Lines text={closing.title} />}
        action={
          <Button asChild variant="orange" size="pill">
            <Link href={CONTACT_ENQUIRY_HREF}>{closing.cta}</Link>
          </Button>
        }
      >
        {closing.body}
      </ClosingCta>
    </div>
  );
}
