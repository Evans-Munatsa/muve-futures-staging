import React from 'react';
import { CyanCircle, PinkPolygon, WhiteTriangle } from '@/components/common/GeometricShapes';
import { Button } from '@/components/ui/button';

interface PartnershipsAndReferralProps {
  onBookIntro: () => void;
  onOpenReferral: () => void;
}

export const PartnershipsAndReferral: React.FC<PartnershipsAndReferralProps> = ({
  onBookIntro,
  onOpenReferral,
}) => {
  const spiralRings = Array.from({ length: 18 });

  return (
    <section id="partnerships" className="relative bg-[#8cc63f] pt-0 pb-20 lg:pt-0 lg:pb-28 overflow-hidden">
      
      {/* Background Floating Shapes */}
      {/* <div className="absolute -left-12 bottom-1/3 z-0">
        <CyanCircle size={180} />
      </div>
      <div className="absolute right-6 lg:right-24 bottom-24 z-0">
        <PinkPolygon size={74} rotation={22} />
      </div>
      <div className="absolute left-6 lg:left-16 bottom-12 z-0">
        <WhiteTriangle size={42} rotation={-45} />
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10  lg:space-y-24">
        
        {/* Spiral Notebook Component */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl">
            
            {/* The Notebook Page Card */}
            <div className="relative pl-12 sm:pl-16 pr-6 sm:pr-12 py-10 sm:py-14  ">
              
              {/* Background Image (book.svg) */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-200">
                <img 
                  src="/notebook.svg" 
                  alt="" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              

              {/* Notebook Paper Content */}
              {/* Added 'relative z-10' to make sure content always sits neatly on top of the background image */}
              <div className="relative z-10 space-y-6 text-center">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#092233]">
                  PARTNERSHIPS
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092233] leading-tight tracking-tight">
                  Working Together Around Every Learner
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal max-w-lg mx-auto">
                  Positive outcomes are achieved through collaboration. We work closely with schools, Local Authorities, commissioners, families and professionals to create joined-up education pathways that place the learner at the centre of every decision.
                </p>

                <div className="pt-2">
                  <Button
                    id="btn-book-intro"
                    variant="navy"
                    size="lg"
                    onClick={onBookIntro}
                    className="font-bold text-sm sm:text-base shadow-xs"
                  >
                    Book an Intro Call
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Section: A Simple Referral Journey */}
        <div id="referral" className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white">
            REFERRAL
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A Simple Referral Journey
          </h2>

          <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
            Making a referral is straightforward. We begin with a conversation, understand the learner’s needs and desired outcomes, recommend the most appropriate pathway and provide regular communication throughout the programme.
          </p>

          <div className="pt-2">
            <Button
              id="journey-btn-referral-bottom"
              variant="outline"
              size="lg"
              onClick={onOpenReferral}
              className="text-base font-bold shadow-xs px-8"
            >
              Make a Referral
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
