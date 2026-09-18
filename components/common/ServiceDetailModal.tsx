import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/app/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onMakeReferral: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onMakeReferral,
}) => {
  if (!service) return null;

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden max-w-lg">
        {/* Header */}
        <div className="bg-[#f05a28] text-white p-6 sm:p-7 relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-white/80">
              Specialist Provision
            </span>
            {service.category && (
              <Badge variant="white" className="text-[10px] px-2 py-0.5 text-[#092233]">
                {service.category}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-2xl font-extrabold text-white">
            {service.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-white/90 mt-1">
            {service.ageRange ? `Target Age: ${service.ageRange}` : 'Alternative Provision Pathway'} • {service.deliveryMode || 'Hybrid'}
          </DialogDescription>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-neutral-700 text-sm leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Key Programme Elements:
            </h4>
            <ul className="space-y-2.5">
              {service.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#092233]">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs font-bold text-neutral-500"
            >
              Back to Services
            </Button>

            <Button
              id="service-modal-refer-btn"
              variant="default"
              size="sm"
              onClick={() => {
                onClose();
                onMakeReferral(service.name);
              }}
              className="gap-2 font-bold"
            >
              <span>Refer for {service.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
