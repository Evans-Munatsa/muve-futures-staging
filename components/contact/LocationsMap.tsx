import { MapPin } from 'lucide-react';

const COVERAGE_AREAS = [
  'Birmingham',
  'Solihull',
  'Sandwell & Dudley',
  'Wolverhampton & Walsall',
  'Coventry & Warwickshire',
  'Worcestershire',
];

export function LocationsMap() {
  return (
    <section id="locations-map" className="scroll-mt-36 bg-brand-green pb-20 sm:pb-28">
      <div className="mx-auto w-[90%] max-w-6xl rounded-tl-[3rem] bg-brand-cyan px-7 py-12 text-brand-ink sm:rounded-tl-[5rem] sm:px-14 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-wide text-white sm:text-base">Where We Work</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
          Supporting Learners Across The West Midlands
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed sm:text-lg">
          Our teachers and mentors work with learners at home, in the community and in local
          learning spaces across the region.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {COVERAGE_AREAS.map((area) => (
            <li
              key={area}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold"
            >
              <MapPin className="h-4 w-4 text-brand-orange" aria-hidden="true" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
