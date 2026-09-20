'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FRAMEWORK_STAGES } from '@/data/content';
import { FrameworkStage } from '@/types';
import { Button } from '@/components/ui/button';

interface FourStageApproachProps {
  onDiscoverMore: (stage: FrameworkStage) => void;
  onBookIntro: () => void;
  onOpenReferral: () => void;
}

/* Brand colours
   green  #A5CD39   orange #F05A28   navy #092233
   pink   #EA86B8   cyan   #9ADAE6   light green #D8EC92 */

/* Small outlined pill button, reused three times */
const outlineButton =
  'h-auto rounded-full border-[1.5px] border-[#092233] bg-transparent px-3 py-1 ' +
  'text-[10px] font-bold text-[#092233] shadow-none transition-colors ' +
  'hover:bg-[#092233] hover:text-white sm:px-6 sm:py-2 sm:text-sm';

/* Round orange arrow buttons for the stage slider */
const arrowButton =
  'flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full ' +
  'bg-[#F05A28] text-white transition-transform hover:scale-105 active:scale-95 ' +
  'sm:h-10 sm:w-10';

export const FourStageApproach: React.FC<FourStageApproachProps> = ({
  onDiscoverMore,
  onBookIntro,
  onOpenReferral,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeStage = FRAMEWORK_STAGES[currentIdx];

  const handlePrev = () =>
    setCurrentIdx((prev) => (prev === 0 ? FRAMEWORK_STAGES.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIdx((prev) => (prev === FRAMEWORK_STAGES.length - 1 ? 0 : prev + 1));

  return (
    <section
      id="framework"
      className="relative overflow-hidden bg-[#A5CD39] pt-4 pb-5 sm:pt-8 sm:pb-16"
    >
      {/* ───────── Decorative shapes ───────── */}

      {/* Light-blue circle, top-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-4 h-14 w-14 rounded-full bg-[#9ADAE6] sm:-top-24 sm:-right-8 sm:h-28 sm:w-28"
      />

      {/* Light-blue circle, bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-11 -left-7 h-24 w-24 rounded-full bg-[#9ADAE6] sm:bottom-24 sm:-left-14 sm:h-48 sm:w-48"
      />

      {/* White triangle, bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-3 z-10 h-7 w-6 bg-white [clip-path:polygon(0_100%,100%_0,100%_100%)] sm:bottom-10 sm:left-6 sm:h-14 sm:w-12"
      />

      {/* Large pink triangle, bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-16 h-14 w-16 bg-[#EA86B8] [clip-path:polygon(0_0,100%_35%,15%_100%)] sm:right-6 sm:bottom-32 sm:h-28 sm:w-32"
      />

      {/* ───────── White framework card ───────── */}
      <div className="relative z-20 mx-auto w-[79%] max-w-4xl pt-10">
        <div className="rounded-tr-[2.5rem] bg-white px-5 pt-4 pb-4 sm:rounded-tr-[4rem] sm:px-10 sm:pt-8 sm:pb-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="max-w-[58%] sm:max-w-none">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#F05A28] sm:text-sm">
                Our Framework
              </span>

              <h2 className="mt-1 text-[1.375rem] font-extrabold leading-[1.15] tracking-tight text-[#092233] sm:mt-2 sm:text-4xl lg:text-5xl">
                The Four Stage Approach
              </h2>

              <p className="mt-2 text-[10px] font-medium text-[#092233] sm:text-base">
                Every programme follows a structured approach
              </p>
            </div>

            <Button
              id="btn-discover-approach"
              variant="outline"
              onClick={() => onDiscoverMore(activeStage)}
              className={`${outlineButton} whitespace-nowrap`}
            >
              Discover Our Approach
            </Button>
          </div>

          {/* Stage slider bar */}
          <div className="mt-2 flex h-10 items-center justify-between rounded-full bg-[#D8EC92] px-1 sm:mt-6 sm:h-16 sm:px-3">
            <button
              id="stage-slider-prev"
              onClick={handlePrev}
              aria-label="Previous Stage"
              className={arrowButton}
            >
              <ChevronLeft className="h-4 w-4 stroke-[3] sm:h-6 sm:w-6" />
            </button>

            <p className="flex-1 px-2 text-center text-[11px] font-semibold text-[#092233] sm:text-lg lg:text-xl">
              {activeStage.headline}
            </p>

            <button
              id="stage-slider-next"
              onClick={handleNext}
              aria-label="Next Stage"
              className={arrowButton}
            >
              <ChevronRight className="h-4 w-4 stroke-[3] sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* Pink triangle overlapping the top edge of the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 left-[52%] aspect-[41/43] w-[12.5%] bg-[#EA86B8] [clip-path:polygon(0_86%,83%_0,100%_100%)] sm:-top-6"
        />

        {/* Small dark-green triangle, right side of the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[34%] left-[82%] aspect-square w-[6%] bg-[#8CC63F] [clip-path:polygon(0_0,100%_10%,35%_100%)]"
        />
      </div>

      {/* ───────── Photo banner ───────── */}
      <div className="relative -mt-2 max-h-[36rem] w-full">
        <img
          src="/three-young-girls.svg"
          alt="Three young children joyfully engaged in collaborative learning around a classroom table"
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* ───────── Notebook ───────── */}
      <div className="relative z-10 mx-auto -mt-7 w-[61%] max-w-3xl sm:-mt-16">
        <div className="relative flex aspect-[252/145] flex-col items-center justify-center py-[5%] pr-[5%] pl-[10%] text-center">
          <img
            src="/notebook.svg"
            alt=""
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill"
          />

          <div className="relative z-10 space-y-2 sm:space-y-4">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#092233] sm:text-sm">
              Partnerships
            </span>

            <h3 className="text-lg font-extrabold leading-tight tracking-tight text-[#092233] sm:text-3xl">
              Working Together Around Every Learner
            </h3>

            <p className="mx-auto max-w-[80%] text-[10px] leading-relaxed text-neutral-700 sm:text-base">
              Positive outcomes are achieved through collaboration. We work closely
              with schools, Local Authorities, commissioners, families and
              professionals to create joined-up education pathways that place the
              learner at the centre of every decision.
            </p>

            <Button
              id="btn-book-intro"
              variant="outline"
              onClick={onBookIntro}
              className={outlineButton}
            >
              Book an Intro Call
            </Button>
          </div>
        </div>
      </div>

      {/* ───────── Referral ───────── */}
      <div
        id="referral"
        className="relative z-10 mx-auto mt-12 w-[65%] max-w-3xl space-y-2 text-center text-white sm:mt-24 sm:space-y-5"
      >
        <span className="block text-[10px] font-black uppercase tracking-widest sm:text-sm">
          Referral
        </span>

        <h2 className="text-xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          A Simple Referral Journey
        </h2>

        <p className="text-[10px] leading-snug sm:text-lg sm:leading-relaxed">
          Making a referral is straightforward. We begin with a conversation,
          understand the learner’s needs and desired outcomes, recommend the most
          appropriate pathway and provide regular communication throughout the
          programme.
        </p>

        <Button
          id="journey-btn-referral-bottom"
          variant="outline"
          onClick={onOpenReferral}
          className={`${outlineButton} bg-white px-4 sm:px-8`}
        >
          Make a Referral
        </Button>
      </div>
    </section>
  );
};
