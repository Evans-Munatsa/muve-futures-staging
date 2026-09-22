'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Crown,
  Users,
  Users2,
  HeartHandshake,
  Brain,
  ShieldCheck,
  Laptop,
  Shuffle,
  RotateCcw,
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* Brand colours
   green  #A5CD39   orange #F05A28
   navy   #092233   pink   #EE8FC0   cyan #9ADAE6   light card #DCEEB0 */

const orangeButton =
  'h-auto rounded-full bg-[#F05A28] px-7 py-3 text-sm font-bold text-white ' +
  'shadow-none transition-colors hover:bg-[#d94e20]';

const orangeLinkButton =
  'inline-block rounded-full bg-[#F05A28] px-4 py-2 text-xs font-bold text-white ' +
  'transition-colors hover:bg-[#d94e20]';

interface ServiceCard {
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  linkLabel: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'alternative-provision',
    icon: <Crown className="h-5 w-5" />,
    eyebrow: 'Personalised Pathways',
    title: 'Alternative Provision',
    description:
      'Education shaped around learners who need a different approach to school.',
    points: [
      'Flexible delivery',
      'Individual learning goals',
      'Regular reviews and transition planning',
    ],
    linkLabel: 'Explore Alternative Provision',
  },
  {
    id: 'one-to-one-education',
    icon: <Users className="h-5 w-5" />,
    eyebrow: 'Individual Support',
    title: 'One-to-One Education',
    description:
      "Teaching tailored to one learner's strengths, needs and pace.",
    points: [
      'Personalised learning plan',
      'Flexible learning environment',
      'Progress and transition support',
    ],
    linkLabel: 'Explore one-to-one education',
  },
  {
    id: 'community-learning',
    icon: <Users2 className="h-5 w-5" />,
    eyebrow: 'Learning Through Experience',
    title: 'Community Learning',
    description:
      'Purposeful learning in real-world spaces that builds confidence and practical skills.',
    points: [
      'Activities linked to learning goals',
      'Communication and social skills',
      'Independence and life skills',
    ],
    linkLabel: 'Explore community learning',
  },
  {
    id: 'send-support',
    icon: <Brain className="h-5 w-5" />,
    eyebrow: 'Specialist Support',
    title: 'SEND Support',
    description:
      'Education tailored around learners with special educational needs and disabilities.',
    points: [
      'Specialist, EHCP-informed planning',
      'Adapted teaching strategies',
      'Close work with families and professionals',
    ],
    linkLabel: 'Explore SEND support',
  },
  {
    id: 'semh-support',
    icon: <HeartHandshake className="h-5 w-5" />,
    eyebrow: 'Relationship Based',
    title: 'SEMH Support',
    description:
      'Nurturing provision for learners with social, emotional and mental health needs.',
    points: [
      'Trauma-informed practice',
      'Consistent, trusted relationships',
      'Emotional regulation support',
    ],
    linkLabel: 'Explore SEMH support',
  },
  {
    id: 'ebsna-support',
    icon: <ShieldCheck className="h-5 w-5" />,
    eyebrow: 'Gradual Re-engagement',
    title: 'EBSNA Support',
    description:
      'Supportive, low-pressure re-engagement for learners experiencing school avoidance.',
    points: [
      'Gradual, learner-led reintroduction',
      'Anxiety-informed approach',
      'Close family communication',
    ],
    linkLabel: 'Explore EBSNA support',
  },
  {
    id: 'online-learning',
    icon: <Laptop className="h-5 w-5" />,
    eyebrow: 'Flexible Delivery',
    title: 'Online Learning',
    description:
      'Structured remote teaching for learners who need to learn away from a classroom.',
    points: [
      'Live, timetabled sessions',
      'Accessible from any safe space',
      'Regular progress check-ins',
    ],
    linkLabel: 'Explore online learning',
  },
  {
    id: 'hybrid-learning',
    icon: <Shuffle className="h-5 w-5" />,
    eyebrow: 'Best Of Both',
    title: 'Hybrid Learning',
    description:
      'A blend of in-person and online provision, built around what the learner can sustain.',
    points: [
      'Flexible in-person and online split',
      'Paced to the learner',
      'Reviewed and adjusted regularly',
    ],
    linkLabel: 'Explore hybrid learning',
  },
  {
    id: 'reintegration-programmes',
    icon: <RotateCcw className="h-5 w-5" />,
    eyebrow: 'Back Into Education',
    title: 'Reintegration Programmes',
    description:
      'Structured, staged support to help learners return successfully to mainstream education.',
    points: [
      'Staged reintegration timetable',
      'Close liaison with receiving schools',
      'Ongoing monitoring and review',
    ],
    linkLabel: 'Explore reintegration programmes',
  },
  {
    id: 'transition-support',
    icon: <ArrowRightLeft className="h-5 w-5" />,
    eyebrow: 'Smooth Handover',
    title: 'Transition Support',
    description:
      'Guided support through key changes, from moving settings to preparing for what comes next.',
    points: [
      'Personalised transition planning',
      'Support for learners and families',
      'Handover to the next setting or provider',
    ],
    linkLabel: 'Explore transition support',
  },
];

export default function ServicesPageContent() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Keep the dots/arrow-disabled state in sync with whatever card is
  // actually centred in view, including when the user swipes by hand.
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

  // Scroll the TRACK ITSELF to the target card's left edge, computed
  // relative to the track's own position. We deliberately avoid
  // `element.scrollIntoView()` here: per spec it's allowed to scroll every
  // scrollable ancestor needed to bring the element into view (not just
  // this track), and in practice that's what was causing the whole
  // section/page to visibly shift on click. Combined with `snap-mandatory`
  // it could also fight the browser's own snap correction, which made the
  // arrows feel unreliable (sometimes needing two clicks to move one
  // card). Calling `track.scrollTo()` with an explicit `left` value keeps
  // the scroll fully contained to the carousel and lands exactly where we
  // want every time.
  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(SERVICE_CARDS.length - 1, index));
    const target = cardRefs.current[clamped];
    if (!target) return;

    // target.offsetLeft / track.offsetLeft are both relative to the same
    // positioned ancestor (the `relative` wrapper div), so subtracting
    // gives the card's position relative to the track's own scroll area.
    const left = target.offsetLeft - track.offsetLeft;

    track.scrollTo({ left, behavior: 'smooth' });
  };

  // Prevent the browser's click-to-focus behaviour on these edge-anchored
  // buttons from nudging the page to keep them in view — mousedown fires
  // before focus, so preventing default here stops the focus (and any
  // associated scroll-into-view) without blocking the click/keyboard use.
  const handleArrowMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handlePrev = () => scrollToCard(activeIdx - 1);
  const handleNext = () => scrollToCard(activeIdx + 1);

  return (
    <div className="relative w-full overflow-hidden bg-[#A5CD39]">
      {/* ───────── Decorative shapes ───────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[9%] h-16 w-16 bg-[#9ADAE6] [clip-path:polygon(0_100%,0_0,100%_65%)] sm:h-28 sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[27%] h-56 w-56 rounded-full bg-[#F05A28] sm:h-72 sm:w-72"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[13%] top-[29%] z-10 h-10 w-10 bg-white [clip-path:polygon(0_100%,50%_0,100%_100%)] sm:h-16 sm:w-16"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[19%] top-[32%] h-14 w-16 bg-[#EE8FC0] [clip-path:polygon(0_0,100%_30%,15%_100%)] sm:h-20 sm:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[24%] h-56 w-56 rounded-full bg-[#9ADAE6] sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[44%] z-10 h-10 w-10 bg-white [clip-path:polygon(0_100%,50%_0,100%_100%)] sm:h-16 sm:w-16"
      />

      {/* ───────── Hero ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-5xl pt-16 pb-10 text-center sm:pt-24">
        <span className="inline-block rounded-full border-2 border-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-white sm:text-sm">
          Accredited &amp; Therapeutic Pathways
        </span>

        <h1 className="mt-8 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Education That Adapts Around The Learner
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-sm leading-relaxed text-white sm:text-base">
          Our services include <strong>Alternative Provision, SEND Support, SEMH
          Support, EBSNA Support, One-to-One Education, Community Learning,
          Online Learning, Hybrid Learning, Reintegration Programmes, Transition
          Support, EOTAS &amp; 52 Week Provision.</strong> Every service can be
          personalised around the learner&apos;s individual circumstances.
        </p>

        <Button id="hero-btn-explore-services" className={`${orangeButton} mt-8`}>
          Explore Our Services
        </Button>
      </section>

      {/* ───────── Why Choose Us ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-5xl py-16 text-center sm:py-24">
        <span className="text-xs font-extrabold uppercase tracking-widest text-white sm:text-sm">
          Why Choose Us
        </span>

        <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-10 sm:text-left">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:w-[42%] sm:text-4xl">
            Structured For Impact, Built With Care
          </h2>

          <div className="border-l-4 border-[#F05A28] pl-5 text-left sm:w-[42%]">
            <p className="text-sm leading-relaxed text-white sm:text-base">
              We don&apos;t simply deliver education. We build confidence, create
              positive relationships, support independence and prepare learners
              for successful futures through structured, personalised
              programmes.
            </p>
          </div>
        </div>

        <Button
          id="whychooseus-btn-explore-services"
          className={`${orangeButton} mt-9`}
        >
          Explore Our Services
        </Button>
      </section>

      {/* ───────── Service cards carousel ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-6xl pb-20">
        <div className="relative flex items-center">
          <button
            type="button"
            onMouseDown={handleArrowMouseDown}
            onClick={handlePrev}
            disabled={activeIdx === 0}
            aria-label="Previous service"
            className="absolute -left-4 z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F05A28] text-white shadow-md transition hover:bg-[#d94e20] disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 stroke-[3]" />
          </button>

          {/* Scroll track: native smooth scrolling + snap, one card at a
              time. Scrollbar hidden via the inline <style> block below. */}
          <div
            ref={trackRef}
            className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth sm:gap-8"
          >
            {SERVICE_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                id={`card-service-${card.id}`}
                className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl rounded-tr-[3rem] bg-[#DCEEB0] p-7 sm:w-[calc((100%-4rem)/3)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F05A28] text-white">
                  {card.icon}
                </span>

                <span className="mt-5 text-xs font-extrabold uppercase tracking-widest text-[#092233]">
                  {card.eyebrow}
                </span>

                <h3 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-[#092233]">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#092233]">
                  {card.description}
                </p>

                <ul className="mt-3 space-y-1 text-sm font-semibold text-[#092233]">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden="true">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`/services/${card.id}`}
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
            disabled={activeIdx === SERVICE_CARDS.length - 1}
            aria-label="Next service"
            className="absolute -right-4 z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F05A28] text-white shadow-md transition hover:bg-[#d94e20] disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 stroke-[3]" />
          </button>
        </div>

        {/* Position indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {SERVICE_CARDS.map((card, i) => (
            <button
              key={card.id}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Go to ${card.title}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIdx ? 'w-6 bg-[#F05A28]' : 'w-2 bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Hide the native scrollbar on the track; the arrows/dots are the
            visible controls, scroll-snap still lets people swipe/drag it. */}
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

      {/* ───────── Finding the right pathway ───────── */}
      <section className="relative z-20 mx-auto w-[90%] max-w-4xl py-16 text-center sm:py-24">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Finding The Right Pathway Starts With A Conversation
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
          Every referral begins by understanding the learner. We&apos;ll help you
          identify the most appropriate education pathway and work
          collaboratively to achieve positive outcomes.
        </p>

        <Button id="pathway-btn-discuss-learner" className={`${orangeButton} mt-8`}>
          Discuss a Learner
        </Button>
      </section>
    </div>
  );
}
