import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Brain, HeartCrack, Stethoscope, AlertOctagon, UserX, Compass } from 'lucide-react';

export const NeedsMatrix: React.FC = () => {
  const needs = [
    {
      icon: Brain,
      title: 'Neurodiversity & SEND',
      badge: 'Autism, ADHD, Dyspraxia, Speech & Language',
      desc: 'Low-arousal classrooms, sensory profile matching, structured visual schedules, and specialized communication strategies.',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      icon: HeartCrack,
      title: 'SEMH & EBSNA',
      badge: 'Anxiety, School Avoidance, Trauma, Depression',
      desc: 'Gradual exposure, relational safety, low-demand environments, and emotion coaching to rebuild confidence.',
      color: 'bg-rose-50 text-rose-700',
    },
    {
      icon: Stethoscope,
      title: 'Medical Needs & Chronic Illness',
      badge: 'Section 19 Provision, Physical Health, Recovery',
      desc: 'Flexible pacing, hybrid live lessons, bedside tuition if necessary, and close liaison with hospital schooling teams.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: AlertOctagon,
      title: 'At Risk of Permanent Exclusion',
      badge: 'Disrupted Education, Challenging Behaviour',
      desc: 'Non-punitive de-escalation, conflict resolution mentoring, vocational hands-on projects, and root-cause behavioral assessment.',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      icon: UserX,
      title: 'EOTAS (Education Other Than At School)',
      badge: 'LA Commissioned Section F Provision',
      desc: 'Individualised full-curriculum or modular packages delivered in community centres, libraries, or bespoke 1:1 learning hubs.',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      icon: Compass,
      title: 'Post-16 Transition & NEET Risk',
      badge: 'Ages 16-25, Supported Internships, Life Skills',
      desc: 'Functional Skills English & Maths, CV crafting, workplace visits, and supported college transition bridging.',
      color: 'bg-cyan-50 text-cyan-700',
    },
  ];

  return (
    <section id="needs-matrix" className="scroll-mt-24 py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
            COMPREHENSIVE PROVISION CRITERIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233]">
            Understanding Needs & Tailoring Interventions
          </h2>
          <p className="text-base text-neutral-600">
            We work with young people across the entire spectrum of educational barriers, partnering closely with SENCOs, CAMHS, and families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {needs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 space-y-4 border-neutral-200 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#092233]">{item.title}</h3>
                  <Badge variant="outline" className="text-[11px] font-semibold text-neutral-600">
                    {item.badge}
                  </Badge>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
