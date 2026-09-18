import React, { useState } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Home,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PageId } from '@/app/types';
import { SITE_CONFIG } from '@/app/constants';

interface ServerErrorProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenReferral?: () => void;
}

export const ServerError: React.FC<ServerErrorProps> = ({
  onNavigate,
  onOpenReferral,
}) => {
  const [reloading, setReloading] = useState(false);

  const handleReload = () => {
    setReloading(true);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] pt-32 pb-24 text-[#092233] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Warning Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-black uppercase tracking-wider text-amber-700 mb-4">
            Status 500 • Temporary Service Interruption
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-[#092233] tracking-tight mb-4">
            We&apos;re Working to Resolve This
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed mb-8">
            An unexpected error occurred while loading this section. Our technical team has been
            notified and is actively restoring service. Scheduled learner sessions and our phone
            lines are completely unaffected.
          </p>

          {/* Safeguarding & Duty Guarantee Card */}
          <div className="bg-[#f8f7f5] rounded-2xl p-4 sm:p-6 border border-neutral-200 text-left max-w-xl mx-auto mb-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#8cc63f] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#092233] mb-1">
                  Urgent Safeguarding &amp; Placement Support
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  If you have an urgent safeguarding concern or need to confirm student arrival,
                  our central duty operations desk remains live:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#092233] hover:text-[#8cc63f]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#f05a28]" />
                    <span>{SITE_CONFIG.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#092233] hover:text-[#8cc63f]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8cc63f]" />
                    <span>{SITE_CONFIG.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              id="btn-500-reload"
              onClick={handleReload}
              disabled={reloading}
              className="bg-[#092233] text-white hover:bg-[#133c57] rounded-xl px-6 py-2.5 text-xs font-bold flex items-center gap-2"
            >
              <RotateCcw className={`w-4 h-4 ${reloading ? 'animate-spin' : ''}`} />
              <span>{reloading ? 'Reloading...' : 'Try Again / Refresh'}</span>
            </Button>

            <Button
              id="btn-500-home"
              onClick={() => onNavigate('home')}
              className="bg-neutral-100 text-[#092233] hover:bg-neutral-200 rounded-xl px-6 py-2.5 text-xs font-bold flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-neutral-600" />
              <span>Return to Home</span>
            </Button>

            {onOpenReferral && (
              <Button
                id="btn-500-referral"
                onClick={onOpenReferral}
                className="bg-[#8cc63f] text-[#092233] hover:bg-[#76aa33] rounded-xl px-6 py-2.5 text-xs font-black"
              >
                Open Referral Form
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
