import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Car, Train, ShieldCheck } from 'lucide-react';

export const LocationsMap: React.FC = () => {
  const coverageAreas = [
    'Birmingham City Council Area',
    'Solihull Metropolitan Borough',
    'Sandwell & Dudley',
    'Wolverhampton & Walsall',
    'Coventry & Warwickshire',
    'Worcestershire & Surrounding',
  ];

  return (
    <section id="locations-map" className="scroll-mt-24 py-16 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
            SERVICE COVERAGE & HUBS
          </span>
          <h2 className="text-3xl font-extrabold text-[#092233]">
            Serving Schools & Authorities Across the West Midlands
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Our outreach tutors, specialist mentors, and learning centres operate across the greater Midlands region with accessible transport links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Coverage info */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="p-6 sm:p-8 border-neutral-200 bg-white space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#092233] text-[#8cc63f] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#092233]">Headquarters & Training Hub</h3>
                  <p className="text-xs text-neutral-500">120 Colmore Row, Birmingham, B3 3BD</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Core Local Authority Coverage:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {coverageAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      <Navigation className="w-3.5 h-3.5 text-[#8cc63f] shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-1">
                <p className="font-bold">Home & Community Outreach:</p>
                <p>
                  Our mobile qualified teachers travel directly to learners’ homes, local libraries, or designated safe community centres within a 45-minute travel radius.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Map Visual Simulation Card */}
          <div className="lg:col-span-6">
            <Card className="p-0 overflow-hidden h-full border-neutral-200 bg-[#092233] text-white flex flex-col justify-between relative">
              <div className="p-8 space-y-4 relative z-10">
                <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
                  REGIONAL MAP
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  West Midlands Alternative Education Network
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Strategically positioned hubs ensure swift response times for urgent pupil intakes and multi-disciplinary safeguarding reviews.
                </p>
              </div>

              {/* Graphical stylized region grid */}
              <div className="p-8 pt-0 relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-center">
                  <p className="text-lg font-black text-[#8cc63f]">35 min</p>
                  <p className="text-[11px] text-neutral-300">Avg. Tutor Travel Time</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-center">
                  <p className="text-lg font-black text-white">100%</p>
                  <p className="text-[11px] text-neutral-300">DBS Enhanced Staff</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-center col-span-2 sm:col-span-1">
                  <p className="text-lg font-black text-[#f05a28]">24h</p>
                  <p className="text-[11px] text-neutral-300">Referral Response</p>
                </div>
              </div>

              {/* Decorative subtle map lines background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#8cc63f_1px,transparent_1px)] [background-size:16px_16px]" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
