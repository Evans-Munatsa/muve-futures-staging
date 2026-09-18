import React from 'react';
import { ServiceItem } from '@/app/types';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Check, ArrowRight, Clock, Users, BookOpen } from 'lucide-react';

interface ServiceDirectoryProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onMakeReferral: (serviceName: string) => void;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({
  services,
  onSelectService,
  onMakeReferral,
}) => {
  return (
    <section id="service-directory" className="scroll-mt-24 py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              CURRENT PROVISIONS
            </span>
            <h2 className="text-3xl font-extrabold text-[#092233] mt-1">
              Available Alternative Education Pathways
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            Showing {services.length} specialist provision pathways
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Card
              key={svc.id}
              className="p-6 flex flex-col justify-between border-neutral-200 hover:border-[#8cc63f] hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="lime" className="text-xs font-bold py-0.5">
                    {svc.category || 'Specialist AP'}
                  </Badge>
                  {svc.ageRange && (
                    <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                      Ages {svc.ageRange}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#092233] leading-snug">
                    {svc.name}
                  </h3>
                  <p className="text-xs text-[#092233]/70 font-semibold mt-0.5">
                    Delivery: {svc.deliveryMode || 'Hybrid / In-Person'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {svc.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Key Features:
                  </p>
                  <ul className="space-y-1.5">
                    {svc.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-[#8cc63f] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-neutral-100 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectService(svc)}
                  className="flex-1 text-xs font-bold"
                >
                  View Details
                </Button>
                <Button
                  variant="coral"
                  size="sm"
                  onClick={() => onMakeReferral(svc.name)}
                  className="text-xs font-bold gap-1 px-3"
                >
                  <span>Refer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
