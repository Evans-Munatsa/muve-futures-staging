'use client';

import { SnapCarousel } from '@/components/common/SnapCarousel';
import { Reveal } from '@/components/motion/Reveal';
import { AudienceCard } from '@/components/who-we-support/AudienceCard';
import { AUDIENCES } from '@/constants';

export function AudienceCarousel() {
  return (
    <section id="audiences" className="relative z-20 mx-auto w-[90%] max-w-6xl scroll-mt-28 pt-14 sm:pt-16">
      <h2 className="sr-only">Who we work with</h2>
      <Reveal>
        <SnapCarousel
          items={AUDIENCES}
          getKey={(audience) => audience.slug}
          getLabel={(audience) => audience.title}
          renderItem={(audience) => <AudienceCard audience={audience} />}
          itemNoun="audience"
          arrowClassName="bg-white text-[#A5CD39] hover:bg-white/90"
        />
      </Reveal>
    </section>
  );
}
