import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/common/PageHero';
import { ClosingCta } from '@/components/common/ClosingCta';
import { ReferralButton } from '@/components/common/ActionButtons';
import { ServicesBackdrop } from '@/components/services/ServicesBackdrop';
import { WhyChooseUs } from '@/components/services/WhyChooseUs';
import { ServiceCarousel } from '@/components/services/ServiceCarousel';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Alternative Provision, SEND, SEMH and EBSNA support, one-to-one, online and hybrid learning, reintegration and transition programmes — each personalised around the learner.',
};

export default function ServicesPage() {
  return (
    <div className="relative w-full overflow-hidden bg-brand-green">
      {/* The backdrop shapes are positioned against this intro area. */}
      <div className="relative">
        <ServicesBackdrop />

        <PageHero
          className="max-w-5xl"
          badge={<>Accredited &amp; Therapeutic Pathways</>}
          title="Education That Adapts Around The Learner"
          action={
            <Button asChild variant="orange" size="pill">
              <Link href="#our-services">Explore Our Services</Link>
            </Button>
          }
        >
          <p>
            Our services include{' '}
            <strong>
              Alternative Provision, SEND Support, SEMH Support, EBSNA Support, One-to-One
              Education, Community Learning, Online Learning, Hybrid Learning, Reintegration
              Programmes, Transition Support, EOTAS &amp; 52 Week Provision.
            </strong>{' '}
            Every service can be personalised around the learner&apos;s individual circumstances.
          </p>
        </PageHero>

        <WhyChooseUs />
      </div>

      <ServiceCarousel />

      <ClosingCta
        title="Finding The Right Pathway Starts With A Conversation"
        action={<ReferralButton id="pathway-btn-discuss-learner">Discuss a Learner</ReferralButton>}
      >
        Every referral begins by understanding the learner. We&apos;ll help you identify the most
        appropriate education pathway and work collaboratively to achieve positive outcomes.
      </ClosingCta>
    </div>
  );
}
