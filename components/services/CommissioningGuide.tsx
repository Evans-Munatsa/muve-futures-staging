import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ArrowRight, CheckCircle2, FileText, PhoneCall, UserCheck, Award } from 'lucide-react';

interface CommissioningGuideProps {
  onOpenReferral: () => void;
  onBookIntro: () => void;
}

export const CommissioningGuide: React.FC<CommissioningGuideProps> = ({
  onOpenReferral,
  onBookIntro,
}) => {
  const steps = [
    {
      step: '01',
      icon: PhoneCall,
      title: 'Initial Consultation',
      desc: 'Discuss pupil history, EHCP requirements, attendance barriers, and desired reintegration timeframe.',
    },
    {
      step: '02',
      icon: FileText,
      title: 'Assessment & Proposal',
      desc: 'We review reports, design a tailored baseline timetable, and submit a transparent costed commissioning schedule.',
    },
    {
      step: '03',
      icon: UserCheck,
      title: 'Low-Demand Induction',
      desc: 'Home or neutral setting meet-and-greet with designated key mentor. Focus on rapport building and sensory safety.',
    },
    {
      step: '04',
      icon: Award,
      title: 'Weekly Reporting & Review',
      desc: 'Continuous attendance sync, weekly progress summaries, and 6-week multi-agency review meetings.',
    },
  ];

  return (
    <section id="commissioning-guide" className="scroll-mt-24 py-16 lg:py-24 bg-[#092233] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
              LOCAL AUTHORITY & SCHOOL COMMISSIONERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Commissioning With Confidence
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Clear pathways, prompt turnaround times, and seamless multi-agency integration under Section 19 and SEND codes.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="coral"
              size="default"
              onClick={onOpenReferral}
              className="font-bold text-xs sm:text-sm"
            >
              Start Referral
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={onBookIntro}
              className="font-bold text-xs sm:text-sm border-white text-white hover:bg-white hover:text-[#092233]"
            >
              Book Intro Call
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <Card key={i} className="bg-white/5 border-white/10 p-6 space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#8cc63f]/20 text-[#8cc63f] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-white/20">{st.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{st.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {st.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
