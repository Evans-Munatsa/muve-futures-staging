'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { ReferralFormData, ReferrerType } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChoiceChips, FormError, FormSection, FormSuccess } from '@/components/forms/FormParts';

const REFERRER_TYPES: readonly ReferrerType[] = [
  'School / Academy',
  'Local Authority',
  'Parent / Carer',
  'Social Worker / Healthcare',
  'Other',
];

const AGE_GROUPS: readonly ReferralFormData['learnerAgeGroup'][] = [
  '4-7 (KS1)',
  '8-11 (KS2)',
  '11-14 (KS3)',
  '14-16 (KS4)',
  '16-19 (Post-16)',
  '19-25 (Young Adult)',
];

const URGENCY: readonly ReferralFormData['urgency'][] = ['Immediate (Within 48h)', 'Next Half-Term', 'Planned Intake'];

const NEEDS = [
  'Alternative Provision',
  'SEND Support',
  'SEMH Support',
  'EBSNA Support',
  'One-to-One Education',
  'Community Learning',
  'Online Learning',
  'Hybrid Learning',
  'Reintegration',
  'Transition Support',
  'EOTAS',
  '52 Week Provision',
  'Medical Needs',
  'Disrupted Education',
  'Risk of Exclusion',
];

function emptyForm(preselectedService?: string): ReferralFormData {
  return {
    referrerType: 'School / Academy',
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    organisationName: '',
    learnerAgeGroup: '11-14 (KS3)',
    primaryNeeds: preselectedService ? [preselectedService] : [],
    currentSetting: '',
    hasEhcp: false,
    fundingSource: '',
    urgency: 'Planned Intake',
    notes: '',
  };
}

export function ReferralForm({ preselectedService }: { preselectedService?: string }) {
  const [form, setForm] = useState<ReferralFormData>(() => emptyForm(preselectedService));
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [error, setError] = useState('');

  // A service passed in from a link that isn't in the standard list still gets a chip.
  const needs = preselectedService && !NEEDS.includes(preselectedService) ? [preselectedService, ...NEEDS] : NEEDS;

  const update = <K extends keyof ReferralFormData>(key: K, value: ReferralFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleNeed = (need: string) =>
    setForm((prev) => ({
      ...prev,
      primaryNeeds: prev.primaryNeeds.includes(need)
        ? prev.primaryNeeds.filter((n) => n !== need)
        : [...prev.primaryNeeds, need],
    }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.referrerName || !form.referrerEmail || !form.organisationName) {
      setError('Please complete all required fields marked with *.');
      return;
    }
    setError('');
    // TODO: send `form` to the referrals inbox / CRM.
    setSubmittedRef(`MF-${Math.floor(100000 + Math.random() * 900000)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submittedRef) {
    return (
      <FormSuccess
        title="Referral Received"
        action={
          <Button asChild variant="orange" size="pill">
            <Link href="/">Return to the website</Link>
          </Button>
        }
      >
        <p>
          Thank you, <strong>{form.referrerName}</strong>. Your referral reference is:
        </p>
        <p className="inline-block rounded-xl bg-brand-lime px-5 py-2 text-xl font-bold tracking-wider">
          {submittedRef}
        </p>
        <p>
          A member of our team will be in touch within 24 hours to talk through the learner&apos;s
          needs and arrange an initial conversation.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <FormError message={error} />

      <FormSection title="1. About you">
        <ChoiceChips
          label="I am referring as"
          options={REFERRER_TYPES}
          value={form.referrerType}
          onToggle={(type) => update('referrerType', type)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ref-name">Your name *</Label>
            <Input
              id="ref-name"
              required
              autoComplete="name"
              value={form.referrerName}
              onChange={(e) => update('referrerName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ref-org">School / organisation *</Label>
            <Input
              id="ref-org"
              required
              autoComplete="organization"
              value={form.organisationName}
              onChange={(e) => update('organisationName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ref-email">Email address *</Label>
            <Input
              id="ref-email"
              type="email"
              required
              autoComplete="email"
              value={form.referrerEmail}
              onChange={(e) => update('referrerEmail', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ref-phone">Phone number</Label>
            <Input
              id="ref-phone"
              type="tel"
              autoComplete="tel"
              value={form.referrerPhone}
              onChange={(e) => update('referrerPhone', e.target.value)}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="2. About the learner">
        <ChoiceChips
          label="Age / key stage"
          options={AGE_GROUPS}
          value={form.learnerAgeGroup}
          onToggle={(age) => update('learnerAgeGroup', age)}
        />

        <ChoiceChips
          label="Needs and support you're interested in (select all that apply)"
          options={needs}
          value={form.primaryNeeds}
          onToggle={toggleNeed}
        />

        <div className="space-y-2">
          <Label htmlFor="ref-setting">Current education setting</Label>
          <Input
            id="ref-setting"
            value={form.currentSetting}
            onChange={(e) => update('currentSetting', e.target.value)}
            placeholder="e.g. Year 9, mainstream secondary, part-time timetable"
          />
        </div>

        <div className="flex items-center gap-3">
          <Checkbox id="ref-ehcp" checked={form.hasEhcp} onCheckedChange={(v) => update('hasEhcp', !!v)} />
          <Label htmlFor="ref-ehcp" className="cursor-pointer">
            The learner has an EHCP (in place or in draft)
          </Label>
        </div>
      </FormSection>

      <FormSection title="3. What you'd like to happen">
        <ChoiceChips
          label="How soon is support needed?"
          options={URGENCY}
          value={form.urgency}
          onToggle={(urgency) => update('urgency', urgency)}
        />

        <div className="space-y-2">
          <Label htmlFor="ref-notes">About the learner&apos;s circumstances and goals</Label>
          <Textarea
            id="ref-notes"
            rows={5}
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Attendance, what has and hasn't worked, interests, and the outcomes you're hoping for."
          />
        </div>
      </FormSection>

      <div className="flex flex-col gap-4 border-t-2 border-brand-green pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed sm:max-w-sm">
          We handle referral information in line with UK GDPR. See our{' '}
          <Link href="/privacy-policy" className="font-bold underline">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" variant="orange" size="pill" className="gap-2">
          <Send className="h-4 w-4" aria-hidden="true" />
          Submit Referral
        </Button>
      </div>
    </form>
  );
}
