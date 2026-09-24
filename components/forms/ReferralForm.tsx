'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BotTrap, useFormSubmit } from '@/components/forms/BotTrap';
import {
  Bubble,
  ChoiceGroup,
  Field,
  FieldLabel,
  SentMessage,
  SubmitRow,
  TextArea,
  TextInput,
  groupGap,
  labelClass,
  toggle,
} from '@/components/forms/DesignForm';
import { PersonFields, emptyPerson, type Person } from '@/components/forms/PersonFields';
import { submitReferral } from '@/lib/forms/submit';
import { cn } from '@/lib/utils';

const REFERRING_FOR = [
  'Alternative Provision',
  'SEND support',
  'SEMH support',
  'EBSNA / school attendance',
  '1:1 support',
  'Online / hybrid learning',
  'Not sure yet',
  'Other',
] as const;

const WHEN = ['Immediately / urgent', 'Within the next 4 weeks', 'Planned / future support', 'Other'] as const;
const CONTACT_METHODS = ['Phone', 'Email', 'Meeting / assessment discussion'] as const;
const YES_NO = ['No', 'Yes'] as const;

type ReferringFor = (typeof REFERRING_FOR)[number];

interface ReferralData {
  referrer: Person;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  relationship: string;
  happyToBeContacted: string;
  individual: Person;
  individualAware: boolean;
  bestInterests: boolean;
  referralNote: string;
  referringFor: ReferringFor[];
  referringForOther: string;
  when: string;
  whenOther: string;
  aboutYoungPerson: string;
  additionalInfo: string;
  consentToShare: boolean;
  understandsUse: boolean;
  contactMethod: string;
}

/** Matches a service passed in from a service page (?service=…) to an option. */
function fromService(service?: string): Pick<ReferralData, 'referringFor' | 'referringForOther'> {
  if (!service) return { referringFor: [], referringForOther: '' };
  const s = service.toLowerCase();
  const match: ReferringFor | undefined =
    s.includes('alternative provision') ? 'Alternative Provision'
    : s.includes('send') ? 'SEND support'
    : s.includes('semh') ? 'SEMH support'
    : s.includes('ebsna') || s.includes('attendance') ? 'EBSNA / school attendance'
    : s.includes('one-to-one') || s.includes('1:1') ? '1:1 support'
    : s.includes('online') || s.includes('hybrid') ? 'Online / hybrid learning'
    : undefined;
  return match ? { referringFor: [match], referringForOther: '' } : { referringFor: ['Other'], referringForOther: service };
}

const emptyForm = (service?: string): ReferralData => ({
  referrer: emptyPerson(),
  email: '',
  phone: '',
  organisation: '',
  role: '',
  relationship: '',
  happyToBeContacted: '',
  individual: emptyPerson(),
  individualAware: false,
  bestInterests: false,
  referralNote: '',
  ...fromService(service),
  when: '',
  whenOther: '',
  aboutYoungPerson: '',
  additionalInfo: '',
  consentToShare: false,
  understandsUse: false,
  contactMethod: '',
});

function Section({ title, children, first = false }: { title: string; children: React.ReactNode; first?: boolean }) {
  return (
    <section className={first ? undefined : 'mt-14 lg:u-mt-90'}>
      <h2 className="mb-6 text-lg font-bold text-brand-ink lg:u-mb-30 lg:u-text-23">{title}</h2>
      {children}
    </section>
  );
}

/** "Specify" box that goes with an "Other" choice. */
function Specify({ value, onChange, active, onActivate }: { value: string; onChange: (v: string) => void; active: boolean; onActivate: () => void }) {
  return (
    <TextInput
      aria-label="Please specify"
      placeholder="Specify"
      className="w-full sm:w-auto sm:flex-1"
      value={value}
      required={active}
      onFocus={() => !active && onActivate()}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/** The referral form (public/design/Screenshot 2026-09-23 151041.png). Referrals go to the dashboard Inbox. */
export function ReferralForm({ preselectedService }: { preselectedService?: string }) {
  const [form, setForm] = useState<ReferralData>(() => emptyForm(preselectedService));
  const { pending, error: sendError, reference, submit } = useFormSubmit();
  const [checkError, setCheckError] = useState('');
  const set = <K extends keyof ReferralData>(key: K, value: ReferralData[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Browsers can't require "at least one" of a group of checkboxes.
    if (form.referringFor.length === 0) {
      setCheckError('Please choose at least one type of support you are referring for.');
      return;
    }
    setCheckError('');
    submit(e.currentTarget, (meta) => submitReferral(form, meta));
  };

  // The thank-you replaces a long form, so bring its top into view.
  useEffect(() => {
    if (reference) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [reference]);

  if (reference) {
    return (
      <SentMessage title="Referral Received">
        <p>
          Thank you, <strong>{form.referrer.firstName}</strong>. Your referral reference is:
        </p>
        <p className="inline-block rounded-xl bg-brand-lime px-5 py-2 text-xl font-bold tracking-wider">{reference}</p>
        <p>A member of our team will be in touch to talk through the young person’s needs and agree next steps.</p>
      </SentMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <BotTrap />
      <Section title="1. Referrer Details" first>
        <PersonFields value={form.referrer} onChange={(referrer) => set('referrer', referrer)} />
        <div className={cn('grid gap-6 lg:grid-cols-2 lg:u-gap-x-28 lg:u-gap-y-26', groupGap)}>
          {/* Not in the design, but without them the team couldn't reply. */}
          <Field label="Email*" type="email" required autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          <Field label="Phone*" type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          <Field label="Organisation*" required autoComplete="organization" placeholder="Name Organisation" value={form.organisation} onChange={(e) => set('organisation', e.target.value)} />
          <Field label="Role (if applicable)" autoComplete="organization-title" value={form.role} onChange={(e) => set('role', e.target.value)} />
          <Field label="Relationship to Referee*" required placeholder="e.g. Teacher, SENCO, parent" value={form.relationship} onChange={(e) => set('relationship', e.target.value)} />
          <ChoiceGroup
            legend="I am happy to be contacted regarding this referral?"
            options={YES_NO}
            value={form.happyToBeContacted as (typeof YES_NO)[number]}
            onChange={(v) => set('happyToBeContacted', v)}
            required
          />
        </div>
      </Section>

      <Section title="2. Individual Details">
        <PersonFields value={form.individual} onChange={(individual) => set('individual', individual)} preferredName />
        <fieldset className={groupGap}>
          <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Referral Note</legend>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 lg:u-gap-x-60">
            <Bubble label="The individual is aware of this referral" checked={form.individualAware} onChange={(v) => set('individualAware', v)} />
            <Bubble label="Referral made in the individual’s best interests" checked={form.bestInterests} onChange={(v) => set('bestInterests', v)} />
          </div>
          <TextArea aria-label="Referral note" short className="mt-4 lg:u-mt-20" value={form.referralNote} onChange={(e) => set('referralNote', e.target.value)} />
        </fieldset>
      </Section>

      <Section title="3. Support Being Requested">
        <ChoiceGroup
          legend="I am referring for (tick all that apply)*"
          options={REFERRING_FOR}
          value={form.referringFor}
          onChange={(option) => set('referringFor', toggle(form.referringFor, option))}
          // Rows as in the design: four options, three, then "Other" with its Specify box.
          breakAfter={[3, 6]}
          optionsClassName="lg:u-gap-x-64 lg:u-gap-y-18"
        >
          <Specify
            value={form.referringForOther}
            active={form.referringFor.includes('Other')}
            onActivate={() => set('referringFor', [...form.referringFor, 'Other'])}
            onChange={(v) => set('referringForOther', v)}
          />
        </ChoiceGroup>

        <ChoiceGroup
          className={groupGap}
          legend="When is support required?*"
          options={WHEN}
          value={form.when as (typeof WHEN)[number]}
          onChange={(v) => set('when', v)}
          required
          breakAfter={[2]}
          optionsClassName="lg:u-gap-x-64 lg:u-gap-y-18"
        >
          <Specify value={form.whenOther} active={form.when === 'Other'} onActivate={() => set('when', 'Other')} onChange={(v) => set('whenOther', v)} />
        </ChoiceGroup>

        <div className={groupGap}>
          <FieldLabel htmlFor="referral-about">Tell us briefly about the young person and what support they need*</FieldLabel>
          <TextArea id="referral-about" required short value={form.aboutYoungPerson} onChange={(e) => set('aboutYoungPerson', e.target.value)} />
        </div>
      </Section>

      <Section title="4. Additional Information">
        <FieldLabel htmlFor="referral-additional">Is there anything else you feel is important for us to know?</FieldLabel>
        <TextArea id="referral-additional" short value={form.additionalInfo} onChange={(e) => set('additionalInfo', e.target.value)} />
      </Section>

      <Section title="5. Consent & Data Protection">
        <fieldset>
          <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Declaration*</legend>
          <div className="flex flex-col items-start gap-3 lg:u-gap-y-14">
            <Bubble
              bubbleFirst
              required
              label="I confirm that I have consent (or appropriate authority) to share this information."
              checked={form.consentToShare}
              onChange={(v) => set('consentToShare', v)}
            />
            <Bubble
              bubbleFirst
              required
              label="I understand this information will be used to assess suitability and contact relevant parties."
              checked={form.understandsUse}
              onChange={(v) => set('understandsUse', v)}
            />
          </div>
        </fieldset>

        <div className={groupGap}>
          <p className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Privacy notice</p>
          <p className="text-sm leading-relaxed text-brand-ink lg:u-text-19">
            We will only use the information provided to respond to this referral and assess appropriate support. Information will be stored securely and
            handled in line with applicable data protection legislation. See our{' '}
            <Link href="/privacy-policy" className="font-bold underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section title="6. Preferred Next Steps">
        <ChoiceGroup
          legend="Preferred contact method"
          options={CONTACT_METHODS}
          value={form.contactMethod as (typeof CONTACT_METHODS)[number]}
          onChange={(v) => set('contactMethod', v)}
        />
      </Section>

      <SubmitRow thanks="Thank you for starting a conversation with us!" error={checkError || sendError} pending={pending} />
    </form>
  );
}
