import React from 'react';
import { User, Users, Laptop, Wrench } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

export const DeliveryModels: React.FC = () => {
  const models = [
    {
      icon: User,
      title: '1:1 Targeted Tuition',
      description: 'Intensive bespoke education with a dedicated qualified teacher or high-level mentor, ideal for severe EBSNA or transition phases.',
      ratio: '1:1 Staff-to-Learner',
      environment: 'Home, library, or outreach hub',
    },
    {
      icon: Users,
      title: 'Small Group Cohorts',
      description: 'Nurture groups capped at 4 learners to rebuild social stamina, collaborative dialogue, and peer emotional regulation safely.',
      ratio: '1:3 to 1:4 Ratio',
      environment: 'Specialist AP Learning Centres',
    },
    {
      icon: Laptop,
      title: 'Hybrid / Virtual Learning',
      description: 'Live interactive virtual lessons paired with weekly in-person pastoral check-ins for medically unwell or geographically isolated learners.',
      ratio: 'Flexible hybrid scheduling',
      environment: 'Virtual classroom & home visit',
    },
    {
      icon: Wrench,
      title: 'Applied Vocational Pathways',
      description: 'Practical experiential learning in carpentry, catering, sports coaching, IT, and horticulture tied to accredited Level 1/2 qualifications.',
      ratio: 'Industry mentor led',
      environment: 'Workshops & community partner sites',
    },
  ];

  return (
    <section id="delivery-models" className="scroll-mt-24 py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
            HOW WE DELIVER
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233]">
            Flexible Delivery Formats
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Because a standard classroom does not fit every learner, we structure education to match their physical, sensory, and medical reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, idx) => {
            const Icon = model.icon;
            return (
              <Card key={idx} className="p-6 space-y-4 border-neutral-200 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#092233] text-[#8cc63f] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#092233]">{model.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 text-xs space-y-1">
                  <p className="font-bold text-[#092233]">{model.ratio}</p>
                  <p className="text-neutral-500">{model.environment}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
