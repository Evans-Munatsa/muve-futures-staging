import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReferralButton } from '@/components/common/ActionButtons';
import { homeButton, homeType } from '@/components/home/homeStyles';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { HomeContent } from '@/lib/content/pages';

/* Frame y 2460–3676; the cyan card sits at y 3021 (561 in section terms). */
export function JourneyAndWhoWeSupport({
  journey,
  whoWeSupport,
}: {
  journey: HomeContent['journey'];
  whoWeSupport: HomeContent['whoWeSupport'];
}) {
  return (
    <section id="who-we-support" className="relative bg-brand-green px-6 pt-12 pb-16 lg:u-h-1216 lg:p-0">
      {/* Every Journey Starts Somewhere Different */}
      <Reveal from="left" className="text-white lg:absolute lg:u-left-292 lg:u-top-48">
        <h2 className={homeType.heading}>
          <Lines text={journey.title} />
        </h2>
        <p className={cn(homeType.body, 'mt-5 max-w-2xl lg:u-mt-28 lg:u-w-1060 lg:max-w-none')}>
          {journey.body}
        </p>
      </Reveal>

      <Reveal from="pop" delay={0.25} className="mt-7 lg:absolute lg:u-left-291 lg:u-top-433 lg:mt-0">
        <ReferralButton id="journey-btn-referral" variant="outline-white" className={homeButton.outline}>
          {journey.cta}
        </ReferralButton>
      </Reveal>

      {/* WHO WE SUPPORT card */}
      <Reveal className="relative mt-12 rounded-tl-[3rem] bg-brand-cyan px-7 py-10 text-brand-ink lg:absolute lg:u-left-200 lg:u-top-561 lg:u-h-600 lg:u-w-1520 lg:mt-0 lg:u-rounded-tl-80 lg:p-0">
        <div className="lg:absolute lg:u-left-78 lg:u-top-58">
          <p className={cn(homeType.eyebrow, 'text-white')}>{whoWeSupport.eyebrow}</p>
          <h3 className={cn(homeType.heading, 'mt-2 lg:u-mt-10')}>
            <Lines text={whoWeSupport.title} />
          </h3>
          <p className={cn(homeType.body, 'mt-5 lg:u-mt-33 lg:u-w-850')}>
            {whoWeSupport.body}
          </p>
        </div>

        <div className="mt-7 lg:absolute lg:u-left-78 lg:u-top-493 lg:mt-0">
          <Button asChild variant="outline-white" className={cn(homeButton.outlineSm, 'lg:u-w-330')}>
            <Link id="who-we-support-btn-explore" href="/services">
              {whoWeSupport.cta}
            </Link>
          </Button>
        </div>
      </Reveal>

      {/* Cut-out photo standing on the card's bottom edge: rises out of the card */}
      <Reveal from="up" delay={0.3} className="relative mx-auto mt-6 aspect-[698/927] w-2/3 max-w-xs lg:absolute lg:u-left-1132 lg:u-top-234 lg:u-h-927 lg:u-w-698 lg:mt-0 lg:max-w-none">
        <Image
          src="/images/home/raising-arms.webp"
          alt="Excited child in a yellow T-shirt smiling with both arms raised"
          fill
          sizes="(min-width: 1024px) 37vw, 66vw"
          className="object-contain"
        />
      </Reveal>
    </section>
  );
}
