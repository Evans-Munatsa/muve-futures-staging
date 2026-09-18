import React from 'react';
import { ShieldCheck, FileCheck, Users2, Lock, AlertTriangle, Eye } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export const SafeguardingQuality: React.FC = () => {
  const safeguards = [
    {
      icon: ShieldCheck,
      title: 'Keeping Children Safe in Education (KCSIE 2025)',
      description: 'Full statutory compliance with annual multi-agency staff training, enhanced DBS checks, and strict safer recruitment protocols.',
    },
    {
      icon: Users2,
      title: 'Designated Safeguarding Lead (DSL) Oversight',
      description: 'Every educational hub and remote session is directly overseen by a Level 4 qualified DSL with immediate local authority reporting bridges.',
    },
    {
      icon: Eye,
      title: 'Real-Time Attendance & Welfare Monitoring',
      description: 'Morning and afternoon session logs are communicated directly to referring schools and local authorities with same-day attendance auditing.',
    },
    {
      icon: Lock,
      title: 'Trauma-Informed Risk Assessments',
      description: 'Dynamic risk assessments updated in collaboration with CAMHS, SENCOs, and family social care to safeguard against escalation.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <Badge variant="navy" className="text-xs uppercase tracking-widest font-extrabold">
            SAFEGUARDING & GOVERNANCE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233] leading-tight">
            Rigorous Safeguarding at Every Layer
          </h2>
          <p className="text-base text-neutral-600">
            For commissioners and parents, trust is paramount. We maintain uncompromising safeguarding frameworks designed specifically for complex learners and off-site provisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safeguards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 space-y-3 border-neutral-200 hover:border-[#8cc63f] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8cc63f]/20 text-[#609b19] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#092233]">{item.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed pl-13">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Safeguarding notice banner */}
        <div className="bg-[#092233] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-lg text-white">Need our statutory policies or safeguarding handbook?</h4>
            <p className="text-xs sm:text-sm text-neutral-300">
              Download our KCSIE 2025 policy, Whistleblowing policy, and SEND code of practice statement.
            </p>
          </div>
          <a
            href="/resources"
            className="px-6 py-2.5 rounded-full bg-[#8cc63f] hover:bg-[#7db536] text-white font-bold text-xs sm:text-sm whitespace-nowrap transition"
          >
            Access Policy Library
          </a>
        </div>
      </div>
    </section>
  );
};
