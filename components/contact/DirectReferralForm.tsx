import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Send, AlertCircle, FileText, Info } from 'lucide-react';
import { ReferralFormData } from '@/app/types';

export const DirectReferralForm: React.FC = () => {
  const [formData, setFormData] = useState<ReferralFormData>({
    referrerType: 'School / Academy',
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    organisationName: '',
    learnerAgeGroup: '11-14 (KS3)',
    primaryNeeds: ['SEND Support', 'EBSNA Support'],
    currentSetting: '',
    hasEhcp: true,
    fundingSource: 'Section 19 / Local Authority',
    urgency: 'Planned Intake',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const allNeeds = [
    'EOTAS Provision',
    'SEND Support',
    'SEMH Support',
    'EBSNA (School Avoidance)',
    'Medical Needs / Hospital Transition',
    'Disrupted Education',
    'At Risk of Exclusion',
    '52-Week Supported Provision',
    'One-to-One Tuition',
    'Post-16 Vocational Training',
  ];

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
      setErrorMsg('Please complete all mandatory contact fields (*).');
      return;
    }
    setErrorMsg('');
    const randomRef = `MF-COMM-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(randomRef);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      referrerType: 'School / Academy',
      referrerName: '',
      referrerEmail: '',
      referrerPhone: '',
      organisationName: '',
      learnerAgeGroup: '11-14 (KS3)',
      primaryNeeds: ['SEND Support'],
      currentSetting: '',
      hasEhcp: true,
      fundingSource: 'Section 19 / Local Authority',
      urgency: 'Planned Intake',
      notes: '',
    });
  };

  return (
    <Card className="p-6 sm:p-10 border-neutral-200 bg-white shadow-xl">
      {submittedRef ? (
        <div className="text-center py-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-extrabold text-[#092233]">
              Formal Referral Logged
            </h3>
            <p className="text-neutral-600 text-sm">
              Thank you, <strong className="text-[#092233]">{formData.referrerName}</strong> ({formData.organisationName}). Your commissioning submission reference is:
            </p>
            <div className="inline-block bg-neutral-100 border border-neutral-300 font-mono text-xl font-bold px-6 py-2.5 rounded-2xl text-[#092233] mt-2">
              {submittedRef}
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl text-left text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto space-y-2 border border-neutral-200">
            <p className="font-bold text-[#092233]">Next Statutory Steps:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Our Commissioning & Quality Lead will contact you within 24 business hours.</li>
              <li>We will issue our baseline pupil profile template and data sharing agreement.</li>
              <li>A low-demand transition consultation will be arranged with family & school.</li>
            </ul>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={handleReset}
            className="font-bold text-sm px-8"
          >
            Submit Another Referral
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              OFFICIAL REFERRAL FORM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092233] mt-1">
              Refer a Learner for Alternative Provision
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              For Schools, Local Authority Caseworkers, Inclusion Teams, and Health Commissioners.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Referrer details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#092233] border-b border-neutral-100 pb-2">
              1. Referrer Information
            </h3>

            <div>
              <Label className="text-xs text-neutral-600 mb-2 block">
                Referring Organisation Category:
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['School / Academy', 'Local Authority (SEND)', 'Local Authority (Section 19)', 'Social Care / CAMHS'] as const).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setFormData({ ...formData, referrerType: cat })}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
                      formData.referrerType === cat
                        ? 'bg-[#092233] text-white border-[#092233]'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="c-ref-name">Referrer Name *</Label>
                <Input
                  id="c-ref-name"
                  type="text"
                  required
                  value={formData.referrerName}
                  onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                  placeholder="e.g. David Vance (Assistant Head / SENCO)"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-ref-org">School / Authority Name *</Label>
                <Input
                  id="c-ref-org"
                  type="text"
                  required
                  value={formData.organisationName}
                  onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                  placeholder="e.g. Solihull Metropolitan Borough Council"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-ref-email">Email Address *</Label>
                <Input
                  id="c-ref-email"
                  type="email"
                  required
                  value={formData.referrerEmail}
                  onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                  placeholder="d.vance@school.sch.uk"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-ref-phone">Direct Phone Number</Label>
                <Input
                  id="c-ref-phone"
                  type="tel"
                  value={formData.referrerPhone}
                  onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                  placeholder="0121 496 0000"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Learner needs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#092233] border-b border-neutral-100 pb-2">
              2. Learner Profile & Needs
            </h3>

            <div>
              <Label className="text-xs text-neutral-600 mb-2 block">
                Age Group / Key Stage:
              </Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['4-7 (KS1)', '8-11 (KS2)', '11-14 (KS3)', '14-16 (KS4)', '16-19 (Post-16)', '19-25 (Young Adult)'] as const).map((ag) => (
                  <button
                    type="button"
                    key={ag}
                    onClick={() => setFormData({ ...formData, learnerAgeGroup: ag })}
                    className={`px-2 py-2 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                      formData.learnerAgeGroup === ag
                        ? 'bg-[#f05a28] text-white border-[#f05a28]'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {ag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs text-neutral-600 mb-2 block">
                Primary Identified Needs & Barriers:
              </Label>
              <div className="flex flex-wrap gap-2">
                {allNeeds.map((need) => {
                  const isSelected = formData.primaryNeeds.includes(need);
                  return (
                    <button
                      type="button"
                      key={need}
                      onClick={() => toggleNeed(need)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
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

            {/* EHCP Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <Checkbox
                id="ehcp-check"
                checked={formData.hasEhcp}
                onCheckedChange={(val) => setFormData({ ...formData, hasEhcp: !!val })}
              />
              <Label htmlFor="ehcp-check" className="text-xs sm:text-sm font-semibold text-[#092233] cursor-pointer">
                Learner has an Education, Health and Care Plan (EHCP) in place or draft
              </Label>
            </div>
          </div>

          {/* Section 3: Overview notes */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#092233] border-b border-neutral-100 pb-2">
              3. Circumstances & Desired Outcomes
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="c-ref-notes">Summary of Learning Circumstances & Key Priorities</Label>
              <Textarea
                id="c-ref-notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Include attendance history, preferred learning mode (1:1 / small group), sensory considerations, or specific reintegration targets..."
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Info className="w-4 h-4 text-[#8cc63f] shrink-0" />
              <span>We adhere strictly to Information Commissioner’s Office (ICO) guidelines and UK GDPR.</span>
            </div>

            <Button
              type="submit"
              variant="coral"
              size="lg"
              className="w-full sm:w-auto font-bold gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Official Referral
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
