import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CONTACT_ENQUIRY_HREF } from '@/constants';
import { PageHero } from '@/components/common/PageHero';
import { ClosingCta } from '@/components/common/ClosingCta';
import { WorkingTogether } from '@/components/who-we-support/WorkingTogether';
import { AudienceCarousel } from '@/components/who-we-support/AudienceCarousel';

export const metadata: Metadata = {
  title: 'Who We Support',
  description:
    'MUVE Futures supports learners aged 4 to 25, working closely with families, schools, local authorities, commissioners and SEND professionals.',
};

export default function WhoWeSupportPage() {
  return (
    <div className="relative w-full overflow-hidden bg-[#A5CD39]">
      <PageHero
        badge="Who We Support"
        title="Education Built Around the Learner"
        action={
          <Button asChild variant="orange" size="pill">
            <Link href={CONTACT_ENQUIRY_HREF}>Talk to Our Team</Link>
          </Button>
        }
      >
        <p className="mx-auto max-w-2xl">
          Every child and young person deserves an education that recognises their strengths,
          responds to their needs and gives them a meaningful way forward. MUVE Futures supports
          learners aged 4 to 25 who may be struggling to access or remain in education. We also
          work closely with the families, schools, professionals and organisations involved in
          their journey.
        </p>
      </PageHero>

      <WorkingTogether />

      <AudienceCarousel />

      <ClosingCta
        title="Let's find the right way forward"
        action={
          <Button asChild variant="orange" size="pill">
            <Link href={CONTACT_ENQUIRY_HREF}>Speak with our team</Link>
          </Button>
        }
      >
        Whether you&apos;re a parent looking for guidance, a school seeking support or a
        professional exploring provision for a learner, our team is here to listen.
      </ClosingCta>
    </div>
  );
}
