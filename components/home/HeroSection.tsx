'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onOpenReferral: () => void;
  onLearnMore: () => void;
}

const GREEN = '#A5CD39';
const PINK = '#E986B6';
const ORANGE = '#F05A28';
const CYAN = '#9ADAE6';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReferral,
  onLearnMore,
}) => {
  const [imgSrc, setImgSrc] = useState('/background.svg');

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: GREEN }}
    >
      {/* Hero canvas: same proportions as the design (652 x 391) */}
      <div className="relative w-full aspect-[652/391] min-h-[420px]">
        {/* Layer 0: shapes that sit BEHIND the photo */}
        <svg
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
          viewBox="0 0 652 391"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* big pink circle, top-left, mostly hidden behind the boy */}
          <circle cx="0" cy="100" r="105" fill={PINK} />
        </svg>

        {/* Layer 1: photo, anchored bottom-left */}
        <Image
          src={imgSrc}
          onError={() => setImgSrc('/hero-boy.jpg')}
          alt="Smiling boy with Down syndrome leaning on an art table, drawing with crayons"
          fill
          priority
          sizes="100vw"
          className="z-10 object-cover object-left-bottom pointer-events-none"
        />

        {/* Layer 2: shapes that sit ON TOP of the photo */}
        <svg
          className="absolute inset-0 z-20 h-full w-full pointer-events-none"
          viewBox="0 0 652 391"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* pink shape, top-right */}
          <polygon points="583,0 652,0 652,30 606,78" fill={PINK} />

          {/* white triangle, left (points left) */}
          <polygon points="24,183 55,167 55,205" fill="#fff" />

          {/* white triangle, right (points right) */}
          <polygon points="571,162 571,192 604,177" fill="#fff" />

          {/* orange triangle, bottom-centre-right */}
          <polygon points="516,314 541,290 548,316" fill={ORANGE} />

          {/* cyan circle, bottom-right */}
          <circle cx="603" cy="371" r="85" fill={CYAN} />
        </svg>

        {/* Text column: centred in the space to the right of the boy */}
        <div className="absolute z-30 top-[5%] left-[34%] w-[62%] sm:w-[55%] flex flex-col items-center text-center text-white">
          <h1 className="text-[clamp(1.5rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.15]">
            Education That Starts With Understanding
          </h1>

          <p className="mt-[3.5%] max-w-[85%] text-[clamp(0.65rem,1.2vw,1.25rem)] font-medium leading-relaxed">
            Personalised Alternative Provision for young people aged 4–25 with SEND,
            SEMH, EBSNA or other barriers to learning. We create flexible programmes
            that rebuild confidence, reconnect learners with education and prepare
            them for what comes next.
          </p>

          <div className="mt-[4%] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              id="hero-btn-learn-more"
              variant="coral"
              size="lg"
              onClick={onLearnMore}
              className="rounded-full text-sm sm:text-base font-bold"
            >
              Learn More
            </Button>

            <Button
              id="hero-btn-referral"
              variant="outline"
              size="lg"
              onClick={onOpenReferral}
              className="rounded-full border-2 border-white bg-transparent text-sm sm:text-base font-bold text-white hover:bg-white/10 hover:text-white"
            >
              Make a Referral
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
