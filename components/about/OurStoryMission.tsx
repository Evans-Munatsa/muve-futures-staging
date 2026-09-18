import React from 'react';
import { Target, Compass, Sparkles, Heart } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

export const OurStoryMission: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'We listen without prejudice. Every behaviour is communication, and every young person deserves unconditional positive regard.',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: Target,
      title: 'Targeted Growth',
      description: 'Progress is measured holistically—celebrating social, emotional, attendance, and academic milestones in equal measure.',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      icon: Compass,
      title: 'Relational Safety',
      description: 'Learners thrive when they feel secure. We build high-trust relationships that empower young people to take risks in their learning.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: Sparkles,
      title: 'Positive Futures',
      description: 'Every placement focuses on the horizon: successfully stepping down to mainstream, specialist school, college, or apprenticeship.',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              OUR FOUNDING STORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233] leading-tight">
              Bridging The Gap Between School Exclusion And Educational Fulfillment
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Mainstream education serves many children well, but for young people navigating neurodivergence, acute anxiety, sensory overload, or adverse childhood experiences, standard classroom settings can become environments of chronic distress.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed">
              Muve Futures was established by senior education leaders, designated safeguarding leads, and educational psychologists to provide a radically supportive alternative: educational settings that adapt to the child, rather than forcing the child into an unyielding template.
            </p>
            <div className="p-4 bg-neutral-50 rounded-2xl border-l-4 border-[#8cc63f] text-neutral-800 text-sm italic font-medium">
              “When we change the learning environment to match the young person’s nervous system, learning ceases to be a battle and becomes a doorway to self-belief.”
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                alt="Teacher mentoring and supporting student in dedicated positive educational environment"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Impact overlay badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#092233] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/10 hidden sm:block">
              <p className="text-2xl font-black text-[#8cc63f]">94%</p>
              <p className="text-xs font-semibold text-neutral-200 mt-0.5">
                of referred learners successfully re-engage in formal education within 6 months.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="pt-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
              OUR GUIDING PILLARS
            </span>
            <h3 className="text-3xl font-extrabold text-[#092233]">
              Values That Guide Every Lesson & Intervention
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Card key={idx} className="p-6 space-y-4 hover:shadow-lg transition-all border-neutral-200">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#092233]">{val.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {val.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
