'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

/* Brand colours
   green  #A5CD39   orange #F05A28
   navy   #092233   pink   #EE8FC0   cyan #9ADAE6 */

const orangeButton =
  'h-auto rounded-full bg-[#F05A28] px-7 py-3 text-sm font-bold text-white ' +
  'shadow-none transition-colors hover:bg-[#d94e20]';

const orangeLinkButton =
  'inline-block rounded-full bg-[#F05A28] px-4 py-2 text-xs font-bold text-white ' +
  'transition-colors hover:bg-[#d94e20]';

interface AudienceCard {
  id: string;
  title: string;
  eyebrow: string;
  paragraphs: string[];
  linkLabel: string;
}

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    id: 'parents-and-families',
    title: 'Parents and Families',
    eyebrow: 'Helping you understand the way forward',
    paragraphs: [
      "Watching your child struggle with education can feel overwhelming, especially when you're unsure what support is available or where to begin. We take time to understand your child's strengths, interests, needs and aspirations.",
      "We'll explain how Alternative Provision works, how referrals are made and what you can expect throughout their journey.",
    ],
    linkLabel: 'Explore',
  },
  {
    id: 'schools-and-institutions',
    title: 'Schools & Institutions',
    eyebrow: 'Flexible support for learners who need a different approach',
    paragraphs: [
      'Schools are balancing attendance, wellbeing, academic progress and increasingly complex learner needs. MUVE Futures works alongside schools to provide personalised Provision that complements existing support.',
      'Programmes are built around agreed educational goals, regular communication and clear progress reviews.',
    ],
    linkLabel: 'Explore',
  },
  {
    id: 'local-authorities',
    title: 'Local Authorities',
    eyebrow: 'Responsive provision shaped around local need',
    paragraphs: [
      'We work with Local Authorities to create flexible education pathways for children and young people who need support beyond a standard school setting.',
      'Our approach allows provision to be shaped around individual need while maintaining a clear focus on accountability, educational progress and meaningful long-term outcomes.',
    ],
    linkLabel: 'Explore',
  },
  {
    id: 'Commissioners',
    title: 'Local Authorities',
    eyebrow: 'Responsive provision shaped around local need',
    paragraphs: [
      'We work with Local Authorities to create flexible education pathways for children and young people who need support beyond a standard school setting.',
      'Our approach allows provision to be shaped around individual need while maintaining a clear focus on accountability, educational progress and meaningful long-term outcomes.',
    ],
    linkLabel: 'Explore',
  },
  {
    id: 'virtual-schools',
    title: 'Local Authorities',
    eyebrow: 'Responsive provision shaped around local need',
    paragraphs: [
      'We work with Local Authorities to create flexible education pathways for children and young people who need support beyond a standard school setting.',
      'Our approach allows provision to be shaped around individual need while maintaining a clear focus on accountability, educational progress and meaningful long-term outcomes.',
    ],
    linkLabel: 'Explore',
  },
    {
    id: 'care-Providers',
    title: 'Local Authorities',
    eyebrow: 'Responsive provision shaped around local need',
    paragraphs: [
      'We work with Local Authorities to create flexible education pathways for children and young people who need support beyond a standard school setting.',
      'Our approach allows provision to be shaped around individual need while maintaining a clear focus on accountability, educational progress and meaningful long-term outcomes.',
    ],
    linkLabel: 'Explore',
  },
    {
    id: 'send-professionals',
    title: 'SEND Professionals',
    eyebrow: 'Responsive provision shaped around local need',
    paragraphs: [
      'We work with Local Authorities to create flexible education pathways for children and young people who need support beyond a standard school setting.',
      'Our approach allows provision to be shaped around individual need while maintaining a clear focus on accountability, educational progress and meaningful long-term outcomes.',
    ],
    linkLabel: 'Explore',
  },
];

export default function EducationOverviewSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let closestDistance = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardCenter - trackCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setActiveIdx(closest);
      });
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(AUDIENCE_CARDS.length - 1, index));
    const target = cardRefs.current[clamped];
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  const handleArrowMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handlePrev = () => scrollToCard(activeIdx - 1);
  const handleNext = () => scrollToCard(activeIdx + 1);

  return (
    <div className="relative w-full overflow-hidden bg-[#A5CD39]">
      {/* ───────── Hero ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-4xl pt-16 pb-10 text-center sm:pt-24">
        <span className="inline-block rounded-full border-2 border-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-white sm:text-sm">
          Who We Support
        </span>

        <h1 className="mt-8 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Education Built Around the Learner
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
          Every child and young person deserves an education that recognises their
          strengths, responds to their needs and gives them a meaningful way
          forward. MUVE Futures supports learners aged 4 to 25 who may be
          struggling to access or remain in education. We also work closely with
          the families, schools, professionals and organisations involved in
          their journey.
        </p>

        <Button id="hero-btn-talk-to-team" className={`${orangeButton} mt-8`}>
          Talk to Our Team
        </Button>
      </section>

      {/* ───────── Working together around every learner ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-6xl py-14 sm:py-20">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-14">
          {/* Photo, with a soft decorative shape behind it */}
          <div className="relative w-full max-w-sm shrink-0 sm:w-[40%]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#EE8FC0]/60 sm:h-64 sm:w-64"
            />
            <div className="relative overflow-hidden rounded-3xl rounded-tr-[3rem]">
              {/* TODO: replace with the real learner photo asset */}
              <Image
                src="/images/learner-with-backpack.jpg"
                alt="Learner smiling, holding a folder"
                width={480}
                height={560}
                className="relative z-10 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="border-l-4 border-[#F05A28] pl-6 sm:w-[55%]">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Working together around
              <br />
              <span className="text-[#F05A28]">every learner</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white sm:text-base">
              The best outcomes happen when the people supporting a learner share
              information, understand their responsibilities and work towards
              the same goals.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
              We create personalised education pathways with clear outcomes,
              regular communication and joined-up planning. This helps everyone
              involved understand the programme, follow progress and contribute
              to the learner&apos;s next steps.
            </p>

            <Button id="together-btn-explore-services" className={`${orangeButton} mt-7`}>
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── Audience cards carousel ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-6xl pb-16">
        <div className="relative flex items-center">
          <button
            type="button"
            onMouseDown={handleArrowMouseDown}
            onClick={handlePrev}
            disabled={activeIdx === 0}
            aria-label="Previous audience"
            className="absolute -left-4 z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#A5CD39] shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 stroke-[3]" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth sm:gap-8"
          >
            {AUDIENCE_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                id={`card-audience-${card.id}`}
                className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-[#EE8FC0] p-7 sm:w-[calc((100%-4rem)/3)]"
              >
                <h3 className="text-xl font-extrabold leading-tight tracking-tight text-[#092233]">
                  {card.title}
                </h3>

                <span className="mt-2 text-xs font-extrabold uppercase tracking-widest text-[#092233]">
                  {card.eyebrow}
                </span>

                {card.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-sm leading-relaxed text-[#092233]">
                    {p}
                  </p>
                ))}

                <a
                  href={`/who-we-support/${card.id}`}
                  className={`${orangeLinkButton} mt-6 w-fit`}
                >
                  {card.linkLabel} →
                </a>
              </div>
            ))}
          </div>

          <button
            type="button"
            onMouseDown={handleArrowMouseDown}
            onClick={handleNext}
            disabled={activeIdx === AUDIENCE_CARDS.length - 1}
            aria-label="Next audience"
            className="absolute -right-4 z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#A5CD39] shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 stroke-[3]" />
          </button>
        </div>

        <style jsx>{`
          .no-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* ───────── Closing CTA ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-4xl py-16 text-center sm:py-24">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Let&apos;s find the right way forward
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
          Whether you&apos;re a parent looking for guidance, a school seeking support
          or a professional exploring provision for a learner, our team is here
          to listen.
        </p>

        <Button id="closing-btn-speak-with-team" className={`${orangeButton} mt-8`}>
          Speak with our team
        </Button>
      </section>
    </div>
  );
}
