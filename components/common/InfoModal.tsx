import React from 'react';
import { Check } from 'lucide-react';
import { FrameworkStage } from '@/app/types';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  content?: string;
  stageData?: FrameworkStage | null;
  onActionClick?: () => void;
  actionText?: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  content,
  stageData,
  onActionClick,
  actionText,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden max-w-lg">
        {/* Header */}
        <div className="bg-brand-ink text-white p-6 sm:p-7 relative">
          {subtitle && (
            <span className="text-xs font-black uppercase tracking-widest text-brand-green">
              {subtitle}
            </span>
          )}
          <DialogTitle className="text-2xl font-extrabold text-white mt-1">
            {title}
          </DialogTitle>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-neutral-700 text-sm leading-relaxed">
          {content && <p>{content}</p>}

          {stageData && (
            <div className="space-y-4">
              <p className="font-semibold text-brand-ink">{stageData.headline}</p>
              <p className="text-sm text-neutral-600">{stageData.description}</p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Key Practical Activities:
                </h4>
                <ul className="space-y-2">
                  {stageData.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-ink">
                      <span className="w-4 h-4 rounded-full bg-brand-green/20 text-[#609b19] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs font-bold text-neutral-500"
            >
              Close
            </Button>

            {onActionClick && actionText && (
              <Button
                variant="coral"
                size="sm"
                onClick={() => {
                  onClose();
                  onActionClick();
                }}
                className="font-bold"
              >
                {actionText}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
