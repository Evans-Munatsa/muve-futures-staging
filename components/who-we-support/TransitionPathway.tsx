import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ArrowRight, CornerDownRight, Footprints, ShieldAlert, Sparkles, GraduationCap } from 'lucide-react';

interface TransitionPathwayProps {
  onOpenReferral: () => void;
}

export const TransitionPathway: React.FC<TransitionPathwayProps> = ({ onOpenReferral }) => {
  const transitions = [
    {
      title: 'Mainstream School Reintegration',
      desc: 'Gradual phased timetable starting from 2 hours weekly in non-academic subjects with Muve mentor accompaniment.',
    },
    {
      title: 'Specialist Setting Placement',
      desc: 'Building up educational endurance and EHCP evidence to support successful admission into designated specialist schools.',
    },
    {
      title: 'Post-16 FE College & Apprenticeship',
      desc: 'Securing Functional Skills accreditations, college open day accompaniment, and enrolment advocacy.',
    },
    {
      title: 'Independent Adulthood & Vocational',
      desc: 'Life skills, community engagement, money management, and supported workplace training.',
    },
  ];

  return (
    <section id="transition-pathways" className="scroll-mt-24 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
            LOOKING AHEAD
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233]">
            Every Placement Has a Destination
          </h2>
          <p className="text-base text-neutral-600">
            Alternative Provision should be an intentional springboard, not a holding pen. From day one, we align with parents and commissioners on the long-term graduation pathway.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transitions.map((item, idx) => (
            <Card key={idx} className="p-6 border-neutral-200 bg-neutral-50/50 space-y-3">
              <span className="w-7 h-7 rounded-full bg-[#092233] text-white flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <h3 className="font-bold text-base text-[#092233]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-[#8cc63f] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-extrabold text-white">Have a learner who needs urgent support?</h3>
            <p className="text-sm text-white/90">
              Our commissioning team reviews referrals within 24 hours to arrange an assessment.
            </p>
          </div>
          <Button
            variant="coral"
            size="lg"
            onClick={onOpenReferral}
            className="font-bold text-sm whitespace-nowrap shadow-md"
          >
            Submit a Learner Referral
          </Button>
        </div>
      </div>
    </section>
  );
};
