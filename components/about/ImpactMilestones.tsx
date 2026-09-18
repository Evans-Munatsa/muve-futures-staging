import React from 'react';
import { Card } from '@/app/components/ui/card';

export const ImpactMilestones: React.FC = () => {
  const metrics = [
    { value: '450+', label: 'Learners Supported', note: 'Across KS1 to Post-16 pathways' },
    { value: '94%', label: 'Positive Destinations', note: 'Reintegrated or transitioned to college/work' },
    { value: '18+', label: 'Local Authorities', note: 'Commissioning ongoing specialist placements' },
    { value: '88%', label: 'Attendance Recovery', note: 'Average attendance increase after 12 weeks' },
  ];

  return (
    <section className="py-16 bg-[#f05a28] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-white/80">
            MEASURABLE IMPACT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Transforming Outcomes Through Consistency
          </h2>
          <p className="text-sm sm:text-base text-white/90">
            Our student tracking framework monitors wellbeing, academic re-engagement, and destination stability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <Card key={idx} className="bg-white/10 backdrop-blur-xs border-white/20 p-6 text-center text-white">
              <p className="text-4xl sm:text-5xl font-black text-white">{m.value}</p>
              <p className="text-base font-bold mt-2 text-white">{m.label}</p>
              <p className="text-xs text-white/80 mt-1">{m.note}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
