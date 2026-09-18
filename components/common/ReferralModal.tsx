import React, { useState } from 'react';
import { CheckCircle, Send, AlertCircle } from 'lucide-react';
import { ReferralFormData } from '@/app/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<ReferralFormData>({
    referrerType: 'School / Academy',
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    organisationName: '',
    learnerAgeGroup: '11-14 (KS3)',
    primaryNeeds: preselectedService ? [preselectedService] : ['SEND Support'],
    currentSetting: '',
    hasEhcp: true,
    fundingSource: 'Section 19 / Local Authority',
    urgency: 'Planned Intake',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleNeed = (need: string) => {
    setFormData((prev) => {
      const exists = prev.primaryNeeds.includes(need);
      return {
        ...prev,
        primaryNeeds: exists
          ? prev.primaryNeeds.filter((n) => n !== need)
          : [...prev.primaryNeeds, need],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.referrerName || !formData.referrerEmail || !formData.organisationName) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');
    const randomRef = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(randomRef);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  const allNeeds = [
    'EOTAS',
    'SEND Support',
    'SEMH Support',
    'EBSNA Support',
    'Medical Needs',
    'Disrupted Education',
    'Risk of Exclusion',
    '52 Week Provision',
    'One-to-One Education',
    'Hybrid Learning',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#8cc63f] text-white p-6 sm:p-7 relative shrink-0">
          <span className="text-xs font-black uppercase tracking-widest text-white/90">
            Muve Futures Referral
          </span>
          <DialogTitle className="text-2xl font-extrabold text-white mt-1">
            Make a Learner Referral
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-white/90 mt-1">
            We collaborate with schools, local authorities, and commissioners to build individual education pathways.
          </DialogDescription>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedRef ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#092233]">Referral Received</h3>
                <p className="text-neutral-600 max-w-md mx-auto text-sm">
                  Thank you, <strong className="text-[#092233]">{formData.referrerName}</strong>. Your referral has been logged with reference number:
                </p>
                <div className="inline-block bg-neutral-100 border border-neutral-300 font-mono text-lg font-bold px-5 py-2 rounded-xl text-[#092233]">
                  {submittedRef}
                </div>
              </div>

              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                A member of our commissioning & assessment team will contact you within 24 hours to review the young person’s needs and arrange an initial conversation.
              </p>

              <div className="pt-4">
                <Button
                  id="referral-done-btn"
                  variant="default"
                  onClick={handleReset}
                  className="font-bold text-sm px-8"
                >
                  Return to Website
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm text-[#092233]">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Referrer Category */}
              <div>
                <Label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2">
                  I am referring as:
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Local Authority', 'School / Academy', 'Parent / Carer', 'Social Worker / Healthcare', 'Other'] as const).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, referrerType: type })}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition cursor-pointer ${
                        formData.referrerType === type
                          ? 'bg-[#092233] text-white border-[#092233]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ref-name">Your Name *</Label>
                  <Input
                    id="ref-name"
                    type="text"
                    required
                    value={formData.referrerName}
                    onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ref-org">School / Organisation *</Label>
                  <Input
                    id="ref-org"
                    type="text"
                    required
                    value={formData.organisationName}
                    onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                    placeholder="e.g. Birmingham City Council"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ref-email">Email Address *</Label>
                  <Input
                    id="ref-email"
                    type="email"
                    required
                    value={formData.referrerEmail}
                    onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                    placeholder="name@organisation.org.uk"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ref-phone">Phone Number</Label>
                  <Input
                    id="ref-phone"
                    type="tel"
                    value={formData.referrerPhone}
                    onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                    placeholder="07123 456789"
                  />
                </div>
              </div>

              {/* Learner Age Group */}
              <div>
                <Label className="block text-xs text-neutral-600 mb-1.5">
                  Learner Age / Key Stage:
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(['4-7 (KS1)', '8-11 (KS2)', '11-14 (KS3)', '14-16 (KS4)', '16-19 (Post-16)', '19-25 (Young Adult)'] as const).map((age) => (
                    <button
                      type="button"
                      key={age}
                      onClick={() => setFormData({ ...formData, learnerAgeGroup: age })}
                      className={`px-2 py-1.5 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                        formData.learnerAgeGroup === age
                          ? 'bg-[#f05a28] text-white border-[#f05a28]'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* Identified Needs (Multi-select) */}
              <div>
                <Label className="block text-xs text-neutral-600 mb-1.5">
                  Identified Needs & Barriers (select all applicable):
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {allNeeds.map((need) => {
                    const isSelected = formData.primaryNeeds.includes(need);
                    return (
                      <button
                        type="button"
                        key={need}
                        onClick={() => toggleNeed(need)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#8cc63f] text-white border-[#8cc63f]'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{need}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="ref-notes">Brief Overview of Learner Circumstances & Goals</Label>
                <Textarea
                  id="ref-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details regarding current attendance, sensory preferences, EHCP status, or desired outcomes..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-neutral-500">
                  🔒 Data processed securely in accordance with UK GDPR.
                </p>
                <Button
                  id="submit-referral-btn"
                  type="submit"
                  variant="coral"
                  size="lg"
                  className="gap-2 font-bold w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  Submit Referral
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
