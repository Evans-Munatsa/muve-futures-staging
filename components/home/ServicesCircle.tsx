import Link from 'next/link';
import { SERVICES_DATA } from '@/constants';
import { homeType } from '@/components/home/homeStyles';
import { cn } from '@/lib/utils';
import { Drift } from '@/components/motion/Drift';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

// The design lays the pills out 2-3-2-3-2 inside the circle.
const ROW_SIZES = [2, 3, 2, 3, 2];
const ROWS = ROW_SIZES.map((count, i) => {
  const start = ROW_SIZES.slice(0, i).reduce((sum, n) => sum + n, 0);
  return SERVICES_DATA.slice(start, start + count);
});

/* Frame y 3676–5153; section coordinates = frame y − 3676. */
export function ServicesCircle() {
  return (
    <section id="services" className="relative overflow-hidden bg-brand-green px-6 py-16 lg:u-h-1477 lg:overflow-visible lg:p-0">
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 1477" aria-hidden="true">
        <Drift depth={6} float={0} interactive={false}>
          <circle cx="960" cy="715" r="660" fill="#F05B25" />
        </Drift>
        <Drift depth={20} float={10} spin={0} delay={0.2} interactive={false}>
          <circle cx="-58" cy="334" r="334" fill="#fff" />
        </Drift>
        <Drift depth={24} float={9} spin={0} delay={0.3}>
          <circle cx="1850" cy="1214" r="230" fill="#99D9E5" />
        </Drift>
        <Drift depth={40} spin={10} delay={0.35}>
          <polygon points="1793.4,307.7 1486.3,403.8 1556.6,89.8" fill="#EC83B5" />
        </Drift>
        <Drift depth={34} spin={-18} delay={0.45}>
          <polygon points="1882.3,607.2 1782.2,612.2 1828,523.1" fill="#F05B25" />
        </Drift>
        <Drift depth={30} spin={16} delay={0.5}>
          <polygon points="281.1,834 253.1,737.9 350.4,761.7" fill="#fff" />
        </Drift>
        <Drift depth={36} spin={-8} delay={0.55}>
          <polygon points="410.8,1268.3 133.3,1336.6 212.9,1062.2" fill="#F05B25" />
        </Drift>
        <Drift depth={32} spin={14} delay={0.6}>
          <polygon points="1600.6,1317.1 1601.6,1183.4 1721.5,1260" fill="#fff" />
        </Drift>
      </svg>

      {/* Pink triangle that overlaps the top of the framework card below */}
      <svg className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 1477" aria-hidden="true">
        <Drift depth={30} spin={-12} delay={0.2}>
          <polygon points="1136.6,1411.2 1176,1613.7 980.9,1546.5" fill="#EC83B5" />
        </Drift>
      </svg>

      {/* On mobile the orange circle becomes a rounded panel */}
      <div className="relative rounded-[3rem] bg-brand-orange px-5 py-12 text-center text-white lg:absolute lg:inset-x-0 lg:u-top-238 lg:rounded-none lg:bg-transparent lg:p-0">
        <Reveal delay={0.2}>
          <p className={homeType.eyebrow}>Our Services</p>
          <h2 className={cn(homeType.heading, 'mt-2 lg:u-mt-10')}>
            Education That Adapts
            <br className="hidden sm:block" /> Around The Learner
          </h2>

          <p className="mt-6 text-base font-bold lg:u-mt-64 lg:u-text-36 lg:leading-[1.2] lg:tracking-[-0.02em]">Our services include</p>
        </Reveal>

        <ul className="mt-5 flex flex-col items-center gap-2.5 lg:u-mt-64 lg:u-gap-33">
          {ROWS.map((row, i) => (
            <li key={i}>
              <Stagger as="ul" stagger={0.08} delay={0.35 + i * 0.12} className="flex flex-wrap justify-center gap-2.5 lg:flex-nowrap lg:u-gap-33">
                {row.map((service) => (
                  <StaggerItem as="li" from="pop" key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      id={`btn-service-${service.id}`}
                      className="flex items-center justify-center rounded-full border-2 border-white px-4 py-1.5 text-xs font-bold text-white transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-rotate-3 hover:scale-110 hover:bg-white hover:text-brand-orange active:scale-95 lg:u-h-51 lg:u-w-330 lg:u-border-6 lg:p-0 lg:u-text-24"
                    >
                      {service.name}
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </li>
          ))}
        </ul>

        <Reveal delay={0.4}>
        <p className="mx-auto mt-8 max-w-xs text-base font-bold leading-[1.3] lg:u-mt-62 lg:u-max-w-560 lg:u-text-36 lg:tracking-[-0.02em]">
          Every pathway is personalised around the learner.
        </p>
        </Reveal>
      </div>
    </section>
  );
}
