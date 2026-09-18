import React from 'react';
import { Button } from '@/components/ui/button';

interface ResourcesAndCallToActionProps {
  onVisitResources: () => void;
  onOpenReferral: () => void;
}

export const ResourcesAndCallToAction: React.FC<ResourcesAndCallToActionProps> = ({
  onVisitResources,
  onOpenReferral,
}) => {
  return (
    <div className="w-full">
      {/* Resources For Schools, Families and Professionals */}
      <section id="resources-preview" className="relative pt-14 pb-40 overflow-hidden text-white">
        {/* Background image */}
        <img
          src="/books.svg"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/hero-boy.jpg') {
              target.src = '/hero-boy.jpg';
            }
          }}
          alt="Cute smiling boy with Down syndrome playing with crayons and drawing happily at his art table"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="eager"
        />


        {/* Content, layered above the image */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
              Resources For Schools, Families and Professionals
            </h2>

            <div className="shrink-0">
              <Button
                id="btn-visit-resources"
                variant="outline"
                size="lg"
                onClick={onVisitResources}
                className="font-bold text-sm sm:text-base border-white hover:bg-white hover:text-[#e27a32]"
              >
                Visit Our Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action: Every Young Person Deserves The Opportunity To Move Forward */}
      <section className="bg-[#F05B25] py-16 lg:py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Stack of books with a shiny red apple on top */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full overflow-hidden  aspect-[4/4]">
                <img
                  src="/applebook.svg"
                  alt="Stack of educational books with a shiny red apple on top"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Heading, description, Make a Referral button */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Every Young Person Deserves The Opportunity To Move Forward
              </h2>

              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Whether you’re ready to make a referral or simply want to discuss a learner’s needs, our team is here to help you find the right education pathway.
              </p>

              <div className="pt-2">
                <Button
                  id="cta-btn-referral-bottom"
                  variant="outline"
                  size="lg"
                  onClick={onOpenReferral}
                  className="font-bold text-base px-8 border-white hover:bg-white hover:text-[#f05a28] shadow-md"
                >
                  Make a Referral
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
