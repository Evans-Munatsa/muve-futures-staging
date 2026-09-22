'use client';

import { SnapCarousel } from '@/components/common/SnapCarousel';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICE_OFFERINGS } from '@/constants';

export function ServiceCarousel() {
  return (
    <section id="our-services" className="relative z-20 mx-auto w-[90%] max-w-6xl scroll-mt-28 pb-20">
      <h2 className="sr-only">Our services</h2>
      <Reveal>
        <SnapCarousel
          items={SERVICE_OFFERINGS.filter((service) => service.listed !== false)}
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
