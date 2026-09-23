'use client';

import { SnapCarousel } from '@/components/common/SnapCarousel';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import type { ServiceOffering } from '@/constants';

/** The cards on /services; `services` comes from the CMS. */
export function ServiceCarousel({ services }: { services: ServiceOffering[] }) {
  return (
    <section id="our-services" className="relative z-20 mx-auto w-[90%] max-w-6xl scroll-mt-28 pb-20">
      <h2 className="sr-only">Our services</h2>
      <Reveal>
        <SnapCarousel
          items={services}
          getKey={(service) => service.slug}
          getLabel={(service) => service.title}
          renderItem={(service) => <ServiceCard service={service} />}
          itemNoun="service"
          arrowClassName="bg-brand-orange text-white hover:bg-[#d94e20]"
        />
      </Reveal>
    </section>
  );
}
