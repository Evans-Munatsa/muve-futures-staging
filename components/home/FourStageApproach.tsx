import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FRAMEWORK_STAGES } from '@/data/content';
import { FrameworkStage } from '@/types';
import { Button } from '@/components/ui/button';

interface FourStageApproachProps {
  onDiscoverMore: (stage: FrameworkStage) => void;
}

export const FourStageApproach: React.FC<FourStageApproachProps> = ({ onDiscoverMore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeStage = FRAMEWORK_STAGES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? FRAMEWORK_STAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === FRAMEWORK_STAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="framework" className="bg-[#8cc63f] pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* The White Card Container */}
        <div className="bg-white rounded-tr-4xl p-6 sm:p-10 lg:p-12 shadow-xl border border-black/5">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#f05a28]">
                OUR FRAMEWORK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#092233] tracking-tight">
                The Four Stage Approach
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-medium">
                Every programme follows a structured pedagogical approach
              </p>
            </div>

            <div>
              <Button
                id="btn-discover-approach"
                variant="navy"
                size="lg"
                onClick={() => onDiscoverMore(activeStage)}
                className="font-bold"
              >
                Discover Our Approach
              </Button>
            </div>
          </div>

          {/* Interactive Stage Slider Bar */}
          <div className="relative bg-[#d8ec92] rounded-full p-2 sm:p-3 flex items-center justify-between shadow-xs ring-1 ring-[#8cc63f]/30">
            
            {/* Left Prev Arrow Button */}
            <button
              id="stage-slider-prev"
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f05a28] hover:bg-[#d94e20] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              aria-label="Previous Stage"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Central Stage Text */}
            <div className="px-4 sm:px-8 text-center flex-1">
              <p className="text-[#092233] font-bold text-sm sm:text-lg lg:text-xl tracking-tight transition-all duration-300">
                {activeStage.headline}
              </p>
            </div>

            {/* Right Next Arrow Button */}
            <button
              id="stage-slider-next"
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f05a28] hover:bg-[#d94e20] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              aria-label="Next Stage"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Step Indicator Chips */}
          {/* <div className="mt-6 flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            {FRAMEWORK_STAGES.map((stg, i) => (
              <button
                key={stg.step}
                onClick={() => setCurrentIdx(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  i === currentIdx
                    ? 'bg-[#092233] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Stage {stg.step}: {stg.title}
              </button>
            ))}
          </div> */}

        </div>
      </div>

      {/* Children Collaborative Learning Photo Banner */}
      <div className="w-full overflow-visible aspect-[16/8] sm:aspect-[21/9] relative">
        <img
          src="/three-young-girls.svg"
          alt="Three young children joyfully engaged in collaborative learning around a classroom table"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    </section>
  );
};
