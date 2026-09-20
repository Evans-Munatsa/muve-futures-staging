import React from 'react';
import { SERVICES_DATA } from '@/data/content';
import { ServiceItem } from '@/app/types';

interface ServicesCircleProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesCircle: React.FC<ServicesCircleProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative bg-[#A5CD39] py-20 lg:py-32 overflow-hidden">
      
      {/* Decorative Large White Semi-Circle on Left */}
      <div 
        className="absolute -left-28 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-white z-0 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Decorative Cyan Circle on Bottom-Right */}
      <div 
        className="absolute -right-20 -bottom-16 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#70bcf6] z-0 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        
        {/* The Signature Orange/Coral Circular Container */}
        <div className="relative w-full max-w-3xl aspect-square md:aspect-auto md:min-h-[720px] rounded-full bg-[#f05a28] p-8 sm:p-14 md:p-16 flex flex-col items-center justify-center text-center text-white">
          
          <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center">
            
            {/* Header */}
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white/90">
                OUR SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 leading-tight tracking-tight">
                Education That Adapts Around The Learner
              </h2>
            </div>

            {/* Sub-label */}
            <p className="text-base sm:text-lg font-semibold text-white/95">
              Our services include
            </p>

            {/* Service Pills Badges Grid */}
            <div className="w-full flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 max-w-xl py-2">
              {SERVICES_DATA.map((service) => (
                <button
                  key={service.id}
                  id={`btn-service-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-white text-white font-bold text-xs sm:text-sm tracking-wide bg-transparent hover:bg-white hover:text-[#f05a28] transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs focus:outline-hidden focus:ring-2 focus:ring-white"
                  title={`Click to explore ${service.name}`}
                >
                  {service.name}
                </button>
              ))}
            </div>

            {/* Bottom Tagline */}
            <p className="text-base sm:text-lg font-bold text-white tracking-tight pt-3">
              Every pathway is personalised around the learner.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
