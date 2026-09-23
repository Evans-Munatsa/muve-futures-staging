'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { HomeContent } from '@/lib/content/pages';
import { Button } from '@/components/ui/button';
import { homeButton } from '@/components/home/homeStyles';
import { cn } from '@/lib/utils';
import { Drift } from '@/components/motion/Drift';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Tilt } from '@/components/motion/Tilt';

/*
 * Frame y 1464–2460. Orange runs to y 2217 (753 in section terms); cards sit at
 * y 1782 (318). Each card column is the 356-wide pink tag; the photo is 354 wide,
 * inset by 1 either side. Corners with the 80-unit curve alternate as designed.
 */
const CARDS = [
  { left: 'lg:u-left-198', corner: 'rounded-tr-[2.5rem] lg:u-rounded-tr-80' },
  { left: 'lg:u-left-587', corner: 'rounded-tl-[2.5rem] lg:u-rounded-tl-80' },
  { left: 'lg:u-left-976', corner: 'rounded-tr-[2.5rem] lg:u-rounded-tr-80' },
  { left: 'lg:u-left-1365', corner: 'rounded-tl-[2.5rem] lg:u-rounded-tl-80' },
];

export function QuoteAndPillars({
  quote,
  pillars,
  onLearnMore,
}: {
  quote: HomeContent['quote'];
  pillars: HomeContent['pillars'];
  onLearnMore: () => void;
}) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section
      id="quote-and-pillars"
      className="relative scroll-mt-24 bg-[linear-gradient(to_bottom,#F05B25_72%,#A5CD39_72%)] px-6 pt-12 pb-14 lg:u-h-996 lg:bg-none lg:p-0"
    >
      {/* Orange band behind the quote and the top of the cards */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden bg-brand-orange lg:block lg:u-h-753" />

      <Reveal className="relative text-center text-white lg:absolute lg:inset-x-0 lg:u-top-80">
        <p className="mx-auto max-w-3xl text-base font-bold leading-[1.3] sm:text-xl lg:u-max-w-1560 lg:u-text-28 lg:tracking-[-0.02em]">
          {quote.text}
        </p>
      </Reveal>

      <Reveal from="pop" delay={0.2} className="relative mt-6 flex justify-center lg:absolute lg:u-left-836 lg:u-top-197 lg:mt-0">
        <Button
          id="quote-btn-learn-more"
          onClick={onLearnMore}
          className={cn(homeButton.solid, 'bg-brand-green hover:brightness-95')}
        >
          {quote.cta}
        </Button>
      </Reveal>

      <Stagger as="ul" stagger={0.14} className="relative mx-auto mt-10 grid max-w-xl grid-cols-2 gap-4 lg:static lg:mt-0 lg:block lg:max-w-none">
        {pillars.slice(0, CARDS.length).map((pillar, i) => {
          const id = `${i}-${pillar.tag}`;
          const isFlipped = !!flipped[id];
          const { left, corner } = CARDS[i];

          return (
            <StaggerItem
              as="li"
              from="up"
              key={id}
              id={`card-pillar-${i + 1}`}
              className={cn(
                'relative aspect-[356/627] lg:absolute lg:u-top-318 lg:u-h-627 lg:u-w-356 lg:aspect-auto',
                left
              )}
            >
              <Tilt className="h-full w-full [perspective:1000px]">
              <button
                type="button"
                onClick={() => toggle(id)}
                aria-pressed={isFlipped}
                aria-label={`${pillar.tag}: ${isFlipped ? 'show photo' : 'show details'}`}
                className={cn(
                  'relative block h-full w-full cursor-pointer text-left transition-transform duration-700 [transform-style:preserve-3d]',
                  isFlipped && '[transform:rotateY(180deg)]'
                )}
              >
                {/* Front: photo with the pink tag overlapping its bottom edge */}
                <span className="absolute inset-0 [backface-visibility:hidden]">
                  <span className={cn('absolute inset-x-[0.28%] top-0 bottom-[5.6%] overflow-hidden', corner)}>
                    <Image src={pillar.image} alt="" fill sizes="(min-width: 1024px) 19vw, 45vw" className="object-cover" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex h-[11%] items-center justify-center rounded-full bg-brand-pink text-sm font-bold text-white sm:text-base lg:u-text-30">
                    {pillar.tag}
                  </span>
                </span>

                {/* Back: the pillar in more detail */}
                <span
                  className={cn(
                    'absolute inset-0 flex flex-col overflow-y-auto bg-white p-5 text-brand-ink [backface-visibility:hidden] [transform:rotateY(180deg)] lg:u-px-32 lg:u-py-36',
                    corner
                  )}
                >
                  <span className="text-base font-bold lg:u-text-30">{pillar.title}</span>
                  <span className="mt-2 text-xs font-semibold leading-snug lg:u-text-20">{pillar.subtitle}</span>
                  <span className="mt-3 space-y-2">
                    {pillar.points.map((point) => (
                      <span key={point} className="flex items-start gap-2 text-xs leading-snug lg:u-text-18">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" aria-hidden="true" />
                        {point}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-bold text-brand-orange lg:u-text-18">
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Flip back
                  </span>
                </span>
              </button>
              </Tilt>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* White triangles; section coordinates = frame y − 1464 */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 996" aria-hidden="true">
        <Drift depth={30} spin={16}>
          <polygon points="167.1,608.2 188.3,537.7 238.7,591.3" fill="#fff" />
        </Drift>
        <Drift depth={36} spin={-14} delay={0.15}>
          <polygon points="647.9,352.6 581.3,321.2 641.8,279.2" fill="#fff" />
        </Drift>
        <Drift depth={28} spin={12} delay={0.3}>
          <polygon points="953.4,714.2 994.9,653.3 1026.9,719.6" fill="#fff" />
        </Drift>
        <Drift depth={34} spin={-16} delay={0.45}>
          <polygon points="1583.6,297.1 1657.2,295.9 1621.5,360.3" fill="#fff" />
        </Drift>
      </svg>
    </section>
  );
}
