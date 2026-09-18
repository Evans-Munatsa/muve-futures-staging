import React from 'react';
import { Button } from '@/components/ui/button';

interface JourneyAndWhoWeSupportProps {
  onOpenReferral: () => void;
  onExploreServices: () => void;
}

export const JourneyAndWhoWeSupport: React.FC<JourneyAndWhoWeSupportProps> = ({
  onOpenReferral,
  onExploreServices,
}) => {
  return (
    <section id="who-we-support" className="bg-[#8cc63f] pt-16 pb-16 lg:pt-24 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
        
        {/* Section: Every Journey Starts Somewhere Different */}
        <div className="max-w-3xl text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Every Journey Starts Somewhere Different
          </h2>

          <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
            Every learner’s journey is unique. Some have lost confidence in education, some are struggling with attendance and others simply need learning to look different. We begin by understanding the learner before designing the education pathway, ensuring every programme is built around their strengths, aspirations and individual needs.
          </p>

          <div className="pt-2">
            <Button
              id="journey-btn-referral"
              variant="outline"
              size="lg"
              onClick={onOpenReferral}
              className="text-base font-bold shadow-xs"
            >
              Make a Referral
            </Button>
          </div>
        </div>

        {/* Section: WHO WE SUPPORT Card */}
        <div className="relative rounded-tl-3xl bg-[#70bcf6] overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6 text-[#092233]">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#092233]/85">
                  WHO WE SUPPORT
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092233] leading-tight tracking-tight">
                Supporting Learners With Diverse Needs
              </h3>

              <p className="text-base sm:text-lg text-[#092233]/90 leading-relaxed font-medium">
                We support children and young people experiencing SEND, SEMH, Emotionally Based School Non-Attendance (EBSNA), medical needs, disrupted education, risk of exclusion and transition between educational settings.
              </p>

              <div className="pt-2">
                <Button
                  id="who-we-support-btn-explore"
                  variant="navy"
                  size="lg"
                  onClick={onExploreServices}
                  className="font-bold text-sm sm:text-base"
                >
                  Explore Our Services
                </Button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 h-82 sm:h-106 lg:h-full min-h-[700px] absolute bottom-0 right-10">
              <img
                src="/raising-arms.svg"
                alt="Excited child smiling with arms raised celebrating educational achievement"
                className="w-full h-full object-cover object-top z-50"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
