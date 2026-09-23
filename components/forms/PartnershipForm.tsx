'use client';

import { useState } from 'react';
import { ChoiceGroup, Field, FieldLabel, SentMessage, SubmitRow, TextArea, groupGap, toggle } from '@/components/forms/DesignForm';
import { PersonFields, emptyPerson, type Person } from '@/components/forms/PersonFields';

const PARTNERSHIP_TYPES = [
  'Referral partnership',
  'Professional network',
  'Education or service delivery',
  'Events or training',
  'Community partnership',
  'Other',
] as const;

const CONTACT_METHODS = ['Phone', 'Email', 'Meeting / assessment discussion'] as const;

interface PartnershipData {
  person: Person;
  organisation: string;
  role: string;
  location: string;
  howToWork: string;
  types: (typeof PARTNERSHIP_TYPES)[number][];
  contactMethod: string;
}

const EMPTY: PartnershipData = {
  person: emptyPerson(),
  organisation: '',
  role: '',
  location: '',
  howToWork: '',
  types: [],
  contactMethod: '',
};

/** The Partnerships enquiry form (public/design/Group 49.png). */
export function PartnershipForm() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const set = <K extends keyof PartnershipData>(key: K, value: PartnershipData[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `form` to the partnerships inbox / CRM.
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (sent) {
    return (
      <SentMessage title="Thank You">
        <p>
          Thanks, <strong>{form.person.firstName}</strong>. A member of our partnerships team will be in touch soon.
        </p>
      </SentMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <PersonFields value={form.person} onChange={(person) => set('person', person)} />

      <div className={`grid gap-8 lg:grid-cols-2 lg:u-gap-x-28 lg:gap-y-0 ${groupGap}`}>
        <div>
          <Field
            label="Organisation*"
            required
            autoComplete="organization"
            placeholder="Name Organisation"
            value={form.organisation}
            onChange={(e) => set('organisation', e.target.value)}
          />
          <Field
            label="Where are you based?"
            className="mt-6 lg:u-mt-26"
            placeholder="Location"
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
          />
          <ChoiceGroup
            className="mt-8 lg:u-mt-30"
            legend="What type of partnership are you interested in?"
            options={PARTNERSHIP_TYPES}
            value={form.types}
            onChange={(type) => set('types', toggle(form.types, type))}
            bubbleFirst
            optionsClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[calc(var(--u)*362)_1fr] lg:u-gap-y-22 lg:gap-x-0"
          />
        </div>

        <div>
          <Field label="Role (if applicable)" autoComplete="organization-title" value={form.role} onChange={(e) => set('role', e.target.value)} />
          <div className="mt-6 lg:u-mt-26">
            <FieldLabel htmlFor="partnership-how">Tell us briefly how you’d like to work with MUVE Futures</FieldLabel>
            <TextArea id="partnership-how" value={form.howToWork} onChange={(e) => set('howToWork', e.target.value)} />
          </div>
        </div>
      </div>

      <ChoiceGroup
        className={groupGap}
        legend="Preferred contact method*"
        options={CONTACT_METHODS}
        value={form.contactMethod as (typeof CONTACT_METHODS)[number]}
        onChange={(method) => set('contactMethod', method)}
        required
      />

      <SubmitRow spacious thanks="Thank you for starting a conversation with us!" />
    </form>
  );
}
