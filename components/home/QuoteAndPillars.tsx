'use client';

import React, { useState } from 'react';
import { PILLARS_DATA } from '@/data/content';
import { Button } from '@/components/ui/button';
import { RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';

interface QuoteAndPillarsProps {
  onLearnMore: () => void;
  onSelectPillar?: (pillarId: string) => void;
}

const ORANGE = '#F05A28';
const GREEN = '#A5CD39';
const PINK = '#EA86B8';

/* Top corner rounding per card, taken from the design:
   card 1 and card 3 have a large top-right curve, cards 2 and 4 are square. */
const CARD_RADIUS = [
  'rounded-tr-[min(4.8vw,50px)]',
  '',
  'rounded-tr-[min(4.8vw,50px)]',
  '',
];

export const QuoteAndPillars: React.FC<QuoteAndPillarsProps> = ({
  onLearnMore,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleToggleFlip = (pillarId: string) => {
    setFlippedCards((prev) => ({ ...prev, [pillarId]: !prev[pillarId] }));
  };

  return (
    <section
      id="quote-and-pillars"
      className="relative w-full overflow-hidden pt-[max(4.3vw,2rem)] pb-[max(5vw,2rem)]"
      // orange on top, green band across the lower part of the cards
      style={{
        background: `linear-gradient(to bottom, ${ORANGE} 72%, ${GREEN} 72%)`,
      }}
    >
      {/* Quote + button */}
      <div className="relative z-10 mx-auto flex w-[90%] flex-col items-center text-center">
        <p className="max-w-[75rem] lg:w-[75%] text-[clamp(0.9rem,1.55vw,1.6rem)] font-bold leading-[1.4] text-white">
          “Every programme is designed around the individual learner rather than
          expecting every learner to fit a standard model. We adapt education to
          meet each young person’s needs, goals and preferred way of learning.”
        </p>

        <Button
          id="quote-btn-learn-more"
          onClick={onLearnMore}
          className="mt-[clamp(1.25rem,2.7vw,3rem)] h-auto rounded-full px-[clamp(1.25rem,3.3vw,3.5rem)] py-[clamp(0.4rem,0.65vw,0.7rem)] text-[clamp(0.8rem,1.25vw,1.15rem)] font-bold text-white shadow-none hover:opacity-90"
          style={{ backgroundColor: GREEN }}
        >
          Learn More
        </Button>
      </div>

      {/* Cards */}
      <div className="relative mx-auto mt-[clamp(1.5rem,3.6vw,4rem)] grid w-[90%] grid-cols-2 gap-4 lg:w-[79.4%] lg:max-w-[1000px] lg:grid-cols-4 lg:gap-[2.3%]">
        {PILLARS_DATA.map((pillar, idx) => {
          const isFlipped = !!flippedCards[pillar.id];

          return (
            <div
              key={pillar.id}
              id={`card-pillar-${pillar.id}`}
              className="relative aspect-[194/342] w-full select-none [perspective:1000px]"
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  isFlipped
                    ? '[transform:rotateY(180deg)]'
                    : '[transform:rotateY(0deg)]'
                }`}
              >
                {/* FRONT */}
                <div
                  onClick={() => handleToggleFlip(pillar.id)}
                  className="absolute inset-0 cursor-pointer [backface-visibility:hidden] [transform:rotateY(0deg)]"
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className={`h-full w-full object-cover ${CARD_RADIUS[idx] ?? ''}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  <button
                    type="button"
                    id={`btn-flip-${pillar.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFlip(pillar.id);
                    }}
                    aria-label={`Flip ${pillar.tag} card`}
                    className="absolute bottom-0 left-0 flex h-[11%] w-full cursor-pointer items-center justify-center rounded-full text-[clamp(0.8rem,1.5vw,1.2rem)] font-bold text-white transition-colors hover:brightness-95"
                    style={{ backgroundColor: PINK }}
                  >
                    {pillar.tag}
                  </button>
                </div>

                {/* BACK */}
                <div
                  onClick={() => handleToggleFlip(pillar.id)}
                  className="absolute inset-0 flex cursor-pointer flex-col justify-between overflow-y-auto rounded-3xl bg-white p-5 text-[#092233] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-[#f05a28]/10 p-1.5 text-[#f05a28]">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-extrabold text-[#092233]">
                          {pillar.title}
                        </span>
                      </div>

                      <button
                        type="button"
                        id={`btn-flip-back-${pillar.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFlip(pillar.id);
                        }}
                        className="cursor-pointer rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800"
                        title="Flip back"
                        aria-label={`Flip back ${pillar.title}`}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold leading-snug">
                      {pillar.subtitle}
                    </h4>

                    {pillar.description && (
                      <p className="text-xs leading-relaxed text-neutral-600">
                        {pillar.description}
                      </p>
                    )}

                    {pillar.points && pillar.points.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {pillar.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 text-xs text-neutral-700"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8cc63f]" />
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-neutral-100 pt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFlip(pillar.id);
                      }}
                      className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-neutral-100 px-4 py-2.5 text-xs font-bold text-[#092233] transition hover:bg-neutral-200"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-[#d93c8c]" />
                      <span>Flip Back</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* White triangles, positioned exactly as in the design (desktop only) */}
        <svg
          className="pointer-events-none absolute inset-0 z-30 hidden h-full w-full overflow-visible lg:block"
          viewBox="0 0 831 343"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* top-left of card 2 */}
          <polygon points="209,0 244,-20 244,18" fill="#fff" />
          {/* left of card 1 */}
          <polygon points="-17,158 14,122 21,150" fill="#fff" />
          {/* bottom-left of card 3 */}
          <polygon points="413,218 453,218 438,185" fill="#fff" />
          {/* above card 4 */}
          <polygon points="757,-11 796,-11 776,23" fill="#fff" />
        </svg>
      </div>
    </section>
  );
};
