import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/common/PageHero';
import { ClosingCta } from '@/components/common/ClosingCta';
import { ReferralButton } from '@/components/common/ActionButtons';
import { ServicesBackdrop } from '@/components/services/ServicesBackdrop';
import { WhyChooseUs } from '@/components/services/WhyChooseUs';
import { ServiceCarousel } from '@/components/services/ServiceCarousel';
import { Lines } from '@/components/common/Lines';
import { getCollection, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Alternative Provision, SEND, SEMH and EBSNA support, one-to-one, online and hybrid learning, reintegration and transition programmes — each personalised around the learner.',
};

export default async function ServicesPage() {
  const [content, services] = await Promise.all([getSingle('services-page'), getCollection('service')]);
  const { hero, whyChooseUs, closing } = content;

  return (
    <div className="relative w-full overflow-hidden bg-brand-green">
      {/* The backdrop shapes are positioned against this intro area. */}
      <div className="relative">
        <ServicesBackdrop />

        <PageHero
          className="max-w-5xl"
          badge={hero.badge}
          title={<Lines text={hero.title} />}
          action={
            <Button asChild variant="orange" size="pill">
              <Link href="#our-services">{hero.cta}</Link>
            </Button>
          }
        >
          <p>
            {hero.introLead} <strong>{hero.introHighlight}</strong> {hero.introTail}
          </p>
        </PageHero>

        <WhyChooseUs content={whyChooseUs} />
      </div>

      <ServiceCarousel services={services.filter((service) => service.listed)} />

      <ClosingCta
        title={<Lines text={closing.title} />}
        action={<ReferralButton id="pathway-btn-discuss-learner">{closing.cta}</ReferralButton>}
      >
        {closing.body}
      </ClosingCta>
    </div>
  );
}
