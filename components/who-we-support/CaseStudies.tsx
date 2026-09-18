import React, { useState } from 'react';
import { CASE_STUDIES } from '@/app/data/content';
import { CaseStudy } from '@/app/types';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Quote, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CaseStudiesProps {
  onOpenReferral: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenReferral }) => {
  const [activeCase, setActiveCase] = useState<CaseStudy>(CASE_STUDIES[0]);

  return (
    <section id="case-studies" className="scroll-mt-24 py-16 lg:py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
              STUDENT OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233]">
              Real Journeys of Educational Transformation
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Anonymised case studies demonstrating how personalized alternative pathways unlock genuine potential.
            </p>
          </div>

          <Button
            variant="coral"
            onClick={onOpenReferral}
            className="font-bold text-xs sm:text-sm self-start sm:self-auto"
          >
            Commission Similar Support
          </Button>
        </div>

        {/* Case Study selector tabs */}
        <div className="flex flex-wrap gap-3 border-b border-neutral-200 pb-4">
          {CASE_STUDIES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveCase(cs)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCase.id === cs.id
                  ? 'bg-[#092233] text-white shadow-md'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <span>{cs.title}</span>
              <Badge variant={activeCase.id === cs.id ? 'lime' : 'outline'} className="text-[10px] py-0">
                {cs.ageGroup}
              </Badge>
            </button>
          ))}
        </div>

        {/* Active Case Study Detail Card */}
        <Card className="p-8 sm:p-10 border-neutral-200 bg-white shadow-lg space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Background & Outcomes */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="coral" className="text-xs font-bold">
                    Primary Need: {activeCase.primaryNeed}
                  </Badge>
                  <span className="text-xs text-neutral-500 font-semibold">
                    {activeCase.duration}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#092233]">
                  {activeCase.title}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Initial Referral Circumstances:
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {activeCase.background}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Tailored Muve Futures Intervention:
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {activeCase.intervention}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Outcome Achieved:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {activeCase.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quote callout */}
            <div className="lg:col-span-4 bg-[#092233] text-white p-6 sm:p-8 rounded-3xl space-y-4 relative overflow-hidden">
              <Quote className="w-10 h-10 text-[#8cc63f] opacity-40" />
              <p className="text-sm sm:text-base text-white/95 italic font-medium leading-relaxed">
                “{activeCase.quote}”
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-[#8cc63f] font-bold">
                {activeCase.quoteAuthor}
              </div>
            </div>

          </div>
        </Card>
      </div>
    </section>
  );
};
