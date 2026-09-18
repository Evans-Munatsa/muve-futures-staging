import React from 'react';
import { WhiteTriangle, PinkPolygon, CyanCircle } from '@/components/common/GeometricShapes';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-[#092233] pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden text-white">
      <div className="absolute top-6 right-10 z-10">
        <PinkPolygon size={68} rotation={20} />
      </div>
      <div className="absolute bottom-6 left-8 z-10">
        <WhiteTriangle size={36} rotation={-35} />
      </div>
      <div className="absolute -bottom-12 -right-12 z-0">
        <CyanCircle size={140} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
            COMMISSIONING & GENERAL ENQUIRIES
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
            Connect With Our Specialist Commissioning Team
          </h1>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-neutral-300 leading-relaxed">
            Whether you are ready to make a referral, require an introductory consultation, or wish to explore bespoke multi-academy trust partnerships, we are here to support you.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-[#8cc63f] text-xs font-bold uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Direct Phone</span>
            </div>
            <p className="text-base font-bold text-white">0121 790 0450</p>
            <p className="text-[11px] text-neutral-400">Mon - Fri: 8:00am - 5:00pm</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-[#8cc63f] text-xs font-bold uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Commissioning Inbox</span>
            </div>
            <p className="text-sm font-bold text-white truncate">referrals@muvefutures.co.uk</p>
            <p className="text-[11px] text-neutral-400">24-hour response pledge</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-[#8cc63f] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Head Office</span>
            </div>
            <p className="text-sm font-bold text-white">Birmingham B1 1BB</p>
            <p className="text-[11px] text-neutral-400">West Midlands Coverage</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-[#f05a28] text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Safeguarding Duty</span>
            </div>
            <p className="text-sm font-bold text-white">dsl@muvefutures.co.uk</p>
            <p className="text-[11px] text-neutral-400">Urgent welfare escalations</p>
          </div>
        </div>
      </div>
    </section>
  );
};
